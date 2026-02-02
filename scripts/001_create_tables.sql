-- Create profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  username text unique,
  avatar_url text,
  phone text,
  bio text,
  favorite_game text,
  country text default 'India',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create products table for shop
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  team text,
  category text not null default 'jersey',
  base_price decimal(10,2) not null,
  original_price decimal(10,2),
  image_url text,
  rating decimal(3,2) default 0,
  reviews_count integer default 0,
  is_new boolean default false,
  is_bestseller boolean default false,
  in_stock boolean default true,
  sizes text[] default array['S', 'M', 'L', 'XL'],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create orders table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  status text default 'pending',
  total decimal(10,2) not null,
  shipping_address jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create order items table
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete set null,
  quantity integer not null default 1,
  size text,
  price decimal(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Profiles policies
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_delete_own" on public.profiles for delete using (auth.uid() = id);

-- Products policies (public read, admin write)
create policy "products_select_all" on public.products for select using (true);

-- Orders policies
create policy "orders_select_own" on public.orders for select using (auth.uid() = user_id);
create policy "orders_insert_own" on public.orders for insert with check (auth.uid() = user_id);

-- Order items policies
create policy "order_items_select_own" on public.order_items for select 
  using (exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid()));

-- Auto-create profile trigger
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', null),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', null)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Insert sample products
insert into public.products (name, description, team, category, base_price, original_price, image_url, is_new, is_bestseller) values
('Godlike Esports 2025 Jersey', 'Official Godlike Esports team jersey', 'Godlike Esports', 'jersey', 9.63, 13.99, '/assets/jersey/godlike25.jpg', true, false),
('S8ul 2025 Jersey', 'Official S8ul team jersey', 'S8ul', 'jersey', 9.14, 12.99, '/assets/jersey/soul25.jpg', false, true),
('Orangutan 2025 Jersey', 'Official Orangutan team jersey', 'Orangutan', 'jersey', 9.02, 11.99, '/assets/jersey/orangutan25.jpg', true, false),
('Vero Forza Glide V2', 'Gaming mouse pad 6 pieces', 'Vero Forza', 'accessory', 5.72, 7.99, '/assets/accessory/veroglidev2.jpg', false, true),
('Hyper X Cloud II', 'Professional gaming headset', 'Hyper X', 'accessory', 90.35, 109.99, '/assets/accessory/hyperxcloud2.jpg', false, false),
('Logitech G PRO Wireless', 'Professional wireless gaming mouse', 'Logitech', 'accessory', 126.51, 199.99, '/assets/accessory/logitechgpro.jpg', true, true)
on conflict do nothing;
