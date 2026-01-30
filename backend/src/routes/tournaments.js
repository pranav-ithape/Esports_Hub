import express from 'express'
import { tournamentsModel } from '../models/tournaments.js'

const router = express.Router()

// GET all tournaments
router.get('/', async (req, res) => {
  try {
    const tournaments = await tournamentsModel.getAll()
    res.json(tournaments)
  } catch (error) {
    console.error('Error fetching tournaments:', error)
    res.status(500).json({ error: error.message })
  }
})

// GET tournaments by type
router.get('/type/:type', async (req, res) => {
  try {
    const tournaments = await tournamentsModel.getByType(req.params.type)
    res.json(tournaments)
  } catch (error) {
    console.error('Error fetching tournaments:', error)
    res.status(500).json({ error: error.message })
  }
})

// GET tournaments by game
router.get('/game/:game', async (req, res) => {
  try {
    const tournaments = await tournamentsModel.getByGame(req.params.game)
    res.json(tournaments)
  } catch (error) {
    console.error('Error fetching tournaments:', error)
    res.status(500).json({ error: error.message })
  }
})

// GET tournament by ID
router.get('/:id', async (req, res) => {
  try {
    const tournament = await tournamentsModel.getById(req.params.id)
    res.json(tournament)
  } catch (error) {
    console.error('Error fetching tournament:', error)
    res.status(500).json({ error: error.message })
  }
})

// POST create new tournament
router.post('/', async (req, res) => {
  try {
    const tournament = await tournamentsModel.create(req.body)
    res.status(201).json(tournament)
  } catch (error) {
    console.error('Error creating tournament:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router
