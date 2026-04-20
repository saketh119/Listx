export const seedDatabase = async (userId, supabase) => {
    console.log(`Seeding database for user: ${userId}`);
    // 1. Seed Products
    const mockProducts = [
        {
            user_id: userId,
            title: "Ergonomic Office Chair",
            sku: "OFF-CHR-001",
            price: 4500,
            stock: 142,
            status: 'active',
            category: "Furniture",
            platforms: ['amazon', 'shopify'],
            ai_score: 92
        },
        {
            user_id: userId,
            title: "Wireless Headphones",
            sku: "ELEC-HP-BLK",
            price: 8999,
            stock: 45,
            status: 'active',
            category: "Electronics",
            platforms: ['amazon', 'flipkart'],
            ai_score: 78
        },
        {
            user_id: userId,
            title: "Yoga Mat",
            sku: "FIT-YM-ORG",
            price: 1200,
            stock: 0,
            status: 'out_of_stock',
            category: "Fitness",
            platforms: ['amazon'],
            ai_score: 85
        }
    ];
    const { data: products, error: prodError } = await supabase
        .from('products')
        .upsert(mockProducts, { onConflict: 'sku' })
        .select();
    if (prodError)
        throw prodError;
    // 2. Seed Orders
    const mockOrders = [
        {
            user_id: userId,
            platform: "amazon",
            customer_name: "Rohan Sharma",
            total: 4500,
            status: "pending",
            subtotal: 4500
        },
        {
            user_id: userId,
            platform: "shopify",
            customer_name: "Priya Desai",
            total: 10199,
            status: "processing",
            subtotal: 10199
        }
    ];
    const { data: orders, error: orderError } = await supabase
        .from('orders')
        .insert(mockOrders)
        .select();
    if (orderError)
        throw orderError;
    // 3. Seed Order Items
    if (orders && products) {
        const orderItems = [
            {
                order_id: orders[0].id,
                product_id: products[0].id,
                qty: 1,
                unit_price: 4500,
                title: products[0].title,
                sku: products[0].sku
            }
        ];
        const { error: itemError } = await supabase
            .from('order_items')
            .insert(orderItems);
        if (itemError)
            throw itemError;
    }
    return { products, orders };
};
//# sourceMappingURL=seed.js.map