import * as seasonsClient from "../data/seasonsClient.js";
import * as standingsClient from "../data/standingsClient.js";
import * as matchesClient from "../data/matchesClient.js";

export async function getActiveSeasonStandings() {
    const activeSeasons = await seasonsClient.getSeasons({ isActive: true });
    if (activeSeasons.length === 0) {
        throw new Error("No active season found");
    }

    const activeSeason = activeSeasons[0];
    const standings = await standingsClient.getStandings({ season: activeSeason._id });
    return standings;
}
