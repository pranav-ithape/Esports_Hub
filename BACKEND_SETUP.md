# Esports Hub - Full Setup Guide

This project is split into two parts:
1. **React Frontend** (`/src`) - Runs on port 3000
2. **Node.js Backend** (`/backend`) - Runs on port 5000
3. **Supabase Database** - Cloud database

## Prerequisites

- Node.js 16+ installed
- npm installed
- Supabase account (already set up)

## Step 1: Setup Backend

### 1.1 Install Backend Dependencies
```bash
cd backend
npm install
```

### 1.2 Create `.env` file in backend folder
```bash
cp .env.example .env
```

Update `.env` with your Supabase credentials:
```env
SUPABASE_URL=https://tnloyqxxmgooxmrwytuo.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NODE_ENV=development
PORT=5000
```

### 1.3 Create Database Tables

Go to [Supabase Dashboard](https://supabase.com/dashboard):
1. Select your project
2. Go to **SQL Editor**
3. Create a new query
4. Copy and paste contents from `backend/sql/schema.sql`
5. Click **Run** to create all tables

### 1.4 Start Backend Server
```bash
npm run dev
```

Backend will be running at: **http://localhost:5000**

---

## Step 2: Setup Frontend

### 2.1 Root Directory - Install Frontend Dependencies
```bash
npm install
```

### 2.2 Update `.env.local`
Already configured, but verify it has:
```env
VITE_SUPABASE_URL=https://tnloyqxxmgooxmrwytuo.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_API_URL=http://localhost:5000/api
```

### 2.3 Start Frontend Dev Server
```bash
npm run dev
```

Frontend will be running at: **http://localhost:3000** (or **http://localhost:5173** with Vite)

---

## Step 3: Test the Connection

### Health Check
```bash
# Test backend is running
curl http://localhost:5000/health

# Should return:
# { "status": "Backend is running", "timestamp": "2026-01-30T..." }
```

### Test API Endpoints
```bash
# Get all teams (will be empty until you add data)
curl http://localhost:5000/api/teams

# Get all products
curl http://localhost:5000/api/products
```

---

## Step 4: Initialize Sample Data (Optional)

If you want to populate the database with sample data, run the initialization script in the frontend:

In `src/utils/initializeData.ts`, the function loads sample teams, players, products, and tournaments. Update it to use the new backend:

```typescript
// Instead of direct API calls, use the new backend API
import { teamsApi, playersApi, productsApi, tournamentsApi } from './backendApi'

export async function initializeData() {
  // Create teams
  for (const team of teams) {
    await teamsApi.create(team)
  }
  // ... etc
}
```

---

## File Structure

```
Esports_Hub/
├── src/                    # React Frontend
│   ├── components/         # React components
│   ├── utils/
│   │   ├── backendApi.ts   # API client (calls Node.js backend)
│   │   └── supabase/       # Supabase config
│   └── ...
├── backend/                # Node.js Backend
│   ├── src/
│   │   ├── server.js       # Express server
│   │   ├── routes/         # API routes
│   │   ├── models/         # Database models
│   │   └── utils/          # Utilities
│   ├── sql/
│   │   └── schema.sql      # Database schema
│   ├── package.json
│   └── .env                # Backend config
├── .env.local              # Frontend config
└── package.json
```

---

## API Endpoints

### Teams
```
GET    /api/teams               - Get all teams
GET    /api/teams/game/:game    - Get teams by game
GET    /api/teams/:id           - Get team by ID
POST   /api/teams               - Create team
PUT    /api/teams/:id           - Update team
DELETE /api/teams/:id           - Delete team
```

### Players
```
GET    /api/players             - Get all players
GET    /api/players/game/:game  - Get players by game
GET    /api/players/team/:id    - Get players by team
POST   /api/players             - Create player
```

### Tournaments
```
GET    /api/tournaments         - Get all tournaments
GET    /api/tournaments/type/:type - Get by type
POST   /api/tournaments         - Create tournament
```

### Products
```
GET    /api/products            - Get all products
GET    /api/products/category/:cat - Get by category
POST   /api/products            - Create product
```

### Cart
```
GET    /api/cart/user/:userId   - Get user's cart
POST   /api/cart/:cartId/items  - Add item
DELETE /api/cart/items/:itemId  - Remove item
```

---

## Troubleshooting

### Backend won't start
- Check if port 5000 is available: `netstat -ano | findstr :5000` (Windows)
- Verify `.env` has correct Supabase URL
- Check Node.js version: `node -v`

### CORS errors
- Make sure backend is running on port 5000
- Verify `VITE_API_URL` in frontend `.env.local`

### Database connection fails
- Check `.env` Supabase credentials
- Verify tables exist in Supabase dashboard
- Run `backend/sql/schema.sql` in Supabase SQL editor

### Port already in use
```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

---

## Next Steps

1. ✅ Backend running
2. ✅ Frontend running  
3. ✅ Database connected
4. Add authentication endpoints
5. Implement file uploads
6. Add payment processing

Good luck! 🚀
