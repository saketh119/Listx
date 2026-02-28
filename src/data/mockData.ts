export type ProductStatus = 'active' | 'draft' | 'out_of_stock' | 'archived';

export interface Product {
    id: string;
    title: string;
    sku: string;
    price: number;
    stock: number;
    status: ProductStatus;
    category: string;
    image: string;
    platforms: ('amazon' | 'flipkart' | 'shopify')[];
    aiScore: number;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';

export interface Order {
    id: string;
    date: string;
    customerName: string;
    platform: 'amazon' | 'flipkart' | 'shopify' | 'ondc';
    total: number;
    status: OrderStatus;
    items: number;
}

export const mockProducts: Product[] = [
    {
        id: "PROD-1001",
        title: "Ergonomic Office Chair - Mesh Back, Adjustable Armrests",
        sku: "OFF-CHR-001",
        price: 4500,
        stock: 142,
        status: 'active',
        category: "Furniture",
        image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=400&q=80",
        platforms: ['amazon', 'flipkart', 'shopify'],
        aiScore: 92,
    },
    {
        id: "PROD-1002",
        title: "Wireless Noise-Cancelling Headphones (Midnight Black)",
        sku: "ELEC-HP-BLK",
        price: 8999,
        stock: 45,
        status: 'active',
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80",
        platforms: ['amazon', 'shopify'],
        aiScore: 78,
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
    },
    {
        id: "PROD-1004",
        title: "Stainless Steel Insulated Water Bottle - 1 Litre",
        sku: "HOME-BTL-1L",
        price: 750,
        stock: 210,
        status: 'active',
        category: "Home & Kitchen",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80",
        platforms: ['amazon', 'flipkart', 'shopify'],
        aiScore: 96,
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
    },
];

export const mockOrders: Order[] = [
    {
        id: "ORD-AMZ-8921",
        date: "2026-03-01T09:30:00Z",
        customerName: "Rohan Sharma",
        platform: "amazon",
        total: 4500,
        status: "pending",
        items: 1,
    },
    {
        id: "ORD-SHP-1042",
        date: "2026-03-01T08:15:00Z",
        customerName: "Priya Desai",
        platform: "shopify",
        total: 10199,
        status: "processing",
        items: 2,
    },
    {
        id: "ORD-FLK-4432",
        date: "2026-02-28T14:20:00Z",
        customerName: "Vikram Singh",
        platform: "flipkart",
        total: 750,
        status: "shipped",
        items: 1,
    },
    {
        id: "ORD-AMZ-8910",
        date: "2026-02-27T11:00:00Z",
        customerName: "Anita Menon",
        platform: "amazon",
        total: 2100,
        status: "delivered",
        items: 1,
    },
];

export const mockKPIs = {
    totalRevenue: 1245000,
    revenueGrowth: 14.2,
    totalOrders: 854,
    orderGrowth: 8.5,
    activeProducts: 142,
    returnRate: 2.4, // percentage
};

export const mockRevenueData = [
    { name: 'Mon', total: 12000, orders: 15 },
    { name: 'Tue', total: 15000, orders: 20 },
    { name: 'Wed', total: 18000, orders: 24 },
    { name: 'Thu', total: 14000, orders: 18 },
    { name: 'Fri', total: 22000, orders: 32 },
    { name: 'Sat', total: 28000, orders: 40 },
    { name: 'Sun', total: 25000, orders: 36 },
];
