import * as seasonsClient from "../data/seasonsClient.js";
import * as teamsClient from "../data/teamsClient.js";

export async function getActiveSeasonTeams() {
    const activeSeasons = await seasonsClient.getSeasons({ isActive: true });
    if (activeSeasons.length === 0) {
        throw new Error("No active season found");
    }

    const activeSeason = activeSeasons[0];
    const teamsIds = activeSeason.teams || [];
    
    const teams = await teamsClient.getTeams({ _id: { $in: teamsIds } });
    return teams;    
}