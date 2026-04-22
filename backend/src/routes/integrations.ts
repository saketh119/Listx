import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { getSupabase } from '../lib/supabase.js';
import { authMiddleware } from '../middleware/auth.js';
import { Env } from '../types.js';

const integrations = new Hono<Env>();

const connectSchema = z.object({
  platformId: z.string().min(1),
  apiKey: z.string().min(1)
});

// Helper to generate some random products
function generateMockProducts(platformId: string, userId: string) {
  const isAmazon = platformId === 'amazon';
  const isShopify = platformId === 'shopify';
  
  const products = [
    {
      title: isAmazon ? 'Wireless Over-Ear Headphones' : isShopify ? 'Minimalist T-Shirt' : 'Premium Office Chair',
      description: `Synced automatically from ${platformId}`,
      sku: `${platformId.toUpperCase()}-${Math.floor(Math.random() * 10000)}`,
      price: isAmazon ? 89.99 : 24.99,
      stock: Math.floor(Math.random() * 200) + 10,
      status: 'active',
      category: isAmazon ? 'Electronics' : isShopify ? 'Apparel' : 'Furniture',
      platforms: [platformId],
      user_id: userId
    },
    {
      title: isAmazon ? 'Smart Home Hub v2' : isShopify ? 'Classic Denim Jacket' : 'Standing Desk Converter',
      description: `Synced automatically from ${platformId}`,
      sku: `${platformId.toUpperCase()}-${Math.floor(Math.random() * 10000)}`,
      price: isAmazon ? 129.50 : 65.00,
      stock: Math.floor(Math.random() * 50) + 5,
      status: 'active',
      category: isAmazon ? 'Electronics' : isShopify ? 'Apparel' : 'Furniture',
      platforms: [platformId],
      user_id: userId
    },
    {
      title: isAmazon ? '4K Action Camera' : isShopify ? 'Vintage Leather Belt' : 'Ergonomic Keyboard',
      description: `Synced automatically from ${platformId}`,
      sku: `${platformId.toUpperCase()}-${Math.floor(Math.random() * 10000)}`,
      price: isAmazon ? 199.99 : 35.00,
      stock: Math.floor(Math.random() * 100) + 1,
      status: 'active',
      category: isAmazon ? 'Electronics' : isShopify ? 'Accessories' : 'Electronics',
      platforms: [platformId],
      user_id: userId
    }
  ];
  return products;
}

// Connect platform API endpoint
integrations.post('/connect', authMiddleware, zValidator('json', connectSchema), async (c) => {
  const user = c.get('user');
  const { platformId, apiKey } = c.req.valid('json');
  const token = c.req.header('Authorization')?.replace('Bearer ', '');
  const supabase = getSupabase(token);

  try {
    // 1. Simulate authentication delay with third party API
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 2. Generate and Insert Mock Products
    const mockProducts = generateMockProducts(platformId, user.id);
    const { data: insertedProducts, error: productError } = await supabase
      .from('products')
      .insert(mockProducts)
      .select();

    if (productError) throw productError;

    // 3. Generate Mock Orders attached to the newly connected platform
    const mockOrders = insertedProducts.map(p => ({
      user_id: user.id,
      platform: platformId,
      customer_name: `Customer ${Math.floor(Math.random() * 1000)}`,
      customer_email: `customer${Math.floor(Math.random() * 1000)}@example.com`,
      subtotal: p.price,
      total: p.price,
      status: 'pending',
      payment_type: 'prepaid',
      payment_status: 'paid'
    }));

    const { data: insertedOrders, error: orderError } = await supabase
      .from('orders')
      .insert(mockOrders)
      .select();

    if (orderError) throw orderError;

    // 4. Ideally, save the API key or 'connected' state to user profiles or an integrations table
    // For now, we update the platforms array on the profile if it exists
    const { data: profileData } = await supabase
      .from('profiles')
      .select('platforms')
      .eq('id', user.id)
      .single();

    if (profileData) {
      let platforms = profileData.platforms || [];
      if (!platforms.includes(platformId)) {
        platforms.push(platformId);
        await supabase.from('profiles').update({ platforms }).eq('id', user.id);
      }
    }

    return c.json({ 
      success: true, 
      message: `Successfully connected ${platformId}`,
      syncedProducts: insertedProducts.length,
      syncedOrders: insertedOrders.length
    });

  } catch (err: any) {
    console.error('Integration Error:', err);
    return c.json({ error: err.message || 'Failed to connect integration' }, 400);
  }
});
// Get integrations status
integrations.get('/', authMiddleware, async (c) => {
  const user = c.get('user');
  const token = c.req.header('Authorization')?.replace('Bearer ', '');
  const supabase = getSupabase(token);

  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('platforms')
      .eq('id', user.id)
      .single();

    const connectedPlatforms = profile?.platforms || [];

    const stats = await Promise.all(connectedPlatforms.map(async (p: string) => {
      // Get exact count of products for this platform
      const { count: productCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .contains('platforms', [p]);

      // Get count of orders for this platform created today
      const todayStr = new Date().toISOString().split('T')[0];
      const { count: orderCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('platform', p)
        .gte('created_at', todayStr);

      return {
        id: p,
        status: 'connected',
        productsLinked: productCount || 0,
        ordersToday: orderCount || 0,
        lastSync: new Date().toISOString()
      };
    }));

    return c.json({ platforms: stats });
  } catch (err: any) {
    console.error('Fetch Integrations Error:', err);
    return c.json({ error: 'Failed to fetch integrations status' }, 500);
  }
});
export default integrations;
