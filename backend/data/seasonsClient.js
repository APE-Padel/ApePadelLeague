import Season from "../models/season.js";

export async function getSeasons(filters = {}) {
    const result = await Season.find(filters);
    return result;
}

export async function getSeasonById(seasonId) {
    const result = await Season.findById(seasonId);
    if (!result) {
		throw new Error("Season not found");
	}    
    return result;
}

export async function createSeason(seasonProps) {
    const season = new Season(seasonProps);
    const result = await season.save();
    return result;
}