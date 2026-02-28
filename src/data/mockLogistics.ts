// ──────────────────────────────────────────────────
// Mock Logistics — Couriers, Shipments, Returns, Failed Deliveries
// ──────────────────────────────────────────────────

export interface CourierPartner {
    id: string;
    name: string;
    logo: string;
    status: 'active' | 'degraded' | 'down';
    avgDeliveryDays: number;
    onTimePercent: number;
    costPerShipment: number;
    todayShipments: number;
    codAvailable: boolean;
    rating: number;
}

export interface TrackingCheckpoint {
    city: string;
    facility: string;
    status: string;
    timestamp: string;
    isCurrent?: boolean;
}

export interface ActiveShipment {
    awb: string;
    orderId: string;
    courierName: string;
    courierLogo: string;
    origin: string;
    destination: string;
    currentLocation: string;
    status: 'pickup_pending' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'delivery_attempted' | 'exception';
    eta: string;
    lastUpdate: string;
    checkpoints: TrackingCheckpoint[];
    exceptionType?: string;
}

export interface ReturnRequest {
    returnId: string;
    orderId: string;
    customerName: string;
    customerPhone: string;
    reason: 'damaged' | 'wrong_item' | 'not_required' | 'quality_issue' | 'late_delivery';
    description: string;
    items: { title: string; sku: string; qty: number; condition: string }[];
    images: string[];
    status: 'requested' | 'approved' | 'picked_up' | 'received' | 'refunded' | 'rejected';
    platform: 'amazon' | 'flipkart' | 'shopify' | 'ondc';
    requestedDate: string;
    courier?: string;
    refundMethod?: 'original' | 'wallet' | 'store_credit';
    timeline: { timestamp: string; event: string; actor: string }[];
}

export interface FailedDelivery {
    awb: string;
    orderId: string;
    courierName: string;
    courierLogo: string;
    customerName: string;
    destination: string;
    failureReason: 'customer_unavailable' | 'wrong_address' | 'refused_delivery' | 'package_damaged' | 'address_not_found';
    attempts: number;
    maxAttempts: number;
    lastAttempt: string;
    customerPhone: string;
}

// ── Courier Partners ────────────────────────────
export const courierPartners: CourierPartner[] = [
    { id: 'delhivery', name: 'Delhivery', logo: 'D', status: 'active', avgDeliveryDays: 3.2, onTimePercent: 94, costPerShipment: 65, todayShipments: 42, codAvailable: true, rating: 4.5 },
    { id: 'bluedart', name: 'Blue Dart', logo: 'B', status: 'active', avgDeliveryDays: 2.8, onTimePercent: 96, costPerShipment: 85, todayShipments: 28, codAvailable: true, rating: 4.7 },
    { id: 'ekart', name: 'Ekart Logistics', logo: 'E', status: 'active', avgDeliveryDays: 3.5, onTimePercent: 91, costPerShipment: 55, todayShipments: 35, codAvailable: true, rating: 4.2 },
    { id: 'shiprocket', name: 'Shiprocket', logo: 'S', status: 'active', avgDeliveryDays: 4.0, onTimePercent: 88, costPerShipment: 48, todayShipments: 18, codAvailable: true, rating: 4.0 },
    { id: 'dtdc', name: 'DTDC Express', logo: 'T', status: 'degraded', avgDeliveryDays: 4.5, onTimePercent: 82, costPerShipment: 52, todayShipments: 12, codAvailable: false, rating: 3.8 },
    { id: 'xpressbees', name: 'Xpressbees', logo: 'X', status: 'active', avgDeliveryDays: 3.8, onTimePercent: 90, costPerShipment: 58, todayShipments: 22, codAvailable: true, rating: 4.1 },
];

// ── Active Shipments ────────────────────────────
export const activeShipments: ActiveShipment[] = [
    {
        awb: 'DEL-78901234', orderId: 'ORD-2024-0008', courierName: 'Delhivery', courierLogo: 'D',
        origin: 'Bengaluru', destination: 'Chennai', currentLocation: 'Chennai Sorting Center',
        status: 'out_for_delivery', eta: '2026-03-01T18:00:00Z', lastUpdate: '2026-03-01T08:00:00Z',
        checkpoints: [
            { city: 'Bengaluru', facility: 'Warehouse', status: 'Picked up', timestamp: '2026-02-28T10:00:00Z' },
            { city: 'Bengaluru', facility: 'Sorting Center', status: 'In transit', timestamp: '2026-02-28T14:00:00Z' },
            { city: 'Chennai', facility: 'Distribution Hub', status: 'Arrived at hub', timestamp: '2026-03-01T04:00:00Z' },
            { city: 'Chennai', facility: 'Local Delivery', status: 'Out for delivery', timestamp: '2026-03-01T08:00:00Z', isCurrent: true },
        ],
    },
    {
        awb: 'BLD-34567890', orderId: 'ORD-2024-0010', courierName: 'Blue Dart', courierLogo: 'B',
        origin: 'Bengaluru', destination: 'Chandigarh', currentLocation: 'Delhi Hub',
        status: 'in_transit', eta: '2026-03-02T18:00:00Z', lastUpdate: '2026-02-28T22:00:00Z',
        checkpoints: [
            { city: 'Bengaluru', facility: 'Warehouse', status: 'Picked up', timestamp: '2026-02-27T09:00:00Z' },
            { city: 'Bengaluru', facility: 'Airport Hub', status: 'In transit', timestamp: '2026-02-27T14:00:00Z' },
            { city: 'Delhi', facility: 'Central Hub', status: 'Arrived at hub', timestamp: '2026-02-28T06:00:00Z', isCurrent: true },
        ],
    },
    {
        awb: 'DEL-78901235', orderId: 'ORD-2024-0011', courierName: 'Delhivery', courierLogo: 'D',
        origin: 'Mumbai', destination: 'Bengaluru', currentLocation: 'Bengaluru Sorting Center',
        status: 'in_transit', eta: '2026-03-03T18:00:00Z', lastUpdate: '2026-03-01T04:00:00Z',
        checkpoints: [
            { city: 'Mumbai', facility: 'Warehouse', status: 'Picked up', timestamp: '2026-02-28T10:00:00Z' },
            { city: 'Bengaluru', facility: 'Sorting Center', status: 'In transit', timestamp: '2026-03-01T04:00:00Z', isCurrent: true },
        ],
    },
    {
        awb: 'EKR-56789013', orderId: 'ORD-2024-0012', courierName: 'Ekart', courierLogo: 'E',
        origin: 'Bengaluru', destination: 'Kanpur', currentLocation: 'Lucknow Hub',
        status: 'in_transit', eta: '2026-03-02T18:00:00Z', lastUpdate: '2026-02-28T14:00:00Z',
        checkpoints: [
            { city: 'Bengaluru', facility: 'FC', status: 'Dispatched', timestamp: '2026-02-27T11:00:00Z' },
            { city: 'Lucknow', facility: 'Regional Hub', status: 'In transit', timestamp: '2026-02-28T14:00:00Z', isCurrent: true },
        ],
    },
    {
        awb: 'SHR-12345678', orderId: 'ORD-2024-0021', courierName: 'Shiprocket', courierLogo: 'S',
        origin: 'Bengaluru', destination: 'Lucknow', currentLocation: 'In transit',
        status: 'picked_up', eta: '2026-03-04T18:00:00Z', lastUpdate: '2026-03-01T09:00:00Z',
        checkpoints: [
            { city: 'Bengaluru', facility: 'Warehouse', status: 'Picked up', timestamp: '2026-03-01T09:00:00Z', isCurrent: true },
        ],
    },
    {
        awb: 'BLD-34567892', orderId: 'ORD-2024-0022', courierName: 'Blue Dart', courierLogo: 'B',
        origin: 'Bengaluru', destination: 'Chennai', currentLocation: 'Pending pickup',
        status: 'pickup_pending', eta: '2026-03-04T18:00:00Z', lastUpdate: '2026-02-28T17:00:00Z',
        checkpoints: [],
    },
    // Exception shipments
    {
        awb: 'DEL-78901240', orderId: 'ORD-2024-0031', courierName: 'Delhivery', courierLogo: 'D',
        origin: 'Mumbai', destination: 'Pune', currentLocation: 'Pune Local Office',
        status: 'exception', eta: '2026-03-01T18:00:00Z', lastUpdate: '2026-03-01T10:00:00Z',
        exceptionType: 'Customer Unavailable',
        checkpoints: [
            { city: 'Mumbai', facility: 'Warehouse', status: 'Picked up', timestamp: '2026-02-27T10:00:00Z' },
            { city: 'Pune', facility: 'Local Office', status: 'Delivery attempted', timestamp: '2026-03-01T10:00:00Z', isCurrent: true },
        ],
    },
    {
        awb: 'EKR-56789020', orderId: 'ORD-2024-0032', courierName: 'Ekart', courierLogo: 'E',
        origin: 'Delhi', destination: 'Jaipur', currentLocation: 'Jaipur Delivery Hub',
        status: 'delivery_attempted', eta: '2026-03-01T18:00:00Z', lastUpdate: '2026-03-01T09:00:00Z',
        exceptionType: 'Address Not Found',
        checkpoints: [
            { city: 'Delhi', facility: 'FC', status: 'Dispatched', timestamp: '2026-02-28T08:00:00Z' },
            { city: 'Jaipur', facility: 'Delivery Hub', status: 'Delivery attempt failed', timestamp: '2026-03-01T09:00:00Z', isCurrent: true },
        ],
    },
];

// ── Return Requests ─────────────────────────────
export const returnRequests: ReturnRequest[] = [
    {
        returnId: 'RET-001', orderId: 'ORD-2024-0017', customerName: 'Lakshmi Bhat', customerPhone: '****4567',
        reason: 'damaged', description: 'Left earphone not working after 2 days of use. Crackling sound.',
        items: [{ title: 'Wireless Headphones', sku: 'ELEC-HP-BLK', qty: 1, condition: 'Defective' }],
        images: [], status: 'received', platform: 'amazon', requestedDate: '2026-02-24T10:00:00Z',
        courier: 'Delhivery', refundMethod: 'original',
        timeline: [
            { timestamp: '2026-02-24T10:00:00Z', event: 'Return requested by customer', actor: 'Customer' },
            { timestamp: '2026-02-24T16:00:00Z', event: 'Return approved', actor: 'Seller' },
            { timestamp: '2026-02-26T09:00:00Z', event: 'Reverse pickup completed', actor: 'Delhivery' },
            { timestamp: '2026-02-28T12:00:00Z', event: 'Return received at warehouse', actor: 'Seller' },
        ],
    },
    {
        returnId: 'RET-002', orderId: 'ORD-2024-0018', customerName: 'Kiran Deshmukh', customerPhone: '****8901',
        reason: 'wrong_item', description: 'Received armless chair instead of chair with adjustable armrests.',
        items: [{ title: 'Ergonomic Office Chair', sku: 'OFF-CHR-001', qty: 1, condition: 'Good' }],
        images: [], status: 'picked_up', platform: 'flipkart', requestedDate: '2026-02-23T08:00:00Z',
        courier: 'Ekart',
        timeline: [
            { timestamp: '2026-02-23T08:00:00Z', event: 'Return requested', actor: 'Customer' },
            { timestamp: '2026-02-23T14:00:00Z', event: 'Return approved by Flipkart', actor: 'Platform' },
            { timestamp: '2026-02-25T14:00:00Z', event: 'Return picked up by Ekart', actor: 'Ekart' },
        ],
    },
    {
        returnId: 'RET-003', orderId: 'ORD-2024-0023', customerName: 'Farhan Ali', customerPhone: '****9012',
        reason: 'quality_issue', description: 'Yoga mat has uneven thickness, one end is thinner than the other.',
        items: [{ title: 'Organic Cotton Yoga Mat', sku: 'FIT-YM-ORG', qty: 1, condition: 'Defective' }],
        images: [], status: 'requested', platform: 'shopify', requestedDate: '2026-02-28T10:00:00Z',
        timeline: [
            { timestamp: '2026-02-28T10:00:00Z', event: 'Return requested by customer', actor: 'Customer' },
        ],
    },
    {
        returnId: 'RET-004', orderId: 'ORD-2024-0014', customerName: 'Rajesh Pillai', customerPhone: '****2345',
        reason: 'not_required', description: 'Ordered by mistake, no longer needed.',
        items: [{ title: 'Ceramic Coffee Mug Set', sku: 'HOME-MUG-C4', qty: 1, condition: 'Unopened' }],
        images: [], status: 'rejected', platform: 'shopify', requestedDate: '2026-02-27T08:00:00Z',
        timeline: [
            { timestamp: '2026-02-27T08:00:00Z', event: 'Return requested', actor: 'Customer' },
            { timestamp: '2026-02-27T14:00:00Z', event: 'Return rejected — no-return policy for kitchenware', actor: 'Seller' },
        ],
    },
    {
        returnId: 'RET-005', orderId: 'ORD-2024-0028', customerName: 'Rekha Chaudhary', customerPhone: '****9012',
        reason: 'wrong_item', description: 'Received brown wallet instead of black as ordered.',
        items: [{ title: 'Leather Wallet', sku: 'ACC-WAL-LTH', qty: 1, condition: 'Unused' }],
        images: [], status: 'approved', platform: 'flipkart', requestedDate: '2026-02-25T10:00:00Z',
        courier: 'Ekart',
        timeline: [
            { timestamp: '2026-02-25T10:00:00Z', event: 'Return requested', actor: 'Customer' },
            { timestamp: '2026-02-25T16:00:00Z', event: 'Return approved — scheduling pickup', actor: 'Seller' },
        ],
    },
    {
        returnId: 'RET-006', orderId: 'ORD-2024-0013', customerName: 'Pooja Iyer', customerPhone: '****7890',
        reason: 'late_delivery', description: 'Product arrived 5 days late, needed for an event.',
        items: [{ title: 'Steel Water Bottle', sku: 'HOME-BTL-1L', qty: 2, condition: 'Unopened' }],
        images: [], status: 'refunded', platform: 'amazon', requestedDate: '2026-02-28T09:00:00Z',
        refundMethod: 'wallet',
        timeline: [
            { timestamp: '2026-02-28T09:00:00Z', event: 'Return requested', actor: 'Customer' },
            { timestamp: '2026-02-28T12:00:00Z', event: 'Auto-approved — late delivery confirmed', actor: 'System' },
            { timestamp: '2026-03-01T08:00:00Z', event: 'Refund of ₹1,770 issued to wallet', actor: 'System' },
        ],
    },
];

// ── Failed Deliveries ───────────────────────────
export const failedDeliveries: FailedDelivery[] = [
    {
        awb: 'DEL-78901240', orderId: 'ORD-2024-0031', courierName: 'Delhivery', courierLogo: 'D',
        customerName: 'Amit Kulkarni', destination: 'Pune, Maharashtra',
        failureReason: 'customer_unavailable', attempts: 2, maxAttempts: 3,
        lastAttempt: '2026-03-01T10:00:00Z', customerPhone: '****4567',
    },
    {
        awb: 'EKR-56789020', orderId: 'ORD-2024-0032', courierName: 'Ekart', courierLogo: 'E',
        customerName: 'Sowmya Rao', destination: 'Jaipur, Rajasthan',
        failureReason: 'address_not_found', attempts: 1, maxAttempts: 3,
        lastAttempt: '2026-03-01T09:00:00Z', customerPhone: '****8901',
    },
    {
        awb: 'BLD-34567895', orderId: 'ORD-2024-0033', courierName: 'Blue Dart', courierLogo: 'B',
        customerName: 'Harish Negi', destination: 'Dehradun, Uttarakhand',
        failureReason: 'refused_delivery', attempts: 1, maxAttempts: 3,
        lastAttempt: '2026-02-28T15:00:00Z', customerPhone: '****2345',
    },
    {
        awb: 'SHR-12345680', orderId: 'ORD-2024-0034', courierName: 'Shiprocket', courierLogo: 'S',
        customerName: 'Preeti Malhotra', destination: 'Bhopal, Madhya Pradesh',
        failureReason: 'customer_unavailable', attempts: 3, maxAttempts: 3,
        lastAttempt: '2026-02-28T11:00:00Z', customerPhone: '****6789',
    },
    {
        awb: 'DEL-78901241', orderId: 'ORD-2024-0035', courierName: 'Delhivery', courierLogo: 'D',
        customerName: 'Yogesh Sharma', destination: 'Indore, Madhya Pradesh',
        failureReason: 'wrong_address', attempts: 2, maxAttempts: 3,
        lastAttempt: '2026-03-01T07:00:00Z', customerPhone: '****0123',
    },
];

// ── Logistics KPIs ──────────────────────────────
export const logisticsKPIs = {
    totalShipments: 156,
    onTimePercent: 92.4,
    avgDeliveryDays: 3.4,
    pendingPickups: 18,
    deliveredToday: 24,
    exceptionsToday: 3,
};

export const courierDistribution = [
    { name: 'Delhivery', value: 35, color: '#FF6B35' },
    { name: 'Blue Dart', value: 22, color: '#3B82F6' },
    { name: 'Ekart', value: 20, color: '#F59E0B' },
    { name: 'Shiprocket', value: 13, color: '#10B981' },
    { name: 'DTDC', value: 6, color: '#6366F1' },
    { name: 'Xpressbees', value: 4, color: '#EC4899' },
];

export const deliveryPerformanceData = [
    { day: 'Mon', onTime: 92, delayed: 8 },
    { day: 'Tue', onTime: 95, delayed: 5 },
    { day: 'Wed', onTime: 88, delayed: 12 },
    { day: 'Thu', onTime: 94, delayed: 6 },
    { day: 'Fri', onTime: 91, delayed: 9 },
    { day: 'Sat', onTime: 96, delayed: 4 },
    { day: 'Sun', onTime: 90, delayed: 10 },
];
