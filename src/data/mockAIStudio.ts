// ============================================================
// Mock AI Studio Data — Content, Images, SEO
// ============================================================

export interface AIProduct {
    id: string;
    title: string;
    image: string;
    originalDescription: string;
    aiDescription?: string;
    category: string;
    platform: string;
    seoScore?: number;
    contentStatus: 'original' | 'ai_generated' | 'approved' | 'needs_review';
}

export interface SEOKeyword {
    keyword: string;
    volume: number;
    difficulty: 'easy' | 'medium' | 'hard';
    relevance: number;
    currentDensity: number;
    recommended: boolean;
}

export interface ImageEnhancement {
    id: string;
    productId: string;
    productTitle: string;
    originalUrl: string;
    enhancedUrl: string;
    enhancements: string[];
    qualityBefore: number;
    qualityAfter: number;
}

export const aiProducts: AIProduct[] = [
    {
        id: 'PROD-001', title: 'Organic Cotton Saree — Handwoven Kanjivaram',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&h=100&fit=crop',
        originalDescription: 'Beautiful saree made from cotton. Handwoven. Available in multiple colors.',
        aiDescription: 'Indulge in the timeless elegance of our **Organic Cotton Kanjivaram Saree**, meticulously handwoven by master artisans from Tamil Nadu. Crafted from 100% certified organic cotton, this saree features intricate zari work along the border and pallu, showcasing traditional temple motifs that have been passed down through generations.\n\n**Key Features:**\n- Pure organic cotton with natural dyes\n- Authentic Kanjivaram weave technique\n- Rich zari border with temple detailing\n- Contrast pallu with peacock motifs\n- Includes matching blouse piece\n\nPerfect for weddings, festivals, and special occasions. Each piece is unique — slight variations in weave are a hallmark of authentic handloom craftsmanship.',
        category: 'Clothing', platform: 'amazon', seoScore: 92, contentStatus: 'ai_generated'
    },
    {
        id: 'PROD-002', title: 'Wireless Bluetooth Earbuds Pro',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=100&h=100&fit=crop',
        originalDescription: 'Bluetooth earbuds with noise cancellation. Good battery.',
        aiDescription: 'Experience crystal-clear audio with our **Wireless Bluetooth Earbuds Pro**, engineered for audiophiles who refuse to compromise. Featuring hybrid Active Noise Cancellation (ANC) technology, these earbuds block out up to 35dB of ambient noise, immersing you in studio-quality sound.\n\n**Specifications:**\n- Bluetooth 5.3 with multipoint connectivity\n- 40-hour total battery (8h buds + 32h case)\n- IPX5 water & sweat resistance\n- 12mm titanium-coated drivers\n- Touch controls with customizable gestures\n- Transparency mode for awareness\n\n**In the Box:** Earbuds, charging case, USB-C cable, 3 ear tip sizes, quick start guide.',
        category: 'Electronics', platform: 'flipkart', seoScore: 88, contentStatus: 'approved'
    },
    {
        id: 'PROD-003', title: 'Handmade Ceramic Dinner Set — 16 Pieces',
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=100&h=100&fit=crop',
        originalDescription: 'Dinner set with plates and bowls. Ceramic material. Microwave safe.',
        category: 'Home & Kitchen', platform: 'shopify', seoScore: 45, contentStatus: 'original'
    },
    {
        id: 'PROD-004', title: 'Premium Leather Laptop Sleeve — 14 inch',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop',
        originalDescription: 'Laptop sleeve made of genuine leather. Fits 14 inch laptops.',
        category: 'Accessories', platform: 'amazon', seoScore: 52, contentStatus: 'needs_review'
    },
    {
        id: 'PROD-005', title: 'Ayurvedic Hair Oil — 200ml',
        image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=100&h=100&fit=crop',
        originalDescription: 'Hair oil with natural ingredients. Good for hair growth.',
        category: 'Beauty', platform: 'ondc', seoScore: 38, contentStatus: 'original'
    },
    {
        id: 'PROD-006', title: 'Stainless Steel Water Bottle — 1 Litre',
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop',
        originalDescription: 'Steel water bottle. Keeps water cold. 1 litre capacity.',
        category: 'Home & Kitchen', platform: 'shopify', seoScore: 41, contentStatus: 'original'
    },
];

export const sampleStreamingContent = `Elevate your dining experience with our **Handmade Ceramic Dinner Set**, a stunning 16-piece collection crafted by skilled artisans using traditional pottery techniques.

**What's Included:**
- 4× Dinner Plates (10.5")
- 4× Side Plates (7")
- 4× Bowls (6")
- 4× Mugs (350ml)

**Craftsmanship & Quality:**
Each piece is individually hand-thrown on a potter's wheel, glazed with food-safe, lead-free glazes, and fired at 1200°C for exceptional durability. The organic, earthy tones and subtle imperfections are a celebration of handmade artistry.

**Features:**
- Microwave & dishwasher safe
- Chip-resistant stoneware body
- Stackable design for easy storage
- Food-safe, non-toxic glazes

**Perfect For:** Everyday dining, dinner parties, housewarming gifts, or upgrading your kitchen aesthetic. Each set comes in premium packaging, making it gift-ready.`;

export const seoKeywords: SEOKeyword[] = [
    { keyword: 'handmade ceramic dinner set', volume: 8400, difficulty: 'medium', relevance: 98, currentDensity: 2.1, recommended: true },
    { keyword: 'stoneware dinner plates', volume: 5200, difficulty: 'easy', relevance: 85, currentDensity: 0, recommended: true },
    { keyword: 'artisan pottery dinnerware', volume: 3100, difficulty: 'easy', relevance: 82, currentDensity: 0, recommended: true },
    { keyword: 'microwave safe ceramic plates', volume: 6800, difficulty: 'medium', relevance: 78, currentDensity: 1.5, recommended: true },
    { keyword: 'handcrafted dinner set india', volume: 2200, difficulty: 'easy', relevance: 90, currentDensity: 0, recommended: true },
    { keyword: '16 piece dinner set', volume: 12000, difficulty: 'hard', relevance: 75, currentDensity: 1.8, recommended: false },
    { keyword: 'ceramic plates online', volume: 9500, difficulty: 'hard', relevance: 60, currentDensity: 0, recommended: false },
    { keyword: 'pottery dinner set', volume: 4100, difficulty: 'medium', relevance: 88, currentDensity: 0, recommended: true },
    { keyword: 'lead free dinnerware', volume: 3800, difficulty: 'easy', relevance: 72, currentDensity: 0.8, recommended: true },
    { keyword: 'gift dinner set', volume: 7200, difficulty: 'hard', relevance: 55, currentDensity: 0, recommended: false },
];

export const imageEnhancements: ImageEnhancement[] = [
    {
        id: 'IMG-001', productId: 'PROD-001', productTitle: 'Organic Cotton Saree',
        originalUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop',
        enhancedUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop&q=100&sharp=20',
        enhancements: ['Background removed', 'Color corrected', 'Sharpened', 'White balance adjusted'],
        qualityBefore: 62, qualityAfter: 95,
    },
    {
        id: 'IMG-002', productId: 'PROD-002', productTitle: 'Wireless Earbuds Pro',
        originalUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=400&fit=crop',
        enhancedUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=400&fit=crop&q=100&sharp=20',
        enhancements: ['Background removed', 'Shadow added', 'Brightness optimized'],
        qualityBefore: 71, qualityAfter: 94,
    },
    {
        id: 'IMG-003', productId: 'PROD-003', productTitle: 'Ceramic Dinner Set',
        originalUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop',
        enhancedUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop&q=100&sharp=20',
        enhancements: ['Background removed', 'Color enhanced', 'Crop optimized', 'Watermark removed'],
        qualityBefore: 55, qualityAfter: 93,
    },
];
