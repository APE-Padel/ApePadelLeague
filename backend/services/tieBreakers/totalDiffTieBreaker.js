export default class TotalDiffTieBreaker {
    compare(team1, team2) {
        const team1Diff = team1.pointsFor - team1.pointsAgainst;
        const team2Diff = team2.pointsFor - team2.pointsAgainst;
        return team2Diff - team1Diff;
    }
}