import type { ProductStatus } from "./mockData";

export interface ExtendedProduct {
    id: string;
    title: string;
    sku: string;
    price: number;
    compareAtPrice?: number;
    stock: number;
    status: ProductStatus;
    category: string;
    image: string;
    platforms: ('amazon' | 'flipkart' | 'shopify' | 'ondc')[];
    aiScore: number;
    createdAt: string;
    variants?: number;
}

export const extendedMockProducts: ExtendedProduct[] = [
    {
        id: "PROD-1001",
        title: "Ergonomic Office Chair - Mesh Back, Adjustable Armrests",
        sku: "OFF-CHR-001",
        price: 4500,
        compareAtPrice: 5999,
        stock: 142,
        status: 'active',
        category: "Furniture",
        image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=400&q=80",
        platforms: ['amazon', 'flipkart', 'shopify'],
        aiScore: 92,
        createdAt: "2023-10-12T10:00:00Z"
    },
    {
        id: "PROD-1002",
        title: "Wireless Noise-Cancelling Headphones (Midnight Black)",
        sku: "ELEC-HP-BLK",
        price: 8999,
        compareAtPrice: 10999,
        stock: 45,
        status: 'active',
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80",
        platforms: ['amazon', 'shopify'],
        aiScore: 78,
        createdAt: "2023-11-05T14:30:00Z"
    },
    {
        id: "PROD-1003",
        title: "Organic Cotton Yoga Mat - Extra Thick 8mm",
        sku: "FIT-YM-ORG",
        price: 1200,
        stock: 0,
        status: 'out_of_stock',
        category: "Fitness",
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80",
        platforms: ['amazon', 'flipkart'],
        aiScore: 85,
        createdAt: "2024-01-20T09:15:00Z"
    },
    {
        id: "PROD-1004",
        title: "Stainless Steel Insulated Water Bottle - 1 Litre",
        sku: "HOME-BTL-1L",
        price: 750,
        compareAtPrice: 999,
        stock: 210,
        status: 'active',
        category: "Home & Kitchen",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80",
        platforms: ['amazon', 'flipkart', 'shopify', 'ondc'],
        aiScore: 96,
        createdAt: "2024-02-10T11:45:00Z"
    },
    {
        id: "PROD-1005",
        title: "Smart LED Desk Lamp with Wireless Charging Base",
        sku: "HOME-LMP-SMT",
        price: 2100,
        stock: 12,
        status: 'draft',
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80",
        platforms: [],
        aiScore: 45,
        createdAt: "2024-02-25T16:20:00Z"
    },
    {
        id: "PROD-1006",
        title: "Ceramic Coffee Mug Set (Pack of 4)",
        sku: "HOME-MUG-C4",
        price: 850,
        stock: 68,
        status: 'active',
        category: "Home & Kitchen",
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80",
        platforms: ['amazon', 'shopify'],
        aiScore: 88,
        createdAt: "2023-09-18T08:00:00Z"
    },
    {
        id: "PROD-1007",
        title: "Minimalist Leather Wallet for Men - RFID Blocking",
        sku: "ACC-WAL-LTH",
        price: 1499,
        compareAtPrice: 2499,
        stock: 15,
        status: 'active',
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80",
        platforms: ['flipkart', 'shopify'],
        aiScore: 94,
        createdAt: "2023-12-01T13:10:00Z",
        variants: 3
    },
    {
        id: "PROD-1008",
        title: "MacBook Pro 14-inch Hard Shell Case (Matte Clear)",
        sku: "ACC-MAC-14C",
        price: 1200,
        stock: 340,
        status: 'active',
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&q=80",
        platforms: ['amazon'],
        aiScore: 71,
        createdAt: "2024-01-05T15:55:00Z"
    },
    {
        id: "PROD-1009",
        title: "Professional DSLR Camera Tripod Stand - 60 inch",
        sku: "ELEC-TRP-60",
        price: 2500,
        stock: 5,
        status: 'active',
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1527011045974-43b67e0e7cd4?w=400&q=80",
        platforms: ['amazon', 'flipkart'],
        aiScore: 82,
        createdAt: "2023-08-22T09:40:00Z"
    },
    {
        id: "PROD-1010",
        title: "Aromatherapy Essential Oil Diffuser (500ml)",
        sku: "HOME-DF-500",
        price: 1800,
        stock: 0,
        status: 'out_of_stock',
        category: "Home & Kitchen",
        image: "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=400&q=80",
        platforms: ['amazon', 'shopify', 'ondc'],
        aiScore: 89,
        createdAt: "2023-11-15T11:20:00Z"
    },
    {
        id: "PROD-1011",
        title: "Men's Classic White Sneakers - Genuine Leather",
        sku: "APP-SNK-WHT",
        price: 3200,
        compareAtPrice: 4500,
        stock: 42,
        status: 'active',
        category: "Apparel",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80",
        platforms: ['flipkart', 'shopify'],
        aiScore: 91,
        createdAt: "2024-02-01T10:00:00Z",
        variants: 6
    },
    {
        id: "PROD-1012",
        title: "Portable High-Speed SSD - 1TB USB 3.2 Gen 2",
        sku: "ELEC-SSD-1TB",
        price: 8500,
        stock: 18,
        status: 'active',
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&q=80",
        platforms: ['amazon', 'flipkart', 'shopify'],
        aiScore: 97,
        createdAt: "2024-02-28T08:30:00Z"
    },
    {
        id: "PROD-1013",
        title: "Non-Stick Ceramic Cookware Set - 12 Pieces",
        sku: "HOME-CW-12P",
        price: 6500,
        stock: 0,
        status: 'archived',
        category: "Home & Kitchen",
        image: "https://images.unsplash.com/photo-1584990347449-a6e0fddeddc5?w=400&q=80",
        platforms: [],
        aiScore: 60,
        createdAt: "2023-05-10T14:15:00Z"
    },
    {
        id: "PROD-1014",
        title: "Adjustable Dumbbell Set (up to 25kg)",
        sku: "FIT-DMB-25",
        price: 8999,
        stock: 120,
        status: 'active',
        category: "Fitness",
        image: "https://images.unsplash.com/photo-1586401100295-7a8096fd231a?w=400&q=80",
        platforms: ['amazon', 'flipkart'],
        aiScore: 95,
        createdAt: "2023-12-18T16:45:00Z"
    },
    {
        id: "PROD-1015",
        title: "Vintage Round Sunglasses for Men and Women",
        sku: "ACC-SUN-RND",
        price: 999,
        stock: 85,
        status: 'draft',
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80",
        platforms: ['shopify'],
        aiScore: 65,
        createdAt: "2024-03-01T09:00:00Z",
        variants: 4
    }
];
