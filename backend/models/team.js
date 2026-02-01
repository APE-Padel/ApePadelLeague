import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  court: String,
  logoBase64: String,
  players: [String],
}, { timestamps: true }); 

export default mongoose.model('Team', teamSchema);