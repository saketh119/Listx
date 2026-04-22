import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import * as dotenv from 'dotenv';

dotenv.config();

import { Env } from './types.js';

const app = new Hono<Env>();

// Middleware
app.use('*', logger());
app.use('*', cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}));

// Routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import analyticsRoutes from './routes/analytics.js';
import systemRoutes from './routes/system.js';
import aiRoutes from './routes/ai.js';
import integrationsRoutes from './routes/integrations.js';
import customersRoutes from './routes/customers.js';

app.get('/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.route('/auth', authRoutes);
app.route('/products', productRoutes);
app.route('/orders', orderRoutes);
app.route('/analytics', analyticsRoutes);
app.route('/system', systemRoutes);
app.route('/ai', aiRoutes);
app.route('/integrations', integrationsRoutes);
app.route('/customers', customersRoutes);

const port = Number(process.env.PORT) || 5000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
