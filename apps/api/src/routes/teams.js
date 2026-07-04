import express from 'express'
import Team from '../models/Team.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const filter = {}
    if (req.query.category) filter.category = req.query.category
    const teams = await Team.find(filter).populate('captain', 'name').populate('players', 'name shirtNumber')
    res.json(teams)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('captain').populate('players')
    if (!team) return res.status(404).json({ error: 'Team not found' })
    res.json(team)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const team = await Team.create(req.body)
    res.status(201).json(team)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!team) return res.status(404).json({ error: 'Team not found' })
    res.json(team)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id)
    if (!team) return res.status(404).json({ error: 'Team not found' })
    res.json({ message: 'Team deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
