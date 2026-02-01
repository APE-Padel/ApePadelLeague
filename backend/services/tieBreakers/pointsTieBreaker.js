export default class PointsTieBreaker {
    compare(team1, team2) {
        return team2.points - team1.points;
    }
}