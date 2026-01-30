import express from 'express'
import { playersModel } from '../models/players.js'

const router = express.Router()

// GET all players
router.get('/', async (req, res) => {
  try {
    const players = await playersModel.getAll()
    res.json(players)
  } catch (error) {
    console.error('Error fetching players:', error)
    res.status(500).json({ error: error.message })
  }
})

// GET players by game
router.get('/game/:game', async (req, res) => {
  try {
    const players = await playersModel.getByGame(req.params.game)
    res.json(players)
  } catch (error) {
    console.error('Error fetching players:', error)
    res.status(500).json({ error: error.message })
  }
})

// GET players by team
router.get('/team/:teamId', async (req, res) => {
  try {
    const players = await playersModel.getByTeam(req.params.teamId)
    res.json(players)
  } catch (error) {
    console.error('Error fetching players:', error)
    res.status(500).json({ error: error.message })
  }
})

// GET player by ID
router.get('/:id', async (req, res) => {
  try {
    const player = await playersModel.getById(req.params.id)
    res.json(player)
  } catch (error) {
    console.error('Error fetching player:', error)
    res.status(500).json({ error: error.message })
  }
})

// POST create new player
router.post('/', async (req, res) => {
  try {
    const player = await playersModel.create(req.body)
    res.status(201).json(player)
  } catch (error) {
    console.error('Error creating player:', error)
    res.status(500).json({ error: error.message })
  }
})

// PUT update player
router.put('/:id', async (req, res) => {
  try {
    const player = await playersModel.update(req.params.id, req.body)
    res.json(player)
  } catch (error) {
    console.error('Error updating player:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router
