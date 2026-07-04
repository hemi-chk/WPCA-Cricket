import mongoose from 'mongoose'

const matchSchema = new mongoose.Schema(
  {
    type:        { type: String, enum: ['Practice', 'League', 'Tournament', 'Friendly'], required: true },
    date:        { type: Date, required: true },
    venue:       { type: String },
    homeTeam:    { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    awayTeam:    { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    homeScore:   { type: String },
    awayScore:   { type: String },
    result:      { type: String, enum: ['Won', 'Lost', 'Draw', 'No Result'] },
    mvp:         { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    notes:       { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('Match', matchSchema)
