-- Supabase Setup Script for Esports Hub
-- Run this in your Supabase SQL Editor

-- ===========================================
-- AUTHENTICATION SETUP
-- ===========================================

-- Enable Row Level Security on auth.users (already enabled by default)
-- Create profiles table that extends auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  country TEXT,
  favorite_game TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, username)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    COALESCE(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture'),
    COALESCE(new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'preferred_username')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ===========================================
-- ESPORTS DATA TABLES
-- ===========================================

-- Teams table
CREATE TABLE IF NOT EXISTS public.teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo VARCHAR(500),
  region VARCHAR(100),
  country VARCHAR(100),
  rank INTEGER,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  win_rate DECIMAL(5, 2),
  achievements TEXT[],
  total_earnings VARCHAR(100),
  game VARCHAR(100),
  jersey_available BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Players table
CREATE TABLE IF NOT EXISTS public.players (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  team VARCHAR(255),
  role VARCHAR(100),
  avatar VARCHAR(500),
  stats JSONB,
  earnings VARCHAR(100),
  rank INTEGER,
  game VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tournaments table
CREATE TABLE IF NOT EXISTS public.tournaments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  game VARCHAR(100),
  type VARCHAR(100),
  country VARCHAR(100),
  prize_pool VARCHAR(100),
  start_date DATE,
  end_date DATE,
  teams_count INTEGER,
  status VARCHAR(50),
  location VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  team VARCHAR(255),
  base_price DECIMAL(10, 2),
  original_base_price DECIMAL(10, 2),
  image VARCHAR(500),
  rating DECIMAL(3, 1),
  reviews INTEGER DEFAULT 0,
  category VARCHAR(100),
  is_new BOOLEAN DEFAULT FALSE,
  is_bestseller BOOLEAN DEFAULT FALSE,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Carts table (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.carts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  total DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id) -- One cart per user
);

-- Cart items table
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cart_id UUID REFERENCES public.carts(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER DEFAULT 1,
  price DECIMAL(10, 2), -- Price at time of adding to cart
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ===========================================
-- INDEXES FOR PERFORMANCE
-- ===========================================

CREATE INDEX IF NOT EXISTS idx_teams_game ON public.teams(game);
CREATE INDEX IF NOT EXISTS idx_teams_rank ON public.teams(rank);
CREATE INDEX IF NOT EXISTS idx_players_game ON public.players(game);
CREATE INDEX IF NOT EXISTS idx_players_team_id ON public.players(team_id);
CREATE INDEX IF NOT EXISTS idx_tournaments_game ON public.tournaments(game);
CREATE INDEX IF NOT EXISTS idx_tournaments_type ON public.tournaments(type);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_team_id ON public.products(team_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON public.cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);

-- ===========================================
-- ROW LEVEL SECURITY POLICIES
-- ===========================================

-- Enable RLS on all tables
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Public read access for esports data
CREATE POLICY "Allow public read on teams" ON public.teams FOR SELECT USING (true);
CREATE POLICY "Allow public read on players" ON public.players FOR SELECT USING (true);
CREATE POLICY "Allow public read on tournaments" ON public.tournaments FOR SELECT USING (true);
CREATE POLICY "Allow public read on products" ON public.products FOR SELECT USING (true);

-- Cart policies (authenticated users only)
CREATE POLICY "Users can view their own cart" ON public.carts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own cart" ON public.carts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart" ON public.carts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own cart items" ON public.cart_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.carts
      WHERE carts.id = cart_items.cart_id
      AND carts.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage their own cart items" ON public.cart_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.carts
      WHERE carts.id = cart_items.cart_id
      AND carts.user_id = auth.uid()
    )
  );

-- ===========================================
-- SAMPLE DATA (Optional)
-- ===========================================

-- Insert sample teams
INSERT INTO public.teams (name, logo, region, country, rank, wins, losses, win_rate, total_earnings, game, jersey_available) VALUES
('Team Liquid', '/assets/teams/liquid.png', 'North America', 'USA', 1, 45, 12, 78.9, '$12,500,000', 'dota2', true),
('FaZe Clan', '/assets/teams/faze.png', 'North America', 'USA', 2, 38, 15, 71.7, '$8,200,000', 'cs2', true),
('T1', '/assets/teams/t1.png', 'Asia', 'South Korea', 1, 52, 8, 86.7, '$15,300,000', 'lol', true)
ON CONFLICT (name) DO NOTHING;

-- Insert sample players
INSERT INTO public.players (name, team, role, avatar, earnings, rank, game) VALUES
('Miracle-', 'Team Liquid', 'Carry', '/assets/players/miracle.png', '$3,200,000', 1, 'dota2'),
('karrigan', 'FaZe Clan', 'Rifler', '/assets/players/karrigan.png', '$2,100,000', 2, 'cs2'),
('Faker', 'T1', 'Mid', '/assets/players/faker.png', '$4,500,000', 1, 'lol')
ON CONFLICT (name) DO NOTHING;

-- Insert sample products
INSERT INTO public.products (name, team, base_price, original_base_price, image, rating, reviews, category, is_new, stock) VALUES
('Team Liquid Jersey 2024', 'Team Liquid', 89.99, 99.99, '/assets/jersey/liquid24.jpg', 4.8, 156, 'jersey', true, 50),
('FaZe Hoodie', 'FaZe Clan', 59.99, 69.99, '/assets/jersey/faze24.jpg', 4.6, 89, 'accessory', false, 75),
('T1 Cap', 'T1', 24.99, 29.99, '/assets/jersey/t1cap.jpg', 4.4, 234, 'accessory', false, 100)
ON CONFLICT (name) DO NOTHING;
