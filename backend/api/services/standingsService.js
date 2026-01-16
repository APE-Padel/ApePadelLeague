import * as seasonsClient from "../data/seasonsClient.js";
import * as standingsClient from "../data/standingsClient.js";
import * as matchesClient from "../data/matchesClient.js";
import { MATCH_STATUS } from "../constants.js";
import GamesWonTieBreaker from "./tieBreakers/gamesWonTieBreaker.js";
import TotalDiffTieBreaker from "./tieBreakers/totalDiffTieBreaker.js";
import PointsScoredTieBreaker from "./tieBreakers/pointsScoredTieBreaker.js";
import HeadToHeadDiffTieBreaker from "./tieBreakers/headToHeadDiffTieBreaker.js";

export async function getActiveSeasonStandings() {
    const activeSeasons = await seasonsClient.getSeasons({ isActive: true });
    if (activeSeasons.length === 0) {
        throw new Error("No active season found");
    }

    const activeSeason = activeSeasons[0];
    const standings = await standingsClient.getStandings({ season: activeSeason._id });
	if (standings.length === 0) {
		throw new Error("Standings not found for active season");
	}

    return standings[0];
}

export async function recalculateStandings(seasonId) {
	const season = await seasonsClient.getSeasonById(seasonId);
	if (!season) {
		throw new Error("Season not found");
	}

    const matchesFilters = { season: seasonId, status: MATCH_STATUS.COMPLETED };
    const completedMatches = await matchesClient.getMatches(matchesFilters);

    let table = computeBasicStats(season, completedMatches);
    sortStandingsTable(table, completedMatches);
    
    const standingsTable = table.map((t, idx) => ({
        ...t,
        team: t.teamId,
        position: idx + 1
    }));
    
    await upsertStandings(seasonId, standingsTable);    
}

async function upsertStandings(seasonId, standingsTable) {
    const standings = await standingsClient.getStandings({ season: seasonId });

    if (standings.length === 0) {
        const newStandings = { season: seasonId, table: standingsTable };
        await standingsClient.createStandings(newStandings);
        return;
    }

    const existingStandings = standings[0];
    await standingsClient.updateStandingsById(existingStandings._id, { table: standingsTable });
}

function computeBasicStats(season, completedMatches) {
    const stats = setDefaultStatus(season);

    completedMatches.forEach(match => {
        const homeId = match.home.team._id.toString();
        const awayId = match.away.team._id.toString();
        const homeScore = match.home.score;
        const awayScore = match.away.score;

        if (!stats.has(homeId) || !stats.has(awayId)) {
			throw new Error("Match contains team not in season");
		}

        const homeStats = stats.get(homeId);
        const awayStats = stats.get(awayId);

        homeStats.pointsFor += homeScore;
        homeStats.pointsAgainst += awayScore;
        awayStats.pointsFor += awayScore;
        awayStats.pointsAgainst += homeScore;

        if (homeScore > awayScore) {
            homeStats.gamesWon += 1;
            awayStats.gamesLost += 1;
        } 
        else if (homeScore < awayScore) {
            awayStats.gamesWon += 1;
            homeStats.gamesLost += 1;
        } 
        else {
            homeStats.gamesDraw += 1;
            awayStats.gamesDraw += 1;
        }
    });

    const result = Array
        .from(stats.entries())
        .map(([teamId, stats]) => ({
            teamId,
            ...stats
        })
    );

    return result;
}

function setDefaultStatus(season) {
  const defaultTeamStats = { gamesWon: 0, gamesLost: 0, gamesDraw: 0, pointsFor: 0, pointsAgainst: 0 };
  
  return new Map(
    season.teams.map(teamId => [teamId.toString(), { ...defaultTeamStats }])
  );
}

function sortStandingsTable(table, completedMatches) {
    const tieBreakers = [
        new GamesWonTieBreaker(),
        new HeadToHeadDiffTieBreaker(completedMatches),
        new TotalDiffTieBreaker(),
        new PointsScoredTieBreaker()
    ];

    table.sort((team1, team2) => {
        for (const strategy of tieBreakers) {
            const result = strategy.compare(team1, team2);
            if (result !== 0) {
                return result;
            }
        }
        return 0;
    });
}
