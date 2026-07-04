import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import playerRoutes          from './routes/players.js'
import teamRoutes            from './routes/teams.js'
import matchRoutes           from './routes/matches.js'
import practiceSessionRoutes from './routes/practiceSessions.js'

const app  = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/players',          playerRoutes)
app.use('/api/teams',            teamRoutes)
app.use('/api/matches',          matchRoutes)
app.use('/api/practice-sessions',practiceSessionRoutes)

app.get('/', (_req, res) => res.json({ message: 'WPCA Cricket API' }))

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas')
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message)
    process.exit(1)
  })
