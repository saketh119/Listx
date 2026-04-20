import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { getSupabase } from '../lib/supabase.js';
import { authMiddleware } from '../middleware/auth.js';
const orders = new Hono();
const orderStatusSchema = z.object({
    status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
});
// Get all orders for the current user
orders.get('/', authMiddleware, async (c) => {
    const user = c.get('user');
    const token = c.req.header('Authorization')?.replace('Bearer ', '');
    const supabase = getSupabase(token);
    const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
    if (error)
        return c.json({ error: error.message }, 400);
    return c.json({ orders: data });
});
// Update order status
orders.patch('/:id/status', authMiddleware, zValidator('json', orderStatusSchema), async (c) => {
    const user = c.get('user');
    const id = c.req.param('id');
    const { status } = c.req.valid('json');
    const token = c.req.header('Authorization')?.replace('Bearer ', '');
    const supabase = getSupabase(token);
    const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .eq('user_id', user.id)
        .select();
    if (error)
        return c.json({ error: error.message }, 400);
    if (!data.length)
        return c.json({ error: 'Order not found' }, 404);
    return c.json({ order: data[0] });
});
export default orders;
//# sourceMappingURL=orders.js.map