import { Context, Next } from 'hono';
import { supabase } from '../lib/supabase.js';
import { Env } from '../types.js';

export const authMiddleware = async (c: Context<Env>, next: Next) => {
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
