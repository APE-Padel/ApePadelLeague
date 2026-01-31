import * as seasonsClient from "../data/seasonsClient.js";
import * as matchesClient from "../data/matchesClient.js";

export async function getActiveSeasonMatches() {
    const activeSeasons = await seasonsClient.getSeasons({ isActive: true });
    if (activeSeasons.length === 0) {
        throw new Error("No active season found");
    }

    const activeSeason = activeSeasons[0];
    const matches = await matchesClient.getMatches({ season: activeSeason._id });
    return matches;
}