export default class GamesWonTieBreaker {
    compare(team1, team2) {
        return team2.gamesWon - team1.gamesWon;
    }
}