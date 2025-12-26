import { getSeasons } from "../data/seasonsClient.js";
import { getMatches } from "../data/matchesClient.js";

export async function getActiveSeasonMatches() {
    const activeSeasons = await getSeasons({ isActive: true });

    if (activeSeasons.length === 0) {
        throw new Error("No active season found");
    }

    const activeSeason = activeSeasons[0];
    const matches = await getMatches({ season: activeSeason._id });
    return matches;
}