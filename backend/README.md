# Esports Hub - Node.js Backend

This is a Node.js/Express backend for the Esports Hub project, with direct Supabase database integration.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file** (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

3. **Update `.env` with your Supabase credentials:**
   ```
   SUPABASE_URL=your-url
   SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-key
   PORT=5000
   ```

4. **Initialize the database:**
   - Go to Supabase Dashboard
   - Go to **SQL Editor**
   - Copy contents of `sql/schema.sql`
   - Run the SQL to create all tables

5. **Start the server:**
   ```bash
   npm run dev
   ```

## API Endpoints

### Teams
- `GET /api/teams` - Get all teams
- `GET /api/teams/game/:game` - Get teams by game
- `GET /api/teams/:id` - Get team by ID
- `POST /api/teams` - Create team
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team

### Players
- `GET /api/players` - Get all players
- `GET /api/players/game/:game` - Get players by game
- `GET /api/players/team/:teamId` - Get players by team
- `GET /api/players/:id` - Get player by ID
- `POST /api/players` - Create player
- `PUT /api/players/:id` - Update player

### Tournaments
- `GET /api/tournaments` - Get all tournaments
- `GET /api/tournaments/type/:type` - Get tournaments by type
- `GET /api/tournaments/game/:game` - Get tournaments by game
- `GET /api/tournaments/:id` - Get tournament by ID
- `POST /api/tournaments` - Create tournament

### Products
- `GET /api/products` - Get all products
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/team/:teamId` - Get products by team
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product

### Cart
- `GET /api/cart/user/:userId` - Get user's cart
- `POST /api/cart/:cartId/items` - Add item to cart
- `PUT /api/cart/items/:itemId` - Update item quantity
- `DELETE /api/cart/items/:itemId` - Remove item from cart
- `DELETE /api/cart/:cartId` - Clear cart

## Environment Variables

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
NODE_ENV=development
PORT=5000
```
