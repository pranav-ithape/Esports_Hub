import express from 'express'
import { teamsModel } from '../models/teams.js'

const router = express.Router()

// GET all teams
router.get('/', async (req, res) => {
  try {
    const teams = await teamsModel.getAll()
    res.json(teams)
  } catch (error) {
    console.error('Error fetching teams:', error)
    res.status(500).json({ error: error.message })
  }
})

// GET teams by game
router.get('/game/:game', async (req, res) => {
  try {
    const teams = await teamsModel.getByGame(req.params.game)
    res.json(teams)
  } catch (error) {
    console.error('Error fetching teams:', error)
    res.status(500).json({ error: error.message })
  }
})

// GET team by ID
router.get('/:id', async (req, res) => {
  try {
    const team = await teamsModel.getById(req.params.id)
    res.json(team)
  } catch (error) {
    console.error('Error fetching team:', error)
    res.status(500).json({ error: error.message })
  }
})

// POST create new team
router.post('/', async (req, res) => {
  try {
    const team = await teamsModel.create(req.body)
    res.status(201).json(team)
  } catch (error) {
    console.error('Error creating team:', error)
    res.status(500).json({ error: error.message })
  }
})

// PUT update team
router.put('/:id', async (req, res) => {
  try {
    const team = await teamsModel.update(req.params.id, req.body)
    res.json(team)
  } catch (error) {
    console.error('Error updating team:', error)
    res.status(500).json({ error: error.message })
  }
})

// DELETE team
router.delete('/:id', async (req, res) => {
  try {
    await teamsModel.delete(req.params.id)
    res.json({ success: true })
  } catch (error) {
    console.error('Error deleting team:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router
