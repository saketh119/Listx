import { Hono } from 'hono';
import { getSupabase } from '../lib/supabase.js';
import { authMiddleware } from '../middleware/auth.js';
import { Env } from '../types.js';

const customers = new Hono<Env>();

customers.get('/', authMiddleware, async (c) => {
  const user = c.get('user');
  const token = c.req.header('Authorization')?.replace('Bearer ', '');
  const supabase = getSupabase(token);

  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) return c.json({ error: error.message }, 400);

  // Aggregate orders into customers
  const customerMap = new Map();

  orders.forEach((order: any) => {
    // Use email as primary key, fallback to phone or name
    const key = order.customer_email || order.customer_phone || order.customer_name || `Unknown-${order.id}`;
    
    if (!customerMap.has(key)) {
      customerMap.set(key, {
        id: `CUST-${btoa(key).substring(0, 8)}`, // Simple pseudo-hash ID
        name: order.customer_name || 'Unknown Customer',
        email: order.customer_email || '',
        phone: order.customer_phone || '',
        totalOrders: 0,
        totalSpent: 0,
        platforms: new Set(),
        lastOrderDate: order.created_at,
      });
    }

    const cData = customerMap.get(key);
    cData.totalOrders += 1;
    cData.totalSpent += Number(order.total || 0);
    if (order.platform) {
        cData.platforms.add(order.platform);
    }
  });

  const customersList = Array.from(customerMap.values()).map(cData => ({
    ...cData,
    avgOrderValue: cData.totalOrders > 0 ? Math.round(cData.totalSpent / cData.totalOrders) : 0,
    platforms: Array.from(cData.platforms),
    // Define segment logic based on total spent and order count
    segment: cData.totalSpent > 1000 ? 'vip' : cData.totalOrders > 2 ? 'loyal' : cData.totalOrders > 1 ? 'repeat' : 'new_buyer',
    avatar: cData.name ? cData.name.charAt(0).toUpperCase() : 'U'
  }));

  return c.json({ customers: customersList });
});

export default customers;
