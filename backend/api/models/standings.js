import mongoose from "mongoose";

const standingsSchema = new mongoose.Schema({
  season: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Season',
    required: true,
    unique: true
  },

  table: [
    {
      team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
      },
      position: Number,
      gamesWon: Number,
      gamesLost: Number,
      gamesDraw: Number,
      pointsFor: Number,
      pointsAgainst: Number
    }
  ]
}, { timestamps: true });

export default mongoose.model("Standings", standingsSchema);