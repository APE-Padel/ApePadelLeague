export default class HeadToHeadDiffTieBreaker {
    constructor(completedMatches) {
        this.completedMatches = completedMatches;
    }

    compare(team1, team2) {
        const team1Id = team1.teamId;
        const team2Id = team2.teamId;

        let team1Diff = 0;
        let team2Diff = 0;

        this.completedMatches.forEach(match => {
            const homeId = match.home.team._id.toString();
            const awayId = match.away.team._id.toString();

            if (homeId === team1Id && awayId === team2Id) {
                team1Diff += match.home.score - match.away.score;
                team2Diff += match.away.score - match.home.score;
            }
            else if (homeId === team2Id && awayId === team1Id) {
                team1Diff += match.away.score - match.home.score;
                team2Diff += match.home.score - match.away.score;
            }
        });

        return team2Diff - team1Diff;
    }
}
