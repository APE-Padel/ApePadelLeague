import mongoose from "mongoose";
import * as seasonsClient from "../data/seasonsClient.js";
import * as matchesClient from "../data/matchesClient.js";
import * as standingsService from "./standingsService.js";
import { MATCH_STATUS } from "../constants.js";

export async function getActiveSeasonMatches() {
    const activeSeasons = await seasonsClient.getSeasons({ isActive: true });
    if (activeSeasons.length === 0) {
        throw new Error("No active season found");
    }

    const activeSeason = activeSeasons[0];
    const matches = await matchesClient.getMatches({ season: activeSeason._id });
    return matches;
}

export async function updateMatchResult(matchId, homeScore, awayScore) {
    const match = await matchesClient.getMatchById(matchId);
    const seasonId = match.season;

    const matchStatus = homeScore == 0 && awayScore == 0 ? MATCH_STATUS.SCHEDULED : MATCH_STATUS.COMPLETED;
    const updateProps = {
        "home.score": homeScore,
        "away.score": awayScore,
        status: matchStatus
    };
    
    const session = await mongoose.startSession();

    try{
        session.startTransaction();
        await matchesClient.updateMatchById(matchId, updateProps);
        await standingsService.recalculateStandings(seasonId);

        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}