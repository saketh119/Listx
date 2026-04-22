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

// Connect platform API endpoint
integrations.post('/connect', authMiddleware, zValidator('json', connectSchema), async (c) => {
  const user = c.get('user');
  const { platformId, apiKey } = c.req.valid('json');
  const token = c.req.header('Authorization')?.replace('Bearer ', '');
  const supabase = getSupabase(token);

  try {
    // 1. Fetch data from FakeStore API
    const [productsRes, usersRes, cartsRes] = await Promise.all([
      fetch('https://fakestoreapi.com/products'),
      fetch('https://fakestoreapi.com/users'),
      fetch('https://fakestoreapi.com/carts?limit=10') // Limit carts to avoid too many mock orders
    ]);

    if (!productsRes.ok || !usersRes.ok || !cartsRes.ok) {
      throw new Error('Failed to fetch data from FakeStore API');
    }

    const fakeProducts = await productsRes.json();
    const fakeUsers = await usersRes.json();
    const fakeCarts = await cartsRes.json();

    // 2. Map and Insert Products
    const productsToInsert = fakeProducts.map((p: any) => ({
      title: p.title,
      description: p.description,
      sku: `${platformId.toUpperCase()}-FS-${p.id}`,
      price: p.price,
      stock: Math.floor(Math.random() * 200) + 10,
      status: 'active',
      category: p.category,
      platforms: [platformId],
      user_id: user.id,
      image_url: p.image
    }));

    const { data: insertedProducts, error: productError } = await supabase
      .from('products')
      .insert(productsToInsert)
      .select();

    if (productError) throw productError;

    // Create a map for quick product lookup by FakeStore ID
    const productMap = new Map();
    insertedProducts.forEach((p: any) => {
      const match = p.sku.match(/-FS-(\d+)$/);
      if (match) {
        productMap.set(parseInt(match[1]), p);
      }
    });

    // 3. Map and Insert Orders
    const orderItemsToInsert: any[] = [];
    
    // Map users for quick lookup by ID
    const userMap = new Map();
    fakeUsers.forEach((u: any) => userMap.set(u.id, u));

    const preparedOrders = fakeCarts.map((cart: any) => {
      const fakeUser = userMap.get(cart.userId) || fakeUsers[0];
      
      // Calculate totals
      let subtotal = 0;
      const cartItems = cart.products.map((cartItem: any) => {
        const dbProduct = productMap.get(cartItem.productId);
        if (dbProduct) {
          const itemTotal = dbProduct.price * cartItem.quantity;
          subtotal += itemTotal;
          return {
            product_id: dbProduct.id,
            title: dbProduct.title,
            sku: dbProduct.sku,
            qty: cartItem.quantity,
            unit_price: dbProduct.price,
            image_url: dbProduct.image_url
          };
        }
        return null;
      }).filter(Boolean);

      return {
        order: {
          user_id: user.id,
          platform: platformId,
          customer_name: `${fakeUser.name.firstname} ${fakeUser.name.lastname}`,
          customer_email: fakeUser.email,
          customer_phone: fakeUser.phone,
          delivery_address: {
            city: fakeUser.address.city,
            street: fakeUser.address.street,
            number: fakeUser.address.number,
            zipcode: fakeUser.address.zipcode
          },
          subtotal: subtotal,
          total: subtotal, // Assuming no tax/discount for mock data
          status: 'pending',
          payment_type: 'prepaid',
          payment_status: 'paid'
        },
        items: cartItems
      };
    });

    // Insert Orders
    const { data: insertedOrders, error: orderError } = await supabase
      .from('orders')
      .insert(preparedOrders.map((po: any) => po.order))
      .select();

    if (orderError) throw orderError;

    // Prepare and Insert Order Items
    insertedOrders.forEach((order, index) => {
      const items = preparedOrders[index].items;
      items.forEach((item: any) => {
        orderItemsToInsert.push({
          ...item,
          order_id: order.id
        });
      });
    });

    if (orderItemsToInsert.length > 0) {
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsToInsert);
      
      if (itemsError) throw itemsError;
    }

    // 4. Update the platforms array on the profile
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
