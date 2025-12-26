import mongoose from 'mongoose';

const matchStatusEnum = ['scheduled', 'completed', 'canceled', 'postponed'];

const matchSchema = new mongoose.Schema({
    season: { type: mongoose.Schema.Types.ObjectId, ref: 'Season', required: true },
    round: { type: Number, required: true },
    home: { 
        team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
        score: { type: Number, default: null }
    },
    away: { 
        team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
        score: { type: Number, default: null }
    },
    dateRange: {
        from: { type: Date, required: true },
        to: { type: Date, required: true }
    },
    status: { type: String, enum: matchStatusEnum, default: 'scheduled' }
    }, { timestamps: true });

export default mongoose.model('Match', matchSchema);
