import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    shortName:   { type: String, required: true, trim: true },
    category:    { type: String, enum: ['Under 13', 'Under 15', 'Under 17', 'Under 19', 'Under 23', 'Senior'], required: true },
    location:    { type: String },
    founded:     { type: Number },
    captain:     { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    players:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  },
  { timestamps: true }
)

export default mongoose.model('Team', teamSchema)
