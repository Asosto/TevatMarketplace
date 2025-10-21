-- Tevat Marketplace Database Schema
-- Run this in your Supabase SQL editor

-- Enable Row Level Security
ALTER TABLE IF EXISTS products ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS orders ENABLE ROW LEVEL SECURITY;

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  colors JSONB DEFAULT '[]'::jsonb,
  compatibility JSONB DEFAULT '[]'::jsonb,
  eta TEXT,
  description TEXT,
  specs JSONB DEFAULT '[]'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  stock INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  items JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample products
INSERT INTO products (name, price, image, category, colors, compatibility, eta, description, specs, images, stock) VALUES
('MacBook Pro 16" M3 Max', 3499, '/macbook-pro-16-inch-space-black.jpg', 'Laptops', 
 '["#1a1a1a", "#e8e8e8"]'::jsonb, 
 '["macOS Sonoma", "Thunderbolt 4", "MagSafe 3"]'::jsonb, 
 '2-5 days', 
 'The most powerful MacBook Pro ever. With the M3 Max chip, you get unprecedented performance for professional workflows.',
 '["Apple M3 Max chip with 16-core CPU", "40-core GPU", "48GB unified memory", "1TB SSD storage", "16.2-inch Liquid Retina XDR display", "Up to 22 hours battery life"]'::jsonb,
 '["/macbook-pro-16-inch-space-black.jpg", "/macbook-pro-side-view.jpg", "/macbook-pro-keyboard.png", "/macbook-pro-ports.jpg"]'::jsonb,
 10),

('Dell XPS 15 OLED', 2299, '/dell-xps-15-platinum-silver.jpg', 'Laptops',
 '["#c0c0c0", "#1a1a1a"]'::jsonb,
 '["Windows 11", "USB-C", "Thunderbolt 4"]'::jsonb,
 '3-7 days',
 'Stunning OLED display meets powerful performance. The XPS 15 delivers professional-grade power in a sleek design.',
 '["Intel Core i9-13900H processor", "NVIDIA GeForce RTX 4070", "32GB DDR5 RAM", "1TB PCIe SSD", "15.6-inch 3.5K OLED touchscreen", "Up to 13 hours battery life"]'::jsonb,
 '["/dell-xps-15-platinum-silver.jpg", "/dell-xps-15-side-view.jpg", "/dell-xps-15-display.jpg", "/dell-xps-15-keyboard.jpg"]'::jsonb,
 8),

('AirPods Max', 549, '/airpods-max-silver-premium-headphones.jpg', 'Audio',
 '["#e8e8e8", "#1a1a1a", "#5e5e5e", "#b8a89a", "#a3c9d3"]'::jsonb,
 '["iPhone", "iPad", "Mac"]'::jsonb,
 '1-3 days',
 'Immersive spatial audio experience with active noise cancellation.',
 '["40mm dynamic drivers", "Active Noise Cancellation", "Spatial Audio", "Up to 20 hours battery life", "Digital Crown for control", "MagSafe case"]'::jsonb,
 '["/airpods-max-silver-premium-headphones.jpg", "/airpods-max-case.jpg", "/airpods-max-ear-cups.jpg", "/airpods-max-side-view.jpg"]'::jsonb,
 15),

('Magic Keyboard with Touch ID', 199, '/apple-magic-keyboard-with-touch-id-white.jpg', 'Accessories',
 '["#ffffff", "#1a1a1a"]'::jsonb,
 '["Mac with Apple Silicon"]'::jsonb,
 '1-2 days',
 'Seamless typing with security. Touch ID for secure authentication.',
 '["Scissor mechanism", "Touch ID sensor", "Rechargeable battery", "USB-C to Lightning cable", "Multi-touch surface", "Backlit keys"]'::jsonb,
 '["/apple-magic-keyboard-with-touch-id-white.jpg"]'::jsonb,
 25);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
