import { Hono } from 'hono';
import { getSupabase } from '../lib/supabase.js';
import { authMiddleware } from '../middleware/auth.js';
import { Env } from '../types.js';

const analytics = new Hono<Env>();

// Get dashboard KPIs and revenue data
analytics.get('/dashboard', authMiddleware, async (c) => {
  const user = c.get('user');
  const token = c.req.header('Authorization')?.replace('Bearer ', '');
  const supabase = getSupabase(token);

  // Fetch all orders to calculate KPIs
  const { data: orders, error } = await supabase
    .from('orders')
    .select('total, created_at, status')
    .eq('user_id', user.id);

  if (error) return c.json({ error: error.message }, 400);

  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total), 0);
  const totalOrders = orders.length;
  const activeProductsCount = 0; // Simplified for now

  // Group revenue by day for the chart (last 7 days)
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const revenueData = days.map(day => ({ name: day, total: 0, orders: 0 }));
  
  orders.forEach(order => {
    const dayName = days[new Date(order.created_at).getDay()];
    const dayObj = revenueData.find(d => d.name === dayName);
    if (dayObj) {
      dayObj.total += Number(order.total);
      dayObj.orders += 1;
    }
  });

  return c.json({
    kpis: {
      totalRevenue,
      revenueGrowth: 0, // Mock for now
      totalOrders,
      orderGrowth: 0, // Mock for now
      activeProducts: activeProductsCount,
      returnRate: 0 // Mock for now
    },
    revenueData
  });
});

export default analytics;
