export default class PointsScoredTieBreaker {
    compare(team1, team2) {
        return team2.pointsFor - team1.pointsFor;
    }
}