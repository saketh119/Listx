import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth.js';
import { seedDatabase } from '../lib/seed.js';
import { getSupabase } from '../lib/supabase.js';
const system = new Hono();
// Seed database with mock data for the current user
system.post('/seed', authMiddleware, async (c) => {
    const user = c.get('user');
    const authHeader = c.req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    const supabase = getSupabase(token);
    try {
        const data = await seedDatabase(user.id, supabase);
        return c.json({ message: 'Database seeded successfully', data });
    }
    catch (error) {
        return c.json({ error: error.message }, 500);
    }
});
export default system;
//# sourceMappingURL=system.js.map