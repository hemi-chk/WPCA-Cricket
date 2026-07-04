import mongoose from 'mongoose'

const playerSchema = new mongoose.Schema(
  {
    name:           { type: String, required: true, trim: true },
    email:          { type: String, unique: true, sparse: true, trim: true },
    shirtNumber:    { type: Number },
    dateOfBirth:    { type: Date },
    nationality:    { type: String, default: 'Sri Lankan' },
    role:           { type: String, enum: ['Batter', 'Bowler', 'All-rounder', 'Wicket-keeper'], required: true },
    battingHand:    { type: String, enum: ['Right hand', 'Left hand'] },
    bowlingStyle:   { type: String },
    heightCm:       { type: Number },
    weightKg:       { type: Number },
    ageCategory:    { type: String, enum: ['Under 13', 'Under 15', 'Under 17', 'Under 19', 'Under 23', 'Senior'], required: true },
    team:           { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    registrationEnd:{ type: Date },
    joinedAt:       { type: Date },
    stats: {
      matches:    { type: Number, default: 0 },
      runs:       { type: Number, default: 0 },
      wickets:    { type: Number, default: 0 },
      battingAvg: { type: Number, default: 0 },
      strikeRate: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
)

export default mongoose.model('Player', playerSchema)
