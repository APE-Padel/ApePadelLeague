import Match from "../models/match.js";

export async function getMatches(filters = {}) {
    const result = await Match.find(filters)
        .populate('home.team', 'name players')
        .populate('away.team', 'name players')
        .populate('season', 'name');
        
    return result;
}

export async function createMatch(matchProps) {
    const match = new Match(matchProps);
    const result = await match.save();
    return result;
}
