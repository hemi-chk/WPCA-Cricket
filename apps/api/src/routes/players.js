import express from 'express'
import Player from '../models/Player.js'

const router = express.Router()

// GET all players (optional ?category=Under+19&team=<id>)
router.get('/', async (req, res) => {
  try {
    const filter = {}
    if (req.query.category) filter.ageCategory = req.query.category
    if (req.query.team)     filter.team        = req.query.team

    const players = await Player.find(filter).populate('team', 'name shortName').sort({ 'stats.runs': -1 })
    res.json(players)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET single player
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate('team')
    if (!player) return res.status(404).json({ error: 'Player not found' })
    res.json(player)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST create player
router.post('/', async (req, res) => {
  try {
    const player = await Player.create(req.body)
    res.status(201).json(player)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PATCH update player
router.patch('/:id', async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!player) return res.status(404).json({ error: 'Player not found' })
    res.json(player)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE player
router.delete('/:id', async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id)
    if (!player) return res.status(404).json({ error: 'Player not found' })
    res.json({ message: 'Player deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
