import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { getSupabase } from '../lib/supabase.js';
import { authMiddleware } from '../middleware/auth.js';
import { Env } from '../types.js';

const products = new Hono<Env>();

const productSchema = z.object({
  title: z.string().min(1),
  sku: z.string().min(1),
  category: z.string().optional(),
  price: z.number().min(0).default(0),
  compare_at_price: z.number().min(0).optional(),
  stock: z.number().int().default(0),
  description: z.string().optional(),
  weight: z.string().optional(),
  image_url: z.string().url().optional().or(z.literal('')),
  platforms: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  ai_metadata: z.record(z.string(), z.any()).optional(),
});

// Get all products for the current user
products.get('/', authMiddleware, async (c) => {
  const user = c.get('user');
  const token = c.req.header('Authorization')?.replace('Bearer ', '');
  const supabase = getSupabase(token);

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) return c.json({ error: error.message }, 400);

  return c.json({ products: data });
});

// Create a product
products.post('/', authMiddleware, zValidator('json', productSchema), async (c) => {
  const user = c.get('user');
  const body = c.req.valid('json');
  const token = c.req.header('Authorization')?.replace('Bearer ', '');
  const supabase = getSupabase(token);
  
  const { data, error } = await supabase
    .from('products')
    .insert([{ ...body, user_id: user.id }])
    .select();

  if (error) return c.json({ error: error.message }, 400);

  return c.json({ product: data[0] });
});

// Update a product
products.patch('/:id', authMiddleware, zValidator('json', productSchema.partial()), async (c) => {
  const user = c.get('user');
  const id = c.req.param('id');
  const body = c.req.valid('json');
  const token = c.req.header('Authorization')?.replace('Bearer ', '');
  const supabase = getSupabase(token);

  const { data, error } = await supabase
    .from('products')
    .update(body)
    .eq('id', id)
    .eq('user_id', user.id)
    .select();

  if (error) return c.json({ error: error.message }, 400);
  if (!data.length) return c.json({ error: 'Product not found' }, 404);

  return c.json({ product: data[0] });
});

// Delete a product
products.delete('/:id', authMiddleware, async (c) => {
  const user = c.get('user');
  const id = c.req.param('id');
  const token = c.req.header('Authorization')?.replace('Bearer ', '');
  const supabase = getSupabase(token);

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) return c.json({ error: error.message }, 400);

  return c.json({ message: 'Product deleted successfully' });
});

export default products;
