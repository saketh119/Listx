// ============================================================
// Mock Support Data — Tickets, FAQs, Knowledge Base
// ============================================================

export interface SupportTicket {
    id: string;
    subject: string;
    customer: string;
    customerEmail: string;
    status: 'open' | 'in_progress' | 'waiting' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    category: string;
    createdAt: string;
    updatedAt: string;
    assignee: string;
    messages: TicketMessage[];
}

export interface TicketMessage {
    id: string;
    sender: string;
    senderType: 'customer' | 'agent' | 'system';
    content: string;
    timestamp: string;
}

export interface KBArticle {
    id: string;
    title: string;
    category: string;
    summary: string;
    views: number;
    helpful: number;
    updatedAt: string;
}

export const ticketStatusConfig: Record<string, { label: string; color: string; bg: string }> = {
    open: { label: 'Open', color: 'text-brand-lake', bg: 'bg-brand-lake/10' },
    in_progress: { label: 'In Progress', color: 'text-brand-saffron', bg: 'bg-brand-saffron/10' },
    waiting: { label: 'Waiting', color: 'text-purple-600', bg: 'bg-purple-500/10' },
    resolved: { label: 'Resolved', color: 'text-brand-jade', bg: 'bg-brand-jade/10' },
    closed: { label: 'Closed', color: 'text-text-muted', bg: 'bg-bg-subtle' },
};

export const priorityConfig: Record<string, { label: string; color: string; bg: string }> = {
    low: { label: 'Low', color: 'text-text-muted', bg: 'bg-bg-subtle' },
    medium: { label: 'Medium', color: 'text-brand-lake', bg: 'bg-brand-lake/10' },
    high: { label: 'High', color: 'text-brand-saffron', bg: 'bg-brand-saffron/10' },
    urgent: { label: 'Urgent', color: 'text-semantic-error', bg: 'bg-semantic-error/10' },
};

export const supportTickets: SupportTicket[] = [
    {
        id: 'TKT-001', subject: 'Order not received — 7 days past expected delivery',
        customer: 'Aisha Verma', customerEmail: 'aisha.verma@gmail.com',
        status: 'in_progress', priority: 'high', category: 'Delivery',
        createdAt: '2024-12-18T10:00:00Z', updatedAt: '2024-12-20T14:30:00Z',
        assignee: 'Rahul Patel',
        messages: [
            { id: 'M1', sender: 'Aisha Verma', senderType: 'customer', content: 'Hi, I ordered a Kanjivaram Saree (ORD-2024-0012) on Dec 11 and it was supposed to arrive by Dec 14. It\'s been 7 days and I still haven\'t received it. The tracking shows "Out for Delivery" since Dec 15. Can you help?', timestamp: '2024-12-18T10:00:00Z' },
            { id: 'M2', sender: 'System', senderType: 'system', content: 'Ticket assigned to Rahul Patel', timestamp: '2024-12-18T10:05:00Z' },
            { id: 'M3', sender: 'Rahul Patel', senderType: 'agent', content: 'Hi Aisha, I\'m sorry about the delay. I\'ve checked with Delhivery and it appears the shipment was returned to the local hub due to an incomplete address. I\'ve updated the address and requested re-delivery for tomorrow. You should receive an updated tracking notification shortly.', timestamp: '2024-12-18T11:30:00Z' },
            { id: 'M4', sender: 'Aisha Verma', senderType: 'customer', content: 'Thank you for the quick response! I\'ll watch for the tracking update.', timestamp: '2024-12-18T12:00:00Z' },
        ]
    },
    {
        id: 'TKT-002', subject: 'Want to exchange damaged product',
        customer: 'Rajesh Kumar', customerEmail: 'rajesh.k@yahoo.com',
        status: 'open', priority: 'medium', category: 'Returns',
        createdAt: '2024-12-19T14:00:00Z', updatedAt: '2024-12-19T14:00:00Z',
        assignee: 'Unassigned',
        messages: [
            { id: 'M5', sender: 'Rajesh Kumar', senderType: 'customer', content: 'I received my ceramic dinner set but 2 plates are chipped. I want an exchange. Order number ORD-2024-0089.', timestamp: '2024-12-19T14:00:00Z' },
        ]
    },
    {
        id: 'TKT-003', subject: 'How to integrate ONDC seller account?',
        customer: 'Vikram Joshi', customerEmail: 'vikram.j@gmail.com',
        status: 'waiting', priority: 'low', category: 'Integrations',
        createdAt: '2024-12-17T09:00:00Z', updatedAt: '2024-12-19T16:00:00Z',
        assignee: 'Ananya Gupta',
        messages: [
            { id: 'M6', sender: 'Vikram Joshi', senderType: 'customer', content: 'I want to connect my ONDC seller account but the connection flow shows an error. Can you guide me?', timestamp: '2024-12-17T09:00:00Z' },
            { id: 'M7', sender: 'Ananya Gupta', senderType: 'agent', content: 'Hi Vikram, ONDC integration is currently in beta. I\'ve shared the documentation link and escalated the error to our engineering team. Could you share a screenshot of the error?', timestamp: '2024-12-17T11:00:00Z' },
        ]
    },
    {
        id: 'TKT-004', subject: 'Refund not processed after 15 days',
        customer: 'Sneha Reddy', customerEmail: 'sneha.r@gmail.com',
        status: 'open', priority: 'urgent', category: 'Payments',
        createdAt: '2024-12-20T08:00:00Z', updatedAt: '2024-12-20T08:00:00Z',
        assignee: 'Unassigned',
        messages: [
            { id: 'M8', sender: 'Sneha Reddy', senderType: 'customer', content: 'I returned my order ORD-2024-0045 on Dec 5th and was told the refund would take 5-7 days. It\'s been 15 days and I haven\'t received my refund of ₹4,500. This is very disappointing.', timestamp: '2024-12-20T08:00:00Z' },
        ]
    },
    {
        id: 'TKT-005', subject: 'Bulk order discount inquiry',
        customer: 'Mohammed Faisal', customerEmail: 'faisal.m@gmail.com',
        status: 'resolved', priority: 'low', category: 'Sales',
        createdAt: '2024-12-14T10:00:00Z', updatedAt: '2024-12-16T15:00:00Z',
        assignee: 'Priya Sharma',
        messages: [
            { id: 'M9', sender: 'Mohammed Faisal', senderType: 'customer', content: 'I run a corporate gifting business and want to order 100+ units of the ceramic dinner set. Do you offer bulk discounts?', timestamp: '2024-12-14T10:00:00Z' },
            { id: 'M10', sender: 'Priya Sharma', senderType: 'agent', content: 'Hi Mohammed! Yes, we offer tiered discounts for bulk orders. For 100+ units, we can offer 15% off with free shipping. I\'ll send you a custom quote to your email shortly.', timestamp: '2024-12-15T09:00:00Z' },
            { id: 'M11', sender: 'Mohammed Faisal', senderType: 'customer', content: 'That sounds great! Looking forward to the quote.', timestamp: '2024-12-15T10:00:00Z' },
            { id: 'M12', sender: 'System', senderType: 'system', content: 'Ticket marked as resolved', timestamp: '2024-12-16T15:00:00Z' },
        ]
    },
];

export const kbArticles: KBArticle[] = [
    { id: 'KB-001', title: 'How to connect your Amazon Seller account', category: 'Integrations', summary: 'Step-by-step guide to linking your Amazon Seller Central account via OAuth.', views: 1245, helpful: 89, updatedAt: '2024-12-10' },
    { id: 'KB-002', title: 'Understanding order statuses', category: 'Orders', summary: 'Learn about all order statuses from New to Delivered and what each means.', views: 890, helpful: 72, updatedAt: '2024-12-05' },
    { id: 'KB-003', title: 'How to process a return or exchange', category: 'Returns', summary: 'Guide to handling customer returns, exchanges, and refund processing.', views: 2100, helpful: 156, updatedAt: '2024-12-15' },
    { id: 'KB-004', title: 'Setting up AI content generation', category: 'AI Studio', summary: 'How to use AI Studio to generate product descriptions and enhance images.', views: 560, helpful: 43, updatedAt: '2024-12-12' },
    { id: 'KB-005', title: 'Managing team roles and permissions', category: 'Settings', summary: 'How to invite team members, assign roles, and configure permissions.', views: 340, helpful: 28, updatedAt: '2024-11-28' },
    { id: 'KB-006', title: 'Bulk product upload via CSV', category: 'Products', summary: 'Format requirements and step-by-step instructions for CSV product import.', views: 1890, helpful: 134, updatedAt: '2024-12-08' },
    { id: 'KB-007', title: 'Courier recommendation & auto-assign', category: 'Logistics', summary: 'How the AI-powered courier selection works and how to configure preferences.', views: 420, helpful: 35, updatedAt: '2024-12-18' },
    { id: 'KB-008', title: 'Reading your analytics reports', category: 'Analytics', summary: 'Guide to interpreting sales, inventory, and SEO reports for business insights.', views: 675, helpful: 51, updatedAt: '2024-12-01' },
];

export const supportKPIs = {
    openTickets: 12,
    avgResponseTime: '2.4 hrs',
    avgResolutionTime: '18 hrs',
    satisfactionScore: 4.6,
    resolvedToday: 8,
    totalThisWeek: 34,
};
