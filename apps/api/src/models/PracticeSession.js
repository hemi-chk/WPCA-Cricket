import mongoose from 'mongoose'

const practiceSessionSchema = new mongoose.Schema(
  {
    date:        { type: Date, required: true },
    team:        { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    venue:       { type: String },
    durationMins:{ type: Number },
    focus:       { type: String, enum: ['Batting', 'Bowling', 'Fielding', 'Fitness', 'Full Team'], required: true },
    attendees:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    notes:       { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('PracticeSession', practiceSessionSchema)
