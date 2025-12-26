import Season from "../models/season.js";

export async function getSeasons(filters = {}) {
    const result = await Season.find(filters);
    return result;
}

export async function createSeason(seasonProps) {
    const season = new Season(seasonProps);
    const result = await season.save();
    return result;
}