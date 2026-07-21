import mongoose from 'mongoose'

const coachSchema = new mongoose.Schema(
  {
    name:             { type: String, required: true, trim: true },
    email:            { type: String, unique: true, sparse: true, trim: true },
    phone:            { type: String },
    dateOfBirth:      { type: Date },
    nationality:      { type: String, default: 'Sri Lankan' },
    specialization:   { type: String, enum: ['Head Coach', 'Batting Coach', 'Bowling Coach', 'Fielding Coach', 'Fitness Coach'], required: true },
    certification:    { type: String },
    yearsExperience:  { type: Number },
    team:             { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    joinedAt:         { type: Date },
    stats: {
      teamsCoached:  { type: Number, default: 0 },
      matchesCoached:{ type: Number, default: 0 },
      wins:          { type: Number, default: 0 },
      losses:        { type: Number, default: 0 },
    },
  },
  { timestamps: true }
)

export default mongoose.model('Coach', coachSchema)
