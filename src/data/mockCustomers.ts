// ============================================================
// Mock Customers Data
// ============================================================

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    city: string;
    state: string;
    joinedAt: string;
    totalOrders: number;
    totalSpent: number;
    lastOrderDate: string;
    segment: 'vip' | 'loyal' | 'regular' | 'at_risk' | 'dormant';
    platforms: string[];
    avgOrderValue: number;
    returnRate: number;
    tags: string[];
}

export const customerSegments = {
    vip: { label: 'VIP', color: 'text-brand-saffron', bg: 'bg-brand-saffron/10', description: 'High value, frequent buyers' },
    loyal: { label: 'Loyal', color: 'text-brand-jade', bg: 'bg-brand-jade/10', description: 'Consistent repeat customers' },
    regular: { label: 'Regular', color: 'text-brand-lake', bg: 'bg-brand-lake/10', description: 'Average buying frequency' },
    at_risk: { label: 'At Risk', color: 'text-semantic-error', bg: 'bg-semantic-error/10', description: 'Declining engagement' },
    dormant: { label: 'Dormant', color: 'text-text-muted', bg: 'bg-bg-subtle', description: 'No purchase in 90+ days' },
};

export const mockCustomers: Customer[] = [
    {
        id: 'CUST-001', name: 'Aisha Verma', email: 'aisha.verma@gmail.com', phone: '+91 98765 11001',
        avatar: 'AV', city: 'Mumbai', state: 'Maharashtra', joinedAt: '2024-03-15T10:00:00Z',
        totalOrders: 42, totalSpent: 128500, lastOrderDate: '2024-12-18', segment: 'vip',
        platforms: ['Amazon', 'Shopify'], avgOrderValue: 3060, returnRate: 2.4, tags: ['Repeat Buyer', 'Premium']
    },
    {
        id: 'CUST-002', name: 'Rajesh Kumar', email: 'rajesh.k@yahoo.com', phone: '+91 98765 11002',
        avatar: 'RK', city: 'Delhi', state: 'Delhi', joinedAt: '2024-05-20T08:00:00Z',
        totalOrders: 28, totalSpent: 64200, lastOrderDate: '2024-12-15', segment: 'loyal',
        platforms: ['Flipkart'], avgOrderValue: 2293, returnRate: 3.6, tags: ['Repeat Buyer']
    },
    {
        id: 'CUST-003', name: 'Priya Nair', email: 'priya.nair@outlook.com', phone: '+91 98765 11003',
        avatar: 'PN', city: 'Bengaluru', state: 'Karnataka', joinedAt: '2024-07-10T12:00:00Z',
        totalOrders: 15, totalSpent: 34800, lastOrderDate: '2024-12-10', segment: 'regular',
        platforms: ['Amazon', 'Flipkart'], avgOrderValue: 2320, returnRate: 6.7, tags: ['Electronics']
    },
    {
        id: 'CUST-004', name: 'Vikram Joshi', email: 'vikram.j@gmail.com', phone: '+91 98765 11004',
        avatar: 'VJ', city: 'Pune', state: 'Maharashtra', joinedAt: '2024-02-01T09:00:00Z',
        totalOrders: 35, totalSpent: 95600, lastOrderDate: '2024-11-22', segment: 'at_risk',
        platforms: ['Shopify', 'ONDC'], avgOrderValue: 2731, returnRate: 8.6, tags: ['Win-Back Target']
    },
    {
        id: 'CUST-005', name: 'Sneha Reddy', email: 'sneha.r@gmail.com', phone: '+91 98765 11005',
        avatar: 'SR', city: 'Hyderabad', state: 'Telangana', joinedAt: '2024-01-10T14:00:00Z',
        totalOrders: 8, totalSpent: 12400, lastOrderDate: '2024-08-05', segment: 'dormant',
        platforms: ['Flipkart'], avgOrderValue: 1550, returnRate: 12.5, tags: ['Dormant > 90d']
    },
    {
        id: 'CUST-006', name: 'Ankit Mehta', email: 'ankit.m@hotmail.com', phone: '+91 98765 11006',
        avatar: 'AM', city: 'Ahmedabad', state: 'Gujarat', joinedAt: '2024-06-22T11:00:00Z',
        totalOrders: 22, totalSpent: 53800, lastOrderDate: '2024-12-19', segment: 'loyal',
        platforms: ['Amazon'], avgOrderValue: 2445, returnRate: 4.5, tags: ['Home & Kitchen']
    },
    {
        id: 'CUST-007', name: 'Deepika Singh', email: 'deepika.s@gmail.com', phone: '+91 98765 11007',
        avatar: 'DS', city: 'Jaipur', state: 'Rajasthan', joinedAt: '2024-08-15T10:30:00Z',
        totalOrders: 11, totalSpent: 28900, lastOrderDate: '2024-12-12', segment: 'regular',
        platforms: ['Shopify', 'Flipkart'], avgOrderValue: 2627, returnRate: 9.1, tags: ['Fashion']
    },
    {
        id: 'CUST-008', name: 'Mohammed Faisal', email: 'faisal.m@gmail.com', phone: '+91 98765 11008',
        avatar: 'MF', city: 'Chennai', state: 'Tamil Nadu', joinedAt: '2024-04-05T08:00:00Z',
        totalOrders: 56, totalSpent: 198700, lastOrderDate: '2024-12-20', segment: 'vip',
        platforms: ['Amazon', 'Flipkart', 'Shopify'], avgOrderValue: 3548, returnRate: 1.8, tags: ['Top Spender', 'Premium', 'Multi-platform']
    },
];

export const customerKPIs = {
    totalCustomers: 1285,
    newThisMonth: 142,
    avgLifetimeValue: 8450,
    repeatRate: 34.2,
    churnRate: 5.8,
    avgSatisfaction: 4.3,
};
