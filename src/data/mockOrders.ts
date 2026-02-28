// ──────────────────────────────────────────────────
// Mock Orders — Extensive dataset for Screens 28-38
// ──────────────────────────────────────────────────

export type Platform = 'amazon' | 'flipkart' | 'shopify' | 'ondc';
export type OrderStatus = 'new' | 'processing' | 'packed' | 'shipped' | 'delivered' | 'returned' | 'cancelled';
export type PaymentType = 'prepaid' | 'cod' | 'partial';
export type FulfillmentType = 'platform' | 'self_ship' | 'dropship';

export interface OrderItem {
    productId: string;
    title: string;
    sku: string;
    qty: number;
    unitPrice: number;
    image: string;
}

export interface TimelineEvent {
    timestamp: string;
    event: string;
    actor: 'system' | 'seller' | 'platform' | 'customer' | 'courier';
    icon: string;
}

export interface CourierInfo {
    name: string;
    logo: string;
    awb: string;
    pickupTime?: string;
    estimatedDelivery?: string;
}

export interface Order {
    id: string;
    platform: Platform;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    deliveryAddress: {
        line1: string;
        line2?: string;
        city: string;
        state: string;
        pincode: string;
    };
    items: OrderItem[];
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
    paymentType: PaymentType;
    paymentStatus: 'paid' | 'pending';
    transactionId: string;
    status: OrderStatus;
    fulfillmentType: FulfillmentType;
    slaDeadline: string;
    createdAt: string;
    courier?: CourierInfo;
    tags: string[];
    notes: string;
    timeline: TimelineEvent[];
}

const images = {
    chair: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=80&q=60',
    headphones: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=80&q=60',
    yoga: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=80&q=60',
    bottle: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=80&q=60',
    lamp: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=80&q=60',
    mug: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=80&q=60',
    wallet: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=80&q=60',
    sneakers: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=80&q=60',
};

export const mockOrders: Order[] = [
    // ── New Orders ─────────────────────────────
    {
        id: 'ORD-2024-0001', platform: 'amazon', customerName: 'Rohan Sharma', customerPhone: '****5678', customerEmail: 'r***@gmail.com',
        deliveryAddress: { line1: '42, MG Road', line2: 'Near Metro Station', city: 'Bengaluru', state: 'Karnataka', pincode: '560001' },
        items: [{ productId: 'PROD-1001', title: 'Ergonomic Office Chair', sku: 'OFF-CHR-001', qty: 1, unitPrice: 4500, image: images.chair }],
        subtotal: 4500, discount: 0, tax: 810, total: 5310, paymentType: 'prepaid', paymentStatus: 'paid', transactionId: 'TXN-AMZ-88901',
        status: 'new', fulfillmentType: 'self_ship', slaDeadline: '2026-03-02T14:00:00Z', createdAt: '2026-03-01T09:30:00Z',
        tags: ['priority'], notes: '', timeline: [
            { timestamp: '2026-03-01T09:30:00Z', event: 'Order placed by customer', actor: 'customer', icon: 'shopping-cart' },
            { timestamp: '2026-03-01T09:31:00Z', event: 'Payment confirmed — ₹5,310', actor: 'system', icon: 'credit-card' },
        ],
    },
    {
        id: 'ORD-2024-0002', platform: 'flipkart', customerName: 'Priya Desai', customerPhone: '****1234', customerEmail: 'p***@yahoo.com',
        deliveryAddress: { line1: '78, Park Street', city: 'Mumbai', state: 'Maharashtra', pincode: '400001' },
        items: [
            { productId: 'PROD-1002', title: 'Wireless Headphones', sku: 'ELEC-HP-BLK', qty: 1, unitPrice: 8999, image: images.headphones },
            { productId: 'PROD-1004', title: 'Steel Water Bottle', sku: 'HOME-BTL-1L', qty: 2, unitPrice: 750, image: images.bottle },
        ],
        subtotal: 10499, discount: 500, tax: 1800, total: 11799, paymentType: 'cod', paymentStatus: 'pending', transactionId: 'TXN-FLK-44210',
        status: 'new', fulfillmentType: 'platform', slaDeadline: '2026-03-02T10:00:00Z', createdAt: '2026-03-01T08:15:00Z',
        tags: ['sla-risk'], notes: 'Customer requested early delivery', timeline: [
            { timestamp: '2026-03-01T08:15:00Z', event: 'Order placed on Flipkart', actor: 'platform', icon: 'shopping-cart' },
        ],
    },
    {
        id: 'ORD-2024-0003', platform: 'shopify', customerName: 'Anjali Verma', customerPhone: '****9012', customerEmail: 'a***@outlook.com',
        deliveryAddress: { line1: '15/A, Civil Lines', city: 'Jaipur', state: 'Rajasthan', pincode: '302001' },
        items: [{ productId: 'PROD-1005', title: 'Smart LED Desk Lamp', sku: 'HOME-LMP-SMT', qty: 1, unitPrice: 2100, image: images.lamp }],
        subtotal: 2100, discount: 0, tax: 378, total: 2478, paymentType: 'prepaid', paymentStatus: 'paid', transactionId: 'TXN-SHP-12330',
        status: 'new', fulfillmentType: 'self_ship', slaDeadline: '2026-03-03T18:00:00Z', createdAt: '2026-03-01T07:45:00Z',
        tags: [], notes: '', timeline: [
            { timestamp: '2026-03-01T07:45:00Z', event: 'Order placed via Shopify store', actor: 'customer', icon: 'shopping-cart' },
            { timestamp: '2026-03-01T07:46:00Z', event: 'Payment confirmed via Razorpay', actor: 'system', icon: 'credit-card' },
        ],
    },
    {
        id: 'ORD-2024-0004', platform: 'ondc', customerName: 'Vikram Reddy', customerPhone: '****3456', customerEmail: 'v***@gmail.com',
        deliveryAddress: { line1: '23, Banjara Hills', city: 'Hyderabad', state: 'Telangana', pincode: '500034' },
        items: [
            { productId: 'PROD-1006', title: 'Ceramic Coffee Mug Set', sku: 'HOME-MUG-C4', qty: 1, unitPrice: 850, image: images.mug },
            { productId: 'PROD-1004', title: 'Steel Water Bottle', sku: 'HOME-BTL-1L', qty: 1, unitPrice: 750, image: images.bottle },
        ],
        subtotal: 1600, discount: 100, tax: 270, total: 1770, paymentType: 'prepaid', paymentStatus: 'paid', transactionId: 'TXN-ONDC-5501',
        status: 'new', fulfillmentType: 'self_ship', slaDeadline: '2026-03-03T12:00:00Z', createdAt: '2026-03-01T06:20:00Z',
        tags: [], notes: '', timeline: [
            { timestamp: '2026-03-01T06:20:00Z', event: 'Order received via ONDC network', actor: 'platform', icon: 'shopping-cart' },
        ],
    },

    // ── Processing Orders ──────────────────────
    {
        id: 'ORD-2024-0005', platform: 'amazon', customerName: 'Meera Patel', customerPhone: '****7890', customerEmail: 'm***@gmail.com',
        deliveryAddress: { line1: '56, SG Highway', city: 'Ahmedabad', state: 'Gujarat', pincode: '380015' },
        items: [{ productId: 'PROD-1007', title: 'Minimalist Leather Wallet', sku: 'ACC-WAL-LTH', qty: 1, unitPrice: 1499, image: images.wallet }],
        subtotal: 1499, discount: 0, tax: 270, total: 1769, paymentType: 'prepaid', paymentStatus: 'paid', transactionId: 'TXN-AMZ-88902',
        status: 'processing', fulfillmentType: 'self_ship', slaDeadline: '2026-03-02T16:00:00Z', createdAt: '2026-02-28T14:00:00Z',
        tags: [], notes: 'Gift wrapping requested', timeline: [
            { timestamp: '2026-02-28T14:00:00Z', event: 'Order placed', actor: 'customer', icon: 'shopping-cart' },
            { timestamp: '2026-02-28T14:30:00Z', event: 'Order accepted by seller', actor: 'seller', icon: 'check-circle' },
            { timestamp: '2026-02-28T15:00:00Z', event: 'Processing started', actor: 'seller', icon: 'package' },
        ],
    },
    {
        id: 'ORD-2024-0006', platform: 'flipkart', customerName: 'Suresh Kumar', customerPhone: '****2345', customerEmail: 's***@gmail.com',
        deliveryAddress: { line1: '12, Connaught Place', city: 'New Delhi', state: 'Delhi', pincode: '110001' },
        items: [
            { productId: 'PROD-1001', title: 'Ergonomic Office Chair', sku: 'OFF-CHR-001', qty: 2, unitPrice: 4500, image: images.chair },
        ],
        subtotal: 9000, discount: 900, tax: 1458, total: 9558, paymentType: 'prepaid', paymentStatus: 'paid', transactionId: 'TXN-FLK-44211',
        status: 'processing', fulfillmentType: 'platform', slaDeadline: '2026-03-01T18:00:00Z', createdAt: '2026-02-28T11:00:00Z',
        tags: ['bulk', 'sla-risk'], notes: '', timeline: [
            { timestamp: '2026-02-28T11:00:00Z', event: 'Order placed on Flipkart', actor: 'platform', icon: 'shopping-cart' },
            { timestamp: '2026-02-28T11:30:00Z', event: 'Payment verified', actor: 'system', icon: 'credit-card' },
            { timestamp: '2026-02-28T12:00:00Z', event: 'Processing started — preparing 2 items', actor: 'seller', icon: 'package' },
        ],
    },
    {
        id: 'ORD-2024-0007', platform: 'shopify', customerName: 'Kavita Nair', customerPhone: '****6789', customerEmail: 'k***@gmail.com',
        deliveryAddress: { line1: '8, MG Road', city: 'Kochi', state: 'Kerala', pincode: '682011' },
        items: [{ productId: 'PROD-1003', title: 'Organic Cotton Yoga Mat', sku: 'FIT-YM-ORG', qty: 1, unitPrice: 1200, image: images.yoga }],
        subtotal: 1200, discount: 0, tax: 216, total: 1416, paymentType: 'cod', paymentStatus: 'pending', transactionId: 'TXN-SHP-12331',
        status: 'processing', fulfillmentType: 'self_ship', slaDeadline: '2026-03-03T14:00:00Z', createdAt: '2026-02-28T09:00:00Z',
        tags: [], notes: '', timeline: [
            { timestamp: '2026-02-28T09:00:00Z', event: 'Order placed', actor: 'customer', icon: 'shopping-cart' },
            { timestamp: '2026-02-28T10:00:00Z', event: 'Processing — packing initiated', actor: 'seller', icon: 'package' },
        ],
    },

    // ── Packed Orders ──────────────────────────
    {
        id: 'ORD-2024-0008', platform: 'amazon', customerName: 'Ravi Menon', customerPhone: '****4567', customerEmail: 'r***@yahoo.com',
        deliveryAddress: { line1: '33, Anna Nagar', city: 'Chennai', state: 'Tamil Nadu', pincode: '600040' },
        items: [{ productId: 'PROD-1002', title: 'Wireless Headphones', sku: 'ELEC-HP-BLK', qty: 1, unitPrice: 8999, image: images.headphones }],
        subtotal: 8999, discount: 1000, tax: 1440, total: 9439, paymentType: 'prepaid', paymentStatus: 'paid', transactionId: 'TXN-AMZ-88903',
        status: 'packed', fulfillmentType: 'self_ship', slaDeadline: '2026-03-01T12:00:00Z', createdAt: '2026-02-27T16:00:00Z',
        courier: { name: 'Delhivery', logo: 'D', awb: 'DEL-78901234', pickupTime: '2026-03-01T10:00:00Z', estimatedDelivery: '2026-03-04T18:00:00Z' },
        tags: ['packed'], notes: 'Fragile — handle with care', timeline: [
            { timestamp: '2026-02-27T16:00:00Z', event: 'Order placed', actor: 'customer', icon: 'shopping-cart' },
            { timestamp: '2026-02-27T17:00:00Z', event: 'Payment confirmed', actor: 'system', icon: 'credit-card' },
            { timestamp: '2026-02-28T09:00:00Z', event: 'Item packed', actor: 'seller', icon: 'package' },
            { timestamp: '2026-02-28T10:00:00Z', event: 'Courier assigned — Delhivery', actor: 'system', icon: 'truck' },
            { timestamp: '2026-02-28T10:05:00Z', event: 'Shipping label generated — AWB: DEL-78901234', actor: 'system', icon: 'file-text' },
        ],
    },
    {
        id: 'ORD-2024-0009', platform: 'flipkart', customerName: 'Deepa Joshi', customerPhone: '****8901', customerEmail: 'd***@gmail.com',
        deliveryAddress: { line1: '102, Model Town', city: 'Lucknow', state: 'Uttar Pradesh', pincode: '226001' },
        items: [
            { productId: 'PROD-1004', title: 'Steel Water Bottle', sku: 'HOME-BTL-1L', qty: 3, unitPrice: 750, image: images.bottle },
            { productId: 'PROD-1006', title: 'Ceramic Coffee Mug Set', sku: 'HOME-MUG-C4', qty: 1, unitPrice: 850, image: images.mug },
        ],
        subtotal: 3100, discount: 200, tax: 522, total: 3422, paymentType: 'cod', paymentStatus: 'pending', transactionId: 'TXN-FLK-44212',
        status: 'packed', fulfillmentType: 'platform', slaDeadline: '2026-03-01T14:00:00Z', createdAt: '2026-02-27T12:30:00Z',
        courier: { name: 'Ekart', logo: 'E', awb: 'EKR-56789012', pickupTime: '2026-03-01T11:00:00Z' },
        tags: [], notes: '', timeline: [
            { timestamp: '2026-02-27T12:30:00Z', event: 'Order placed', actor: 'platform', icon: 'shopping-cart' },
            { timestamp: '2026-02-28T08:00:00Z', event: 'Packed and ready', actor: 'seller', icon: 'package' },
            { timestamp: '2026-02-28T08:30:00Z', event: 'Ekart assigned — AWB: EKR-56789012', actor: 'system', icon: 'truck' },
        ],
    },

    // ── Shipped Orders ─────────────────────────
    {
        id: 'ORD-2024-0010', platform: 'amazon', customerName: 'Anil Gupta', customerPhone: '****0123', customerEmail: 'a***@gmail.com',
        deliveryAddress: { line1: '7, Sector 15', city: 'Chandigarh', state: 'Punjab', pincode: '160015' },
        items: [{ productId: 'PROD-1001', title: 'Ergonomic Office Chair', sku: 'OFF-CHR-001', qty: 1, unitPrice: 4500, image: images.chair }],
        subtotal: 4500, discount: 450, tax: 729, total: 4779, paymentType: 'prepaid', paymentStatus: 'paid', transactionId: 'TXN-AMZ-88904',
        status: 'shipped', fulfillmentType: 'self_ship', slaDeadline: '2026-03-01T18:00:00Z', createdAt: '2026-02-26T10:00:00Z',
        courier: { name: 'BlueDart', logo: 'B', awb: 'BLD-34567890', pickupTime: '2026-02-27T09:00:00Z', estimatedDelivery: '2026-03-02T18:00:00Z' },
        tags: ['in-transit'], notes: '', timeline: [
            { timestamp: '2026-02-26T10:00:00Z', event: 'Order placed', actor: 'customer', icon: 'shopping-cart' },
            { timestamp: '2026-02-26T10:30:00Z', event: 'Payment confirmed', actor: 'system', icon: 'credit-card' },
            { timestamp: '2026-02-26T14:00:00Z', event: 'Packed', actor: 'seller', icon: 'package' },
            { timestamp: '2026-02-27T09:00:00Z', event: 'Picked up by BlueDart', actor: 'courier', icon: 'truck' },
            { timestamp: '2026-02-28T06:00:00Z', event: 'In transit — reached Delhi hub', actor: 'courier', icon: 'map-pin' },
        ],
    },
    {
        id: 'ORD-2024-0011', platform: 'shopify', customerName: 'Neha Singh', customerPhone: '****5678', customerEmail: 'n***@gmail.com',
        deliveryAddress: { line1: '24, Whitefield', city: 'Bengaluru', state: 'Karnataka', pincode: '560066' },
        items: [{ productId: 'PROD-1007', title: 'Leather Wallet', sku: 'ACC-WAL-LTH', qty: 1, unitPrice: 1499, image: images.wallet }],
        subtotal: 1499, discount: 0, tax: 270, total: 1769, paymentType: 'prepaid', paymentStatus: 'paid', transactionId: 'TXN-SHP-12332',
        status: 'shipped', fulfillmentType: 'self_ship', slaDeadline: '2026-03-02T18:00:00Z', createdAt: '2026-02-27T08:00:00Z',
        courier: { name: 'Delhivery', logo: 'D', awb: 'DEL-78901235', pickupTime: '2026-02-28T10:00:00Z', estimatedDelivery: '2026-03-03T18:00:00Z' },
        tags: [], notes: '', timeline: [
            { timestamp: '2026-02-27T08:00:00Z', event: 'Order placed', actor: 'customer', icon: 'shopping-cart' },
            { timestamp: '2026-02-27T12:00:00Z', event: 'Packed', actor: 'seller', icon: 'package' },
            { timestamp: '2026-02-28T10:00:00Z', event: 'Picked up by Delhivery', actor: 'courier', icon: 'truck' },
            { timestamp: '2026-03-01T04:00:00Z', event: 'In transit — Bengaluru sorting center', actor: 'courier', icon: 'map-pin' },
        ],
    },
    {
        id: 'ORD-2024-0012', platform: 'flipkart', customerName: 'Amit Saxena', customerPhone: '****3456', customerEmail: 'am***@gmail.com',
        deliveryAddress: { line1: '45, Civil Lines', city: 'Kanpur', state: 'Uttar Pradesh', pincode: '208001' },
        items: [
            { productId: 'PROD-1002', title: 'Wireless Headphones', sku: 'ELEC-HP-BLK', qty: 1, unitPrice: 8999, image: images.headphones },
            { productId: 'PROD-1005', title: 'Smart LED Desk Lamp', sku: 'HOME-LMP-SMT', qty: 1, unitPrice: 2100, image: images.lamp },
        ],
        subtotal: 11099, discount: 1100, tax: 1800, total: 11799, paymentType: 'prepaid', paymentStatus: 'paid', transactionId: 'TXN-FLK-44213',
        status: 'shipped', fulfillmentType: 'platform', slaDeadline: '2026-03-03T18:00:00Z', createdAt: '2026-02-26T15:00:00Z',
        courier: { name: 'Ekart', logo: 'E', awb: 'EKR-56789013', pickupTime: '2026-02-27T11:00:00Z', estimatedDelivery: '2026-03-02T18:00:00Z' },
        tags: [], notes: '', timeline: [
            { timestamp: '2026-02-26T15:00:00Z', event: 'Order placed', actor: 'platform', icon: 'shopping-cart' },
            { timestamp: '2026-02-27T11:00:00Z', event: 'Picked up by Ekart', actor: 'courier', icon: 'truck' },
            { timestamp: '2026-02-28T14:00:00Z', event: 'In transit — Lucknow hub', actor: 'courier', icon: 'map-pin' },
        ],
    },

    // ── Delivered Orders ────────────────────────
    {
        id: 'ORD-2024-0013', platform: 'amazon', customerName: 'Pooja Iyer', customerPhone: '****7890', customerEmail: 'po***@gmail.com',
        deliveryAddress: { line1: '88, Koramangala', city: 'Bengaluru', state: 'Karnataka', pincode: '560034' },
        items: [{ productId: 'PROD-1004', title: 'Steel Water Bottle', sku: 'HOME-BTL-1L', qty: 2, unitPrice: 750, image: images.bottle }],
        subtotal: 1500, discount: 0, tax: 270, total: 1770, paymentType: 'prepaid', paymentStatus: 'paid', transactionId: 'TXN-AMZ-88905',
        status: 'delivered', fulfillmentType: 'self_ship', slaDeadline: '2026-02-28T18:00:00Z', createdAt: '2026-02-24T10:00:00Z',
        courier: { name: 'Delhivery', logo: 'D', awb: 'DEL-78901236', estimatedDelivery: '2026-02-27T18:00:00Z' },
        tags: ['delivered'], notes: '', timeline: [
            { timestamp: '2026-02-24T10:00:00Z', event: 'Order placed', actor: 'customer', icon: 'shopping-cart' },
            { timestamp: '2026-02-25T09:00:00Z', event: 'Shipped via Delhivery', actor: 'courier', icon: 'truck' },
            { timestamp: '2026-02-27T14:00:00Z', event: 'Delivered successfully', actor: 'courier', icon: 'check-circle' },
        ],
    },
    {
        id: 'ORD-2024-0014', platform: 'shopify', customerName: 'Rajesh Pillai', customerPhone: '****2345', customerEmail: 'raj***@gmail.com',
        deliveryAddress: { line1: '5, Beach Road', city: 'Visakhapatnam', state: 'Andhra Pradesh', pincode: '530001' },
        items: [{ productId: 'PROD-1006', title: 'Ceramic Coffee Mug Set', sku: 'HOME-MUG-C4', qty: 2, unitPrice: 850, image: images.mug }],
        subtotal: 1700, discount: 170, tax: 275, total: 1805, paymentType: 'cod', paymentStatus: 'paid', transactionId: 'TXN-SHP-12333',
        status: 'delivered', fulfillmentType: 'self_ship', slaDeadline: '2026-02-27T18:00:00Z', createdAt: '2026-02-22T08:00:00Z',
        courier: { name: 'BlueDart', logo: 'B', awb: 'BLD-34567891' },
        tags: [], notes: '', timeline: [
            { timestamp: '2026-02-22T08:00:00Z', event: 'Order placed', actor: 'customer', icon: 'shopping-cart' },
            { timestamp: '2026-02-23T10:00:00Z', event: 'Shipped', actor: 'courier', icon: 'truck' },
            { timestamp: '2026-02-26T16:00:00Z', event: 'Delivered — COD collected ₹1,805', actor: 'courier', icon: 'check-circle' },
        ],
    },
    {
        id: 'ORD-2024-0015', platform: 'flipkart', customerName: 'Sunita Rao', customerPhone: '****6789', customerEmail: 'su***@yahoo.com',
        deliveryAddress: { line1: '17, Jubilee Hills', city: 'Hyderabad', state: 'Telangana', pincode: '500033' },
        items: [
            { productId: 'PROD-1001', title: 'Ergonomic Office Chair', sku: 'OFF-CHR-001', qty: 1, unitPrice: 4500, image: images.chair },
            { productId: 'PROD-1005', title: 'Smart LED Desk Lamp', sku: 'HOME-LMP-SMT', qty: 1, unitPrice: 2100, image: images.lamp },
        ],
        subtotal: 6600, discount: 660, tax: 1069, total: 7009, paymentType: 'prepaid', paymentStatus: 'paid', transactionId: 'TXN-FLK-44214',
        status: 'delivered', fulfillmentType: 'platform', slaDeadline: '2026-02-26T18:00:00Z', createdAt: '2026-02-21T12:00:00Z',
        courier: { name: 'Ekart', logo: 'E', awb: 'EKR-56789014' },
        tags: [], notes: '', timeline: [
            { timestamp: '2026-02-21T12:00:00Z', event: 'Order placed', actor: 'platform', icon: 'shopping-cart' },
            { timestamp: '2026-02-22T09:00:00Z', event: 'Shipped via Ekart', actor: 'courier', icon: 'truck' },
            { timestamp: '2026-02-25T11:00:00Z', event: 'Delivered', actor: 'courier', icon: 'check-circle' },
        ],
    },
    {
        id: 'ORD-2024-0016', platform: 'ondc', customerName: 'Manoj Das', customerPhone: '****0123', customerEmail: 'man***@gmail.com',
        deliveryAddress: { line1: '60, Salt Lake', city: 'Kolkata', state: 'West Bengal', pincode: '700091' },
        items: [{ productId: 'PROD-1003', title: 'Yoga Mat', sku: 'FIT-YM-ORG', qty: 1, unitPrice: 1200, image: images.yoga }],
        subtotal: 1200, discount: 0, tax: 216, total: 1416, paymentType: 'prepaid', paymentStatus: 'paid', transactionId: 'TXN-ONDC-5502',
        status: 'delivered', fulfillmentType: 'self_ship', slaDeadline: '2026-02-28T12:00:00Z', createdAt: '2026-02-23T07:00:00Z',
        courier: { name: 'Delhivery', logo: 'D', awb: 'DEL-78901237' },
        tags: [], notes: '', timeline: [
            { timestamp: '2026-02-23T07:00:00Z', event: 'Order placed', actor: 'platform', icon: 'shopping-cart' },
            { timestamp: '2026-02-25T15:00:00Z', event: 'Delivered', actor: 'courier', icon: 'check-circle' },
        ],
    },

    // ── Returned Orders ────────────────────────
    {
        id: 'ORD-2024-0017', platform: 'amazon', customerName: 'Lakshmi Bhat', customerPhone: '****4567', customerEmail: 'l***@gmail.com',
        deliveryAddress: { line1: '19, Indiranagar', city: 'Bengaluru', state: 'Karnataka', pincode: '560038' },
        items: [{ productId: 'PROD-1002', title: 'Wireless Headphones', sku: 'ELEC-HP-BLK', qty: 1, unitPrice: 8999, image: images.headphones }],
        subtotal: 8999, discount: 0, tax: 1620, total: 10619, paymentType: 'prepaid', paymentStatus: 'paid', transactionId: 'TXN-AMZ-88906',
        status: 'returned', fulfillmentType: 'self_ship', slaDeadline: '2026-02-25T18:00:00Z', createdAt: '2026-02-20T09:00:00Z',
        courier: { name: 'Delhivery', logo: 'D', awb: 'DEL-78901238' },
        tags: ['return'], notes: 'Customer reported defective product', timeline: [
            { timestamp: '2026-02-20T09:00:00Z', event: 'Order placed', actor: 'customer', icon: 'shopping-cart' },
            { timestamp: '2026-02-23T14:00:00Z', event: 'Delivered', actor: 'courier', icon: 'check-circle' },
            { timestamp: '2026-02-24T10:00:00Z', event: 'Return request — Defective product', actor: 'customer', icon: 'rotate-ccw' },
            { timestamp: '2026-02-24T16:00:00Z', event: 'Return approved', actor: 'seller', icon: 'check' },
            { timestamp: '2026-02-26T09:00:00Z', event: 'Product picked up for return', actor: 'courier', icon: 'truck' },
            { timestamp: '2026-02-28T12:00:00Z', event: 'Return received at warehouse', actor: 'seller', icon: 'package' },
        ],
    },
    {
        id: 'ORD-2024-0018', platform: 'flipkart', customerName: 'Kiran Deshmukh', customerPhone: '****8901', customerEmail: 'ki***@gmail.com',
        deliveryAddress: { line1: '55, Kothrud', city: 'Pune', state: 'Maharashtra', pincode: '411038' },
        items: [{ productId: 'PROD-1001', title: 'Ergonomic Office Chair', sku: 'OFF-CHR-001', qty: 1, unitPrice: 4500, image: images.chair }],
        subtotal: 4500, discount: 500, tax: 720, total: 4720, paymentType: 'cod', paymentStatus: 'paid', transactionId: 'TXN-FLK-44215',
        status: 'returned', fulfillmentType: 'platform', slaDeadline: '2026-02-24T18:00:00Z', createdAt: '2026-02-19T11:00:00Z',
        courier: { name: 'Ekart', logo: 'E', awb: 'EKR-56789015' },
        tags: ['return'], notes: 'Size not as expected', timeline: [
            { timestamp: '2026-02-19T11:00:00Z', event: 'Order placed', actor: 'platform', icon: 'shopping-cart' },
            { timestamp: '2026-02-22T10:00:00Z', event: 'Delivered', actor: 'courier', icon: 'check-circle' },
            { timestamp: '2026-02-23T08:00:00Z', event: 'Return requested — Wrong size', actor: 'customer', icon: 'rotate-ccw' },
            { timestamp: '2026-02-25T14:00:00Z', event: 'Return picked up', actor: 'courier', icon: 'truck' },
        ],
    },

    // ── Cancelled Orders ───────────────────────
    {
        id: 'ORD-2024-0019', platform: 'shopify', customerName: 'Arjun Kapoor', customerPhone: '****2345', customerEmail: 'ar***@gmail.com',
        deliveryAddress: { line1: '22, Bandra West', city: 'Mumbai', state: 'Maharashtra', pincode: '400050' },
        items: [{ productId: 'PROD-1005', title: 'Smart LED Desk Lamp', sku: 'HOME-LMP-SMT', qty: 2, unitPrice: 2100, image: images.lamp }],
        subtotal: 4200, discount: 0, tax: 756, total: 4956, paymentType: 'prepaid', paymentStatus: 'paid', transactionId: 'TXN-SHP-12334',
        status: 'cancelled', fulfillmentType: 'self_ship', slaDeadline: '2026-03-01T18:00:00Z', createdAt: '2026-02-27T15:00:00Z',
        tags: [], notes: 'Customer cancelled — found cheaper elsewhere', timeline: [
            { timestamp: '2026-02-27T15:00:00Z', event: 'Order placed', actor: 'customer', icon: 'shopping-cart' },
            { timestamp: '2026-02-27T15:30:00Z', event: 'Payment confirmed', actor: 'system', icon: 'credit-card' },
            { timestamp: '2026-02-27T18:00:00Z', event: 'Cancellation requested by customer', actor: 'customer', icon: 'x-circle' },
            { timestamp: '2026-02-27T18:30:00Z', event: 'Order cancelled — refund initiated', actor: 'seller', icon: 'x-circle' },
        ],
    },
    {
        id: 'ORD-2024-0020', platform: 'amazon', customerName: 'Divya Sharma', customerPhone: '****6789', customerEmail: 'di***@gmail.com',
        deliveryAddress: { line1: '90, Vaishali Nagar', city: 'Jaipur', state: 'Rajasthan', pincode: '302021' },
        items: [
            { productId: 'PROD-1006', title: 'Ceramic Mug Set', sku: 'HOME-MUG-C4', qty: 1, unitPrice: 850, image: images.mug },
            { productId: 'PROD-1004', title: 'Steel Water Bottle', sku: 'HOME-BTL-1L', qty: 1, unitPrice: 750, image: images.bottle },
        ],
        subtotal: 1600, discount: 0, tax: 288, total: 1888, paymentType: 'cod', paymentStatus: 'pending', transactionId: 'TXN-AMZ-88907',
        status: 'cancelled', fulfillmentType: 'self_ship', slaDeadline: '2026-03-02T18:00:00Z', createdAt: '2026-02-28T16:00:00Z',
        tags: [], notes: 'Cancelled — out of stock', timeline: [
            { timestamp: '2026-02-28T16:00:00Z', event: 'Order placed', actor: 'customer', icon: 'shopping-cart' },
            { timestamp: '2026-03-01T08:00:00Z', event: 'Cancelled by seller — item out of stock', actor: 'seller', icon: 'x-circle' },
        ],
    },

    // ── More diverse orders ────────────────────
    {
        id: 'ORD-2024-0021', platform: 'ondc', customerName: 'Sanjay Mishra', customerPhone: '****1234', customerEmail: 'sa***@gmail.com',
        deliveryAddress: { line1: '14, Gomti Nagar', city: 'Lucknow', state: 'Uttar Pradesh', pincode: '226010' },
        items: [{ productId: 'PROD-1007', title: 'Leather Wallet', sku: 'ACC-WAL-LTH', qty: 2, unitPrice: 1499, image: images.wallet }],
        subtotal: 2998, discount: 300, tax: 486, total: 3184, paymentType: 'prepaid', paymentStatus: 'paid', transactionId: 'TXN-ONDC-5503',
        status: 'shipped', fulfillmentType: 'self_ship', slaDeadline: '2026-03-04T18:00:00Z', createdAt: '2026-02-28T13:00:00Z',
        courier: { name: 'Shiprocket', logo: 'S', awb: 'SHR-12345678', estimatedDelivery: '2026-03-04T18:00:00Z' },
        tags: [], notes: '', timeline: [
            { timestamp: '2026-02-28T13:00:00Z', event: 'Order placed', actor: 'platform', icon: 'shopping-cart' },
            { timestamp: '2026-03-01T09:00:00Z', event: 'Shipped via Shiprocket', actor: 'courier', icon: 'truck' },
        ],
    },
    {
        id: 'ORD-2024-0022', platform: 'amazon', customerName: 'Nandini Krishnan', customerPhone: '****5678', customerEmail: 'na***@gmail.com',
        deliveryAddress: { line1: '36, T Nagar', city: 'Chennai', state: 'Tamil Nadu', pincode: '600017' },
        items: [
            { productId: 'PROD-1002', title: 'Wireless Headphones', sku: 'ELEC-HP-BLK', qty: 1, unitPrice: 8999, image: images.headphones },
            { productId: 'PROD-1007', title: 'Leather Wallet', sku: 'ACC-WAL-LTH', qty: 1, unitPrice: 1499, image: images.wallet },
        ],
        subtotal: 10498, discount: 1050, tax: 1701, total: 11149, paymentType: 'prepaid', paymentStatus: 'paid', transactionId: 'TXN-AMZ-88908',
        status: 'packed', fulfillmentType: 'self_ship', slaDeadline: '2026-03-02T14:00:00Z', createdAt: '2026-02-28T10:00:00Z',
        courier: { name: 'BlueDart', logo: 'B', awb: 'BLD-34567892', pickupTime: '2026-03-01T09:00:00Z' },
        tags: [], notes: '', timeline: [
            { timestamp: '2026-02-28T10:00:00Z', event: 'Order placed', actor: 'customer', icon: 'shopping-cart' },
            { timestamp: '2026-02-28T16:00:00Z', event: 'Packed — 2 items', actor: 'seller', icon: 'package' },
            { timestamp: '2026-02-28T17:00:00Z', event: 'BlueDart assigned', actor: 'system', icon: 'truck' },
        ],
    },
    {
        id: 'ORD-2024-0023', platform: 'shopify', customerName: 'Farhan Ali', customerPhone: '****9012', customerEmail: 'fa***@gmail.com',
        deliveryAddress: { line1: '71, Malviya Nagar', city: 'New Delhi', state: 'Delhi', pincode: '110017' },
        items: [{ productId: 'PROD-1003', title: 'Yoga Mat', sku: 'FIT-YM-ORG', qty: 1, unitPrice: 1200, image: images.yoga }],
        subtotal: 1200, discount: 0, tax: 216, total: 1416, paymentType: 'prepaid', paymentStatus: 'paid', transactionId: 'TXN-SHP-12335',
        status: 'delivered', fulfillmentType: 'self_ship', slaDeadline: '2026-02-28T18:00:00Z', createdAt: '2026-02-24T14:00:00Z',
        courier: { name: 'Delhivery', logo: 'D', awb: 'DEL-78901239' },
        tags: [], notes: '', timeline: [
            { timestamp: '2026-02-24T14:00:00Z', event: 'Order placed', actor: 'customer', icon: 'shopping-cart' },
            { timestamp: '2026-02-27T16:00:00Z', event: 'Delivered', actor: 'courier', icon: 'check-circle' },
        ],
    },
    {
        id: 'ORD-2024-0024', platform: 'flipkart', customerName: 'Geeta Bansal', customerPhone: '****3456', customerEmail: 'ge***@yahoo.com',
        deliveryAddress: { line1: '28, Sector 44', city: 'Gurugram', state: 'Haryana', pincode: '122003' },
        items: [{ productId: 'PROD-1004', title: 'Steel Water Bottle', sku: 'HOME-BTL-1L', qty: 4, unitPrice: 750, image: images.bottle }],
        subtotal: 3000, discount: 300, tax: 486, total: 3186, paymentType: 'cod', paymentStatus: 'pending', transactionId: 'TXN-FLK-44216',
        status: 'new', fulfillmentType: 'platform', slaDeadline: '2026-03-02T18:00:00Z', createdAt: '2026-03-01T05:30:00Z',
        tags: ['bulk'], notes: 'Corporate gift order', timeline: [
            { timestamp: '2026-03-01T05:30:00Z', event: 'Order placed on Flipkart', actor: 'platform', icon: 'shopping-cart' },
        ],
    },
    {
        id: 'ORD-2024-0025', platform: 'amazon', customerName: 'Rahul Dubey', customerPhone: '****7890', customerEmail: 'ra***@gmail.com',
        deliveryAddress: { line1: '83, Gomti Nagar Ext', city: 'Lucknow', state: 'Uttar Pradesh', pincode: '226028' },
        items: [{ productId: 'PROD-1001', title: 'Ergonomic Office Chair', sku: 'OFF-CHR-001', qty: 1, unitPrice: 4500, image: images.chair }],
        subtotal: 4500, discount: 0, tax: 810, total: 5310, paymentType: 'partial', paymentStatus: 'paid', transactionId: 'TXN-AMZ-88909',
        status: 'processing', fulfillmentType: 'self_ship', slaDeadline: '2026-03-03T14:00:00Z', createdAt: '2026-03-01T04:00:00Z',
        tags: [], notes: '', timeline: [
            { timestamp: '2026-03-01T04:00:00Z', event: 'Order placed', actor: 'customer', icon: 'shopping-cart' },
            { timestamp: '2026-03-01T05:00:00Z', event: 'Processing', actor: 'seller', icon: 'package' },
        ],
    },
    {
        id: 'ORD-2024-0026', platform: 'ondc', customerName: 'Tanvi Jain', customerPhone: '****1234', customerEmail: 'ta***@gmail.com',
        deliveryAddress: { line1: '16, Aundh', city: 'Pune', state: 'Maharashtra', pincode: '411007' },
        items: [{ productId: 'PROD-1006', title: 'Ceramic Mug Set', sku: 'HOME-MUG-C4', qty: 1, unitPrice: 850, image: images.mug }],
        subtotal: 850, discount: 0, tax: 153, total: 1003, paymentType: 'prepaid', paymentStatus: 'paid', transactionId: 'TXN-ONDC-5504',
        status: 'processing', fulfillmentType: 'self_ship', slaDeadline: '2026-03-04T18:00:00Z', createdAt: '2026-03-01T03:00:00Z',
        tags: [], notes: '', timeline: [
            { timestamp: '2026-03-01T03:00:00Z', event: 'Order placed via ONDC', actor: 'platform', icon: 'shopping-cart' },
            { timestamp: '2026-03-01T04:00:00Z', event: 'Processing started', actor: 'seller', icon: 'package' },
        ],
    },
    {
        id: 'ORD-2024-0027', platform: 'shopify', customerName: 'Ishaan Mehta', customerPhone: '****5678', customerEmail: 'is***@gmail.com',
        deliveryAddress: { line1: '50, Satellite', city: 'Ahmedabad', state: 'Gujarat', pincode: '380015' },
        items: [
            { productId: 'PROD-1005', title: 'Smart LED Desk Lamp', sku: 'HOME-LMP-SMT', qty: 1, unitPrice: 2100, image: images.lamp },
            { productId: 'PROD-1003', title: 'Yoga Mat', sku: 'FIT-YM-ORG', qty: 1, unitPrice: 1200, image: images.yoga },
        ],
        subtotal: 3300, discount: 330, tax: 535, total: 3505, paymentType: 'prepaid', paymentStatus: 'paid', transactionId: 'TXN-SHP-12336',
        status: 'shipped', fulfillmentType: 'self_ship', slaDeadline: '2026-03-03T18:00:00Z', createdAt: '2026-02-27T16:00:00Z',
        courier: { name: 'Shiprocket', logo: 'S', awb: 'SHR-12345679', estimatedDelivery: '2026-03-03T18:00:00Z' },
        tags: [], notes: '', timeline: [
            { timestamp: '2026-02-27T16:00:00Z', event: 'Order placed', actor: 'customer', icon: 'shopping-cart' },
            { timestamp: '2026-02-28T14:00:00Z', event: 'Shipped via Shiprocket', actor: 'courier', icon: 'truck' },
        ],
    },
    {
        id: 'ORD-2024-0028', platform: 'flipkart', customerName: 'Rekha Chaudhary', customerPhone: '****9012', customerEmail: 're***@gmail.com',
        deliveryAddress: { line1: '39, Civil Lines', city: 'Nagpur', state: 'Maharashtra', pincode: '440001' },
        items: [{ productId: 'PROD-1007', title: 'Leather Wallet', sku: 'ACC-WAL-LTH', qty: 1, unitPrice: 1499, image: images.wallet }],
        subtotal: 1499, discount: 150, tax: 243, total: 1592, paymentType: 'prepaid', paymentStatus: 'paid', transactionId: 'TXN-FLK-44217',
        status: 'delivered', fulfillmentType: 'platform', slaDeadline: '2026-02-26T18:00:00Z', createdAt: '2026-02-20T10:00:00Z',
        courier: { name: 'Ekart', logo: 'E', awb: 'EKR-56789016' },
        tags: [], notes: '', timeline: [
            { timestamp: '2026-02-20T10:00:00Z', event: 'Order placed', actor: 'platform', icon: 'shopping-cart' },
            { timestamp: '2026-02-24T11:00:00Z', event: 'Delivered', actor: 'courier', icon: 'check-circle' },
        ],
    },
    {
        id: 'ORD-2024-0029', platform: 'amazon', customerName: 'Vivek Pandey', customerPhone: '****3456', customerEmail: 'vi***@gmail.com',
        deliveryAddress: { line1: '64, Hazratganj', city: 'Lucknow', state: 'Uttar Pradesh', pincode: '226001' },
        items: [{ productId: 'PROD-1002', title: 'Wireless Headphones', sku: 'ELEC-HP-BLK', qty: 1, unitPrice: 8999, image: images.headphones }],
        subtotal: 8999, discount: 900, tax: 1458, total: 9557, paymentType: 'prepaid', paymentStatus: 'paid', transactionId: 'TXN-AMZ-88910',
        status: 'cancelled', fulfillmentType: 'self_ship', slaDeadline: '2026-03-02T18:00:00Z', createdAt: '2026-02-28T20:00:00Z',
        tags: [], notes: 'Payment dispute', timeline: [
            { timestamp: '2026-02-28T20:00:00Z', event: 'Order placed', actor: 'customer', icon: 'shopping-cart' },
            { timestamp: '2026-03-01T06:00:00Z', event: 'Cancelled — payment dispute', actor: 'system', icon: 'x-circle' },
        ],
    },
    {
        id: 'ORD-2024-0030', platform: 'ondc', customerName: 'Parveen Kaur', customerPhone: '****7890', customerEmail: 'pa***@gmail.com',
        deliveryAddress: { line1: '11, Model Town', city: 'Amritsar', state: 'Punjab', pincode: '143001' },
        items: [
            { productId: 'PROD-1004', title: 'Steel Water Bottle', sku: 'HOME-BTL-1L', qty: 2, unitPrice: 750, image: images.bottle },
            { productId: 'PROD-1006', title: 'Ceramic Mug Set', sku: 'HOME-MUG-C4', qty: 1, unitPrice: 850, image: images.mug },
        ],
        subtotal: 2350, discount: 0, tax: 423, total: 2773, paymentType: 'cod', paymentStatus: 'pending', transactionId: 'TXN-ONDC-5505',
        status: 'new', fulfillmentType: 'self_ship', slaDeadline: '2026-03-04T18:00:00Z', createdAt: '2026-03-01T02:00:00Z',
        tags: [], notes: '', timeline: [
            { timestamp: '2026-03-01T02:00:00Z', event: 'Order received via ONDC', actor: 'platform', icon: 'shopping-cart' },
        ],
    },
];

// Helper counts
export const orderStats = {
    total: mockOrders.length,
    byStatus: {
        new: mockOrders.filter(o => o.status === 'new').length,
        processing: mockOrders.filter(o => o.status === 'processing').length,
        packed: mockOrders.filter(o => o.status === 'packed').length,
        shipped: mockOrders.filter(o => o.status === 'shipped').length,
        delivered: mockOrders.filter(o => o.status === 'delivered').length,
        returned: mockOrders.filter(o => o.status === 'returned').length,
        cancelled: mockOrders.filter(o => o.status === 'cancelled').length,
    },
    byPlatform: {
        amazon: mockOrders.filter(o => o.platform === 'amazon').length,
        flipkart: mockOrders.filter(o => o.platform === 'flipkart').length,
        shopify: mockOrders.filter(o => o.platform === 'shopify').length,
        ondc: mockOrders.filter(o => o.platform === 'ondc').length,
    },
};
