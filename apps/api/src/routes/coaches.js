import express from 'express'
import Coach from '../models/Coach.js'

const router = express.Router()

// GET all coaches (optional ?specialization=Batting+Coach&team=<id>)
router.get('/', async (req, res) => {
  try {
    const filter = {}
    if (req.query.specialization) filter.specialization = req.query.specialization
    if (req.query.team)           filter.team           = req.query.team

    const coaches = await Coach.find(filter).populate('team', 'name shortName').sort({ name: 1 })
    res.json(coaches)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET single coach
router.get('/:id', async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id).populate('team')
    if (!coach) return res.status(404).json({ error: 'Coach not found' })
    res.json(coach)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST create coach
router.post('/', async (req, res) => {
  try {
    const coach = await Coach.create(req.body)
    res.status(201).json(coach)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PATCH update coach
router.patch('/:id', async (req, res) => {
  try {
    const coach = await Coach.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!coach) return res.status(404).json({ error: 'Coach not found' })
    res.json(coach)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE coach
router.delete('/:id', async (req, res) => {
  try {
    const coach = await Coach.findByIdAndDelete(req.params.id)
    if (!coach) return res.status(404).json({ error: 'Coach not found' })
    res.json({ message: 'Coach deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
