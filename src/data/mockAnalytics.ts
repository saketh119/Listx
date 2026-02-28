// ============================================================
// Mock Analytics Data — Charts, Reports, KPIs
// ============================================================

export interface ChartDataPoint {
    label: string;
    revenue: number;
    orders: number;
    returns: number;
}

export interface PlatformBreakdown {
    platform: string;
    revenue: number;
    orders: number;
    color: string;
}

export const dailyRevenueData: ChartDataPoint[] = [
    { label: 'Mon', revenue: 42500, orders: 34, returns: 2 },
    { label: 'Tue', revenue: 55200, orders: 42, returns: 3 },
    { label: 'Wed', revenue: 38700, orders: 29, returns: 1 },
    { label: 'Thu', revenue: 67300, orders: 51, returns: 4 },
    { label: 'Fri', revenue: 72100, orders: 58, returns: 2 },
    { label: 'Sat', revenue: 89400, orders: 72, returns: 5 },
    { label: 'Sun', revenue: 61800, orders: 48, returns: 3 },
];

export const monthlyRevenueData: ChartDataPoint[] = [
    { label: 'Jul', revenue: 820000, orders: 680, returns: 42 },
    { label: 'Aug', revenue: 940000, orders: 750, returns: 38 },
    { label: 'Sep', revenue: 1100000, orders: 890, returns: 51 },
    { label: 'Oct', revenue: 1350000, orders: 1050, returns: 63 },
    { label: 'Nov', revenue: 1680000, orders: 1320, returns: 78 },
    { label: 'Dec', revenue: 1920000, orders: 1480, returns: 85 },
];

export const platformBreakdown: PlatformBreakdown[] = [
    { platform: 'Amazon', revenue: 680000, orders: 520, color: '#F59E0B' },
    { platform: 'Flipkart', revenue: 420000, orders: 380, color: '#3B82F6' },
    { platform: 'Shopify', revenue: 310000, orders: 280, color: '#10B981' },
    { platform: 'ONDC', revenue: 85000, orders: 90, color: '#8B5CF6' },
];

export const analyticsKPIs = {
    totalRevenue: 1920000,
    totalOrders: 1480,
    avgOrderValue: 1297,
    conversionRate: 3.2,
    returnRate: 5.7,
    repeatCustomerRate: 34.2,
    revenueGrowth: 14.3,
    orderGrowth: 12.1,
};

export const inventoryMetrics = {
    totalSKUs: 450,
    inStockSKUs: 382,
    lowStockSKUs: 41,
    outOfStockSKUs: 27,
    avgTurnoverDays: 18.5,
    deadStockCount: 12,
    deadStockValue: 45000,
    reorderPendingCount: 15,
};

export const topProducts = [
    { name: 'Organic Cotton Saree', revenue: 125000, units: 85, growth: 22 },
    { name: 'Wireless Earbuds Pro', revenue: 98000, units: 142, growth: 18 },
    { name: 'Ceramic Dinner Set', revenue: 76000, units: 48, growth: -5 },
    { name: 'Leather Laptop Sleeve', revenue: 62000, units: 95, growth: 31 },
    { name: 'Ayurvedic Hair Oil', revenue: 54000, units: 220, growth: 8 },
];

export const returnReasons = [
    { reason: 'Damaged in transit', count: 32, percentage: 37.6 },
    { reason: 'Wrong item received', count: 18, percentage: 21.2 },
    { reason: 'Quality not as expected', count: 15, percentage: 17.6 },
    { reason: 'Size/fit issue', count: 12, percentage: 14.1 },
    { reason: 'Changed mind', count: 8, percentage: 9.4 },
];

export const seoScoresByProduct = [
    { product: 'Organic Cotton Saree', score: 92, status: 'excellent' as const },
    { product: 'Wireless Earbuds Pro', score: 88, status: 'good' as const },
    { product: 'Leather Laptop Sleeve', score: 52, status: 'needs_work' as const },
    { product: 'Ceramic Dinner Set', score: 45, status: 'needs_work' as const },
    { product: 'Ayurvedic Hair Oil', score: 38, status: 'poor' as const },
    { product: 'Steel Water Bottle', score: 41, status: 'needs_work' as const },
];

export const teamMembers = [
    { id: 'TM-001', name: 'Priya Sharma', email: 'priya@listx.com', role: 'Owner', avatar: 'PS', status: 'active' as const, lastActive: '2024-12-20T14:30:00Z' },
    { id: 'TM-002', name: 'Rahul Patel', email: 'rahul@listx.com', role: 'Admin', avatar: 'RP', status: 'active' as const, lastActive: '2024-12-20T13:45:00Z' },
    { id: 'TM-003', name: 'Ananya Gupta', email: 'ananya@listx.com', role: 'Editor', avatar: 'AG', status: 'active' as const, lastActive: '2024-12-19T10:00:00Z' },
    { id: 'TM-004', name: 'Vikram Singh', email: 'vikram@listx.com', role: 'Viewer', avatar: 'VS', status: 'invited' as const, lastActive: '' },
];

export const billingPlan = {
    name: 'Pro',
    price: 2999,
    currency: 'INR',
    interval: 'month',
    features: ['Unlimited products', '5 team members', 'AI Studio', 'Priority support', 'API access'],
    nextBillingDate: '2025-01-15',
    usage: { products: 450, productsLimit: -1, orders: 1480, members: 4, membersLimit: 5 },
};

export const apiKeys = [
    { id: 'AK-001', name: 'Production', key: 'lx_prod_****_8f2a', created: '2024-09-01', lastUsed: '2024-12-20T14:30:00Z', status: 'active' as const },
    { id: 'AK-002', name: 'Development', key: 'lx_dev_****_3c4d', created: '2024-10-15', lastUsed: '2024-12-18T09:00:00Z', status: 'active' as const },
    { id: 'AK-003', name: 'Staging', key: 'lx_stg_****_7e8f', created: '2024-11-01', lastUsed: '', status: 'revoked' as const },
];
