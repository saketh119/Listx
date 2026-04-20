import { Hono } from 'hono';
import { supabase } from '../lib/supabase.js';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { authMiddleware } from '../middleware/auth.js';
import { Env } from '../types.js';

const auth = new Hono<Env>();

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  metadata: z.record(z.string(), z.any()).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Signup
auth.post('/signup', zValidator('json', signupSchema, (result, c) => {
  if (!result.success) {
    console.error("Signup validation failed:", result.error);
    return c.json({ error: result.error.issues[0]?.message || 'Validation failed' }, 400);
  }
}), async (c) => {
  const { email, password, metadata } = c.req.valid('json');

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    ...(metadata ? { options: { data: metadata } } : {}),
  });

  if (error) {
    console.error("Supabase signup error:", error);
    return c.json({ error: error.message }, (error.status as any) || 400);
  }

  // Create initial profile record if user was created
  if (data?.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({ 
        id: data.user.id,
        full_name: metadata?.full_name || null,
        business_name: metadata?.business_name || null 
      });
    
    if (profileError) console.error("Profile creation error:", profileError);
  }

  return c.json({ user: data.user, session: data.session });
});

// Update Profile (Onboarding Step 2)
const profileSchema = z.object({
  full_name: z.string().optional(),
  business_name: z.string().optional(),
  business_type: z.string().optional(),
  phone_number: z.string().optional(),
  gst_number: z.string().optional(),
  order_volume: z.string().optional(),
  platforms: z.array(z.string()).optional(),
  website: z.string().url().optional().or(z.literal('')),
});

auth.patch('/profile', authMiddleware, zValidator('json', profileSchema), async (c) => {
  const user = c.get('user');
  const body = c.req.valid('json');

  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      ...body,
      updated_at: new Date().toISOString()
    })
    .select();

  if (error) {
    console.error("Profile update error:", error);
    return c.json({ error: error.message }, 400);
  }

  return c.json({ profile: data[0] });
});

// Login
auth.post('/login', zValidator('json', loginSchema), async (c) => {
  const { email, password } = c.req.valid('json');

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return c.json({ error: error.message }, (error.status as any) || 400);
  }

  return c.json({ user: data.user, session: data.session });
});

// Get Current User (Session Check)
auth.get('/me', authMiddleware, async (c) => {
  const user = c.get('user');
  return c.json({ user });
});

// Logout
auth.post('/logout', authMiddleware, async (c) => {
  // Use admin signOut to ensure session is invalidated
  const authHeader = c.req.header('Authorization');
  const token = authHeader!.replace('Bearer ', '');
  await supabase.auth.admin.signOut(token);
  return c.json({ message: 'Logged out successfully' });
});

// Google OAuth Redirect URL generator
auth.get('/google', async (c) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: process.env.FRONTEND_URL || 'http://localhost:3000',
    },
  });

  if (error) {
    return c.json({ error: error.message }, 400);
  }

  return c.json({ url: data.url });
});

// Forgot Password
auth.post('/forgot-password', zValidator('json', z.object({ email: z.string().email() })), async (c) => {
  const { email } = c.req.valid('json');
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password`,
  });

  if (error) {
    return c.json({ error: error.message }, 400);
  }

  return c.json({ message: 'Password reset link sent' });
});

// Reset Password
auth.post('/reset-password', zValidator('json', z.object({ password: z.string().min(8) })), async (c) => {
  const { password } = c.req.valid('json');
  
  // Note: Reset password usually happens when the user is logged in with the token from the email
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return c.json({ error: error.message }, 400);
  }

  return c.json({ message: 'Password updated' });
});

export default auth;
