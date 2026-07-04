import express from 'express'
import PracticeSession from '../models/PracticeSession.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const filter = {}
    if (req.query.team)  filter.team  = req.query.team
    if (req.query.focus) filter.focus = req.query.focus
    const sessions = await PracticeSession
      .find(filter)
      .populate('team', 'name shortName')
      .populate('attendees', 'name shirtNumber')
      .sort({ date: -1 })
    res.json(sessions)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const session = await PracticeSession.findById(req.params.id)
      .populate('team').populate('attendees')
    if (!session) return res.status(404).json({ error: 'Session not found' })
    res.json(session)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const session = await PracticeSession.create(req.body)
    res.status(201).json(session)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const session = await PracticeSession.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!session) return res.status(404).json({ error: 'Session not found' })
    res.json(session)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const session = await PracticeSession.findByIdAndDelete(req.params.id)
    if (!session) return res.status(404).json({ error: 'Session not found' })
    res.json({ message: 'Session deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
