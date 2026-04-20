import { Hono } from 'hono';
import { stream } from 'hono/streaming';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { authMiddleware } from '../middleware/auth.js';
import { getSupabase } from '../lib/supabase.js';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
const ai = new Hono();
const generateSchema = z.object({
    productId: z.string(),
    tone: z.string().default('professional'),
});
ai.post('/generate', authMiddleware, zValidator('json', generateSchema), async (c) => {
    const { productId, tone } = c.req.valid('json');
    const user = c.get('user');
    const token = c.req.header('Authorization')?.replace('Bearer ', '');
    const supabase = getSupabase(token);
    // 1. Fetch product details
    const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .eq('user_id', user.id)
        .single();
    if (error || !product) {
        return c.json({ error: 'Product not found' }, 404);
    }
    // 2. Initialize Model Provider
    const geminiApiKey = process.env.GEMINI_API_KEY;
    const openRouterApiKey = process.env.OPENROUTER_API_KEY;
    if (!geminiApiKey && !openRouterApiKey) {
        return c.json({ error: 'No AI provider (Gemini or OpenRouter) configured' }, 500);
    }
    const prompt = `
    You are an expert e-commerce copywriter specialized in Amazon listings.
    Generate a premium product description, key features (bullet points), and SEO keywords for the following product.
    
    Product Title: ${product.title}
    Current Description: ${product.description || 'N/A'}
    Category: ${product.category || 'N/A'}
    Tone: ${tone}
    
    Format the response clearly with:
    1. A compelling 2-3 paragraph description.
    2. A list of 5-7 key features (bullet points).
    3. Technical details/specifications.
    4. Target audience recommendations.
    5. A list of 10-15 high-volume SEO keywords.
    
    Use professional markdown formatting.
  `;
    // 3. Stream the response
    return stream(c, async (stream) => {
        c.header('Content-Type', 'text/event-stream');
        c.header('Cache-Control', 'no-cache');
        c.header('Connection', 'keep-alive');
        try {
            if (geminiApiKey) {
                // --- Option A: Native Gemini SDK ---
                const genAI = new GoogleGenerativeAI(geminiApiKey);
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                const result = await model.generateContentStream(prompt);
                for await (const chunk of result.stream) {
                    const chunkText = chunk.text();
                    if (chunkText) {
                        await stream.write(chunkText);
                    }
                }
            }
            else {
                // --- Option B: OpenRouter Fallback ---
                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${openRouterApiKey}`,
                        "Content-Type": "application/json",
                        "HTTP-Referer": "https://listx.ai", // Required by OpenRouter
                        "X-Title": "ListX AI"
                    },
                    body: JSON.stringify({
                        "model": "google/gemini-flash-1.5",
                        "messages": [{ "role": "user", "content": prompt }],
                        "stream": true
                    })
                });
                if (!response.ok) {
                    const errBody = await response.text();
                    throw new Error(`OpenRouter API error: ${response.status} ${errBody}`);
                }
                const reader = response.body?.getReader();
                const decoder = new TextDecoder();
                if (!reader)
                    throw new Error("No reader available from OpenRouter");
                while (true) {
                    const { done, value } = await reader.read();
                    if (done)
                        break;
                    const chunk = decoder.decode(value);
                    const lines = chunk.split("\n");
                    for (const line of lines) {
                        const cleanLine = line.trim();
                        if (!cleanLine || !cleanLine.startsWith("data: "))
                            continue;
                        const data = cleanLine.replace("data: ", "");
                        if (data === "[DONE]")
                            break;
                        try {
                            const parsed = JSON.parse(data);
                            const content = parsed.choices?.[0]?.delta?.content;
                            if (content) {
                                await stream.write(content);
                            }
                        }
                        catch (pErr) {
                            // Ignore incomplete chunks or parse errors
                            continue;
                        }
                    }
                }
            }
        }
        catch (err) {
            console.error("AI Generation Error:", err);
            await stream.write(`\n\n[Error during generation: ${err.message}]`);
        }
    });
});
export default ai;
//# sourceMappingURL=ai.js.map