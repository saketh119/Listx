import { supabase } from '../lib/supabase.js';
export const authMiddleware = async (c, next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ error: 'Missing or invalid authorization header' }, 401);
    }
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
        return c.json({ error: 'Unauthorized: Invalid or expired token' }, 401);
    }
    // Set user in context for downstream handlers
    c.set('user', user);
    await next();
};
//# sourceMappingURL=auth.js.map