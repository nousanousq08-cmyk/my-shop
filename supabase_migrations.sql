-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table for admin authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    reset_code TEXT,
    reset_code_expiry TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    price NUMERIC NOT NULL,
    discount NUMERIC,
    stock INTEGER DEFAULT 0,
    colors TEXT,
    sizes TEXT,
    description TEXT,
    media JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    items JSONB NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT,
    customer_phone TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    wilaya TEXT NOT NULL,
    payment_method TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    payment_proof TEXT,
    total NUMERIC NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Settings table
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_name TEXT,
    email TEXT,
    phone TEXT,
    ccp_number TEXT,
    ccp_key TEXT,
    rip TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Wilayas table for delivery fees
CREATE TABLE wilayas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    fee NUMERIC NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert default admin user (password will be hashed in the API)
INSERT INTO users (username, email, password_hash, role) VALUES 
('admin', 'admin@bestshop.dz', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Insert default settings
INSERT INTO settings (store_name, email, phone, ccp_number, ccp_key, rip) VALUES 
('Best Shop', 'contact@bestshop.dz', '+213 123 456 789', '0012345678', '90', '0012345678901234567890');

-- Insert default wilayas
INSERT INTO wilayas (name, fee) VALUES 
('Algiers', 400),
('Oran', 500),
('Constantine', 600);

-- Create indexes for better performance
CREATE INDEX idx_products_created_at ON products(created_at);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_users_email ON users(email);