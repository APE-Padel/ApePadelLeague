import mongoose from "mongoose";

const sasonSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    isActive: { type: Boolean, required: true },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }]
},{ timestamps: true });

export default mongoose.model("Season", sasonSchema);