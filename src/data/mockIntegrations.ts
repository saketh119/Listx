// ============================================================
// Mock Integrations Data — Platforms & Logistics Partners
// ============================================================

export interface PlatformIntegration {
    id: string;
    name: string;
    type: 'marketplace' | 'storefront' | 'network';
    logo: string;
    color: string;
    bg: string;
    status: 'connected' | 'disconnected' | 'error' | 'syncing';
    connectedAt?: string;
    lastSync?: string;
    syncFrequency?: string;
    productsLinked?: number;
    ordersToday?: number;
    apiHealth?: 'healthy' | 'degraded' | 'down';
    apiLatency?: number;
    rateLimitUsed?: number;
    rateLimitTotal?: number;
    webhooksActive?: number;
    oauthScopes?: string[];
    storeUrl?: string;
}

export interface LogisticsPartnerIntegration {
    id: string;
    name: string;
    logo: string;
    color: string;
    bg: string;
    status: 'connected' | 'disconnected' | 'error';
    connectedAt?: string;
    apiKey?: string;
    warehouseId?: string;
    shipmentsThisMonth?: number;
    codEnabled?: boolean;
    autoManifest?: boolean;
    trackingWebhook?: boolean;
}

export const platformIntegrations: PlatformIntegration[] = [
    {
        id: 'amazon', name: 'Amazon Seller Central', type: 'marketplace',
        logo: 'A', color: 'text-amber-600', bg: 'bg-amber-500/10',
        status: 'connected', connectedAt: '2024-09-15T10:30:00Z',
        lastSync: '2024-12-20T14:45:00Z', syncFrequency: 'Every 15 min',
        productsLinked: 142, ordersToday: 28,
        apiHealth: 'healthy', apiLatency: 120, rateLimitUsed: 1850, rateLimitTotal: 5000,
        webhooksActive: 4,
        oauthScopes: ['listings', 'orders', 'fulfillment', 'reports'],
        storeUrl: 'https://sellercentral.amazon.in'
    },
    {
        id: 'flipkart', name: 'Flipkart Seller Hub', type: 'marketplace',
        logo: 'F', color: 'text-yellow-600', bg: 'bg-yellow-500/10',
        status: 'connected', connectedAt: '2024-10-02T08:00:00Z',
        lastSync: '2024-12-20T14:30:00Z', syncFrequency: 'Every 30 min',
        productsLinked: 98, ordersToday: 15,
        apiHealth: 'degraded', apiLatency: 450, rateLimitUsed: 3200, rateLimitTotal: 4000,
        webhooksActive: 3,
        oauthScopes: ['listings', 'orders', 'returns'],
        storeUrl: 'https://seller.flipkart.com'
    },
    {
        id: 'shopify', name: 'Shopify Store', type: 'storefront',
        logo: 'S', color: 'text-green-600', bg: 'bg-green-500/10',
        status: 'connected', connectedAt: '2024-08-20T12:00:00Z',
        lastSync: '2024-12-20T14:50:00Z', syncFrequency: 'Real-time',
        productsLinked: 210, ordersToday: 12,
        apiHealth: 'healthy', apiLatency: 85, rateLimitUsed: 420, rateLimitTotal: 2000,
        webhooksActive: 6,
        oauthScopes: ['read_products', 'write_products', 'read_orders', 'write_orders', 'read_inventory'],
        storeUrl: 'https://mystore.myshopify.com'
    },
    {
        id: 'ondc', name: 'ONDC Network', type: 'network',
        logo: 'O', color: 'text-purple-600', bg: 'bg-purple-500/10',
        status: 'disconnected'
    },
];

export const logisticsPartnerIntegrations: LogisticsPartnerIntegration[] = [
    {
        id: 'delhivery', name: 'Delhivery', logo: 'DL', color: 'text-red-600', bg: 'bg-red-500/10',
        status: 'connected', connectedAt: '2024-09-01T09:00:00Z',
        apiKey: 'dlv_****_8f2a', warehouseId: 'WH-BLR-001',
        shipmentsThisMonth: 456, codEnabled: true, autoManifest: true, trackingWebhook: true,
    },
    {
        id: 'bluedart', name: 'Blue Dart', logo: 'BD', color: 'text-blue-600', bg: 'bg-blue-500/10',
        status: 'connected', connectedAt: '2024-09-15T11:00:00Z',
        apiKey: 'bd_****_3c4d', warehouseId: 'WH-BLR-001',
        shipmentsThisMonth: 312, codEnabled: true, autoManifest: false, trackingWebhook: true,
    },
    {
        id: 'ekart', name: 'Ekart Logistics', logo: 'EK', color: 'text-indigo-600', bg: 'bg-indigo-500/10',
        status: 'connected', connectedAt: '2024-10-10T14:00:00Z',
        apiKey: 'ek_****_7e8f', warehouseId: 'WH-BLR-001',
        shipmentsThisMonth: 189, codEnabled: false, autoManifest: true, trackingWebhook: false,
    },
    {
        id: 'xpressbees', name: 'XpressBees', logo: 'XB', color: 'text-orange-600', bg: 'bg-orange-500/10',
        status: 'disconnected',
    },
    {
        id: 'shiprocket', name: 'Shiprocket', logo: 'SR', color: 'text-cyan-600', bg: 'bg-cyan-500/10',
        status: 'disconnected',
    },
];
