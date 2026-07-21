import express from 'express'
import jwt     from 'jsonwebtoken'
import User    from '../models/User.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'

const router = express.Router()

function signToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

// POST /api/auth/register  (admin only — admins create accounts for players/coaches)
router.post('/register', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { name, email, password, role, player, coach } = req.body
    if (!name || !email || !password)
      return res.status(400).json({ error: 'name, email and password are required' })

    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ error: 'Email already registered' })

    const user  = await User.create({ name, email, password, role: role || 'player', player, coach })
    const token = signToken(user)
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// POST /api/auth/login  (public)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ error: 'email and password are required' })

    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ error: 'Invalid email or password' })

    const token = signToken(user)
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/auth/create-admin  (only works when NO admin exists — first-run bootstrap)
router.post('/create-admin', async (req, res) => {
  try {
    const adminExists = await User.findOne({ role: 'admin' })
    if (adminExists) return res.status(403).json({ error: 'Admin already exists' })

    const { name, email, password } = req.body
    const user  = await User.create({ name, email, password, role: 'admin' })
    const token = signToken(user)
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// GET /api/auth/me  (protected)
router.get('/me', requireAuth, async (req, res) => {
  const user = await User.findById(req.user.id).populate('player').populate('coach')
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json({ id: user._id, name: user.name, email: user.email, role: user.role, player: user.player, coach: user.coach })
})

export default router
