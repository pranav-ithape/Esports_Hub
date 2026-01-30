import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Import routes
import teamsRouter from './routes/teams.js'
import playersRouter from './routes/players.js'
import tournamentsRouter from './routes/tournaments.js'
import productsRouter from './routes/products.js'
import cartRouter from './routes/cart.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend is running', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/teams', teamsRouter)
app.use('/api/players', playersRouter)
app.use('/api/tournaments', tournamentsRouter)
app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({ error: err.message })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' })
})

app.listen(PORT, () => {
  console.log(`
🚀 Backend server running on http://localhost:${PORT}
📝 API Documentation:
  - Teams: GET /api/teams, POST /api/teams
  - Players: GET /api/players, POST /api/players
  - Tournaments: GET /api/tournaments, POST /api/tournaments
  - Products: GET /api/products, POST /api/products
  - Cart: GET /api/cart/user/:userId, POST /api/cart/:cartId/items

✅ Health Check: http://localhost:${PORT}/health
`)
})
