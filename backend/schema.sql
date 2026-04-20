-- ListX Final Reconciled Schema
-- Use this to recreate your database for total stack consistency

-- Enable uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles (extending auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  business_name TEXT,
  business_type TEXT, -- individual, small_business, brand, agency
  phone_number TEXT,
  gst_number TEXT,
  order_volume TEXT, -- 0-50, 51-500, etc.
  platforms TEXT[],  -- ['Amazon', 'Shopify', etc.]
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Products
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY DEFAULT 'PROD-' || upper(substring(uuid_generate_v4()::text from 1 for 8)),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  sku TEXT UNIQUE NOT NULL,
  price DECIMAL(12, 2) NOT NULL DEFAULT 0,
  compare_at_price DECIMAL(12, 2),
  stock INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft', -- active, out_of_stock, draft, archived
  category TEXT,
  image_url TEXT,
  weight TEXT,
  platforms TEXT[], -- ['amazon', 'shopify']
  tags TEXT[],
  ai_metadata JSONB DEFAULT '{}',
  ai_score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Orders
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY DEFAULT 'ORD-' || to_char(NOW(), 'YYYY') || '-' || upper(substring(uuid_generate_v4()::text from 1 for 4)),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL, -- amazon, shopify, etc.
  customer_name TEXT,
  customer_phone TEXT,
  customer_email TEXT,
  delivery_address JSONB,
  subtotal DECIMAL(12, 2) NOT NULL DEFAULT 0,
  discount DECIMAL(12, 2) NOT NULL DEFAULT 0,
  tax DECIMAL(12, 2) NOT NULL DEFAULT 0,
  total DECIMAL(12, 2) NOT NULL DEFAULT 0,
  payment_type TEXT, -- prepaid, cod, partial
  payment_status TEXT, -- paid, pending
  transaction_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, processing, shipped, delivered, cancelled
  fulfillment_type TEXT, -- platform, self_ship
  sla_deadline TIMESTAMP WITH TIME ZONE,
  courier_info JSONB,
  tags TEXT[],
  notes TEXT,
  timeline JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Order Items
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(id),
  title TEXT,
  sku TEXT,
  qty INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(12, 2) NOT NULL,
  image_url TEXT
);

-- RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can manage their own profile" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users can manage their own products" ON products FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own orders" ON orders FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own order items" ON order_items FOR ALL USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_id AND orders.user_id = auth.uid())
);
