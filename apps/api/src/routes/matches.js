import express from 'express'
import Match from '../models/Match.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const filter = {}
    if (req.query.type)   filter.type   = req.query.type
    if (req.query.result) filter.result = req.query.result
    const matches = await Match
      .find(filter)
      .populate('homeTeam', 'name shortName')
      .populate('awayTeam', 'name shortName')
      .populate('mvp', 'name')
      .sort({ date: -1 })
    res.json(matches)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate('homeTeam').populate('awayTeam').populate('mvp')
    if (!match) return res.status(404).json({ error: 'Match not found' })
    res.json(match)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const match = await Match.create(req.body)
    res.status(201).json(match)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!match) return res.status(404).json({ error: 'Match not found' })
    res.json(match)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id)
    if (!match) return res.status(404).json({ error: 'Match not found' })
    res.json({ message: 'Match deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
