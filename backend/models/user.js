import mongoose from 'mongoose';
import { USER_ROLES } from '../constants.js';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(USER_ROLES), default: USER_ROLES.PLAYER }
}, { timestamps: true }); 

export default mongoose.model('User', userSchema);