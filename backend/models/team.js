import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  court: {
    name: { type: String, required: true },
    locationUrl: { type: String, required: true },
    indoor: { type: Boolean, required: true }
  },  
  logoBase64: String,
  players: [String],
}, { timestamps: true }); 

export default mongoose.model('Team', teamSchema);