import { Hono } from 'hono';
import { stream } from 'hono/streaming';
import { authMiddleware } from '../middleware/auth.js';
import { getSupabase } from '../lib/supabase.js';
import { Env } from '../types.js';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

const ai = new Hono<Env>();

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
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;
  const openRouterModel = process.env.OPENROUTER_MODEL || "openrouter/auto";

  if (!openRouterApiKey) {
    console.error('AI Generation Error: No OpenRouter API key configured in .env');
    return c.json({ error: 'No AI provider configured. Check your .env file.' }, 500);
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
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openRouterApiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://listx.ai", // Required by OpenRouter
          "X-Title": "ListX AI" 
        },
        body: JSON.stringify({
          "model": openRouterModel,
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

      if (!reader) throw new Error("No reader available from OpenRouter");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          const cleanLine = line.trim();
          if (!cleanLine || !cleanLine.startsWith("data: ")) continue;
          
          const data = cleanLine.replace("data: ", "");
          if (data === "[DONE]") break;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              await stream.write(content);
            }
          } catch (pErr) {
            // Ignore incomplete chunks or parse errors
            continue;
          }
        }
      }
    } catch (err: any) {
      console.error("AI Generation Error:", err);
      await stream.write(`\n\n[Error during generation: ${err.message}]`);
    }
  });
});

ai.post('/extract-from-image', authMiddleware, async (c) => {
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;
  if (!openRouterApiKey) return c.json({ error: 'OpenRouter API key not configured' }, 500);
  
  // Use a vision-capable model. google/gemini-1.5-flash is supported via OpenRouter.
  const openRouterModel = process.env.OPENROUTER_VISION_MODEL || "google/gemini-1.5-flash";

  try {
    const body = await c.req.parseBody();
    const file = body['file'];

    if (!file || !(file instanceof File)) {
      return c.json({ error: 'No image file uploaded' }, 400);
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString('base64');

    const prompt = `
      Identify all products listed in this image. The image might be a photo of a handwritten or printed list on paper with product names and prices.
      For each product, extract:
      1. Product Name (Title)
      2. Price (if present, as a number, ignore currency symbols but keep the value)
      
      Also, intelligently suggest:
      3. A suitable category (one of: Electronics, Furniture, Home & Kitchen, Fitness, Apparel, Accessories)
      4. A brief SEO-optimized description (2 sentences)
      5. A unique SKU (e.g., P-NAME-123)
      
      Return the results EXCLUSIVELY as a JSON array of objects. 
      Example format:
      [
        {"title": "Product Name", "price": 499.00, "category": "Electronics", "description": "...", "sku": "SKU-PROD-123", "status": "approved"}
      ]
      DO NOT include any conversational text or markdown formatting except the JSON.
    `;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openRouterApiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://listx.ai",
        "X-Title": "ListX AI" 
      },
      body: JSON.stringify({
        "model": openRouterModel,
        "messages": [
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": prompt
              },
              {
                "type": "image_url",
                "image_url": {
                  "url": `data:${file.type};base64,${base64Image}`
                }
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenRouter API Error: ${response.status} ${errText}`);
    }

    const resultData = await response.json();
    const text = resultData.choices?.[0]?.message?.content || "[]";
    
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error("AI failed to return valid product data. Please ensure the image is clear.");
    
    const extractedProducts = JSON.parse(jsonMatch[0]);

    return c.json({ products: extractedProducts });
  } catch (err: any) {
    console.error('AI Extraction Error:', err);
    return c.json({ error: err.message || 'Failed to extract products' }, 500);
  }
});

ai.post('/generate-from-text', authMiddleware, zValidator('json', z.object({ 
  description: z.string().min(5),
  tone: z.string().optional()
})), async (c) => {
  const { description, tone } = c.req.valid('json');
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;
  if (!openRouterApiKey) return c.json({ error: 'OpenRouter API key not configured' }, 500);
  const openRouterModel = process.env.OPENROUTER_MODEL || "openrouter/auto";

  try {

    const prompt = `
      Generate a complete e-commerce product listing based on this brief description: "${description}".
      Tone: ${tone || 'professional'}
      
      Provide:
      1. A catchy SEO-optimized title
      2. A detailed 3-paragraph product description
      3. A list of 5 key features
      4. Suggested category, price, and SKU
      
      Return as a JSON object:
      {
        "title": "...",
        "description": "...",
        "features": ["...", "..."],
        "category": "...",
        "price": 0,
        "sku": "...",
        "keywords": ["...", "..."]
      }
    `;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openRouterApiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://listx.ai",
        "X-Title": "ListX AI" 
      },
      body: JSON.stringify({
        "model": openRouterModel,
        "messages": [{ "role": "user", "content": prompt }]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenRouter API Error: ${response.status} ${errText}`);
    }

    const resultData = await response.json();
    const text = resultData.choices?.[0]?.message?.content || "{}";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("AI failed to generate valid product data.");
    
    return c.json({ product: JSON.parse(jsonMatch[0]) });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

export default ai;
