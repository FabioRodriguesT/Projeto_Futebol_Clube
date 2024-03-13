import IMatches from '../Interfaces/Matches/IMatches';

export default class generateLeaderboard {
  private homeVictories = 0;
  private homeDraws = 0;
  private homeDefeat = 0;
  private awayVictories = 0;
  private awayDraws = 0;
  private awayDefeat = 0;
  private goalsFavor = 0;
  private goalsOwn = 0;
  private teamName: string;

  constructor(name: string) {
    this.teamName = name;
  }

  public homeTeamData(matches: IMatches[]) {
    matches.forEach((match) => {
      this.goalsFavor += match.homeTeamGoals;
      this.goalsOwn += match.awayTeamGoals;
      if (match.homeTeamGoals > match.awayTeamGoals) {
        this.homeVictories += 1;
      } else if (match.homeTeamGoals === match.awayTeamGoals) {
        this.homeDraws += 1;
      } else {
        this.homeDefeat += 1;
      }
    });
  }

  public awayTeamData(matches: IMatches[]) {
    matches.forEach((match) => {
      this.goalsFavor += match.homeTeamGoals;
      this.goalsOwn += match.awayTeamGoals;
      if (match.homeTeamGoals > match.awayTeamGoals) {
        this.awayVictories += 1;
      } else if (match.homeTeamGoals === match.awayTeamGoals) {
        this.awayDraws += 1;
      } else {
        this.awayDefeat += 1;
      }
    });
  }

  public calculateMatches(matchesHome: IMatches[], matchesAway: IMatches[]) {
    this.homeTeamData(matchesHome);
    this.awayTeamData(matchesAway);
  }

  calculateTotalPoints() {
    const totalVictories = this.homeVictories + this.awayVictories;
    const totalDraws = this.homeDraws + this.awayDraws;

    return (totalVictories * 3) + (totalDraws);
  }

  calculateTotalGames() {
    const totalVictories = this.homeVictories + this.awayVictories;
    const totalDraws = this.homeDraws + this.awayDraws;
    const totalLosses = this.homeDefeat + this.awayDefeat;

    return totalVictories + totalDraws + totalLosses;
  }

  public calculateEfficiency() {
    const totalPoints = this.calculateTotalPoints();
    const totalGames = this.calculateTotalGames();

    return Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
  }

  public generateBoardData() {
    const boardData = {
      name: this.teamName,
      totalPoints: this.calculateTotalPoints(),
      totalGames: this.calculateTotalGames(),
      totalVictories: this.homeVictories + this.awayVictories,
      totalDraws: this.homeDraws + this.awayDraws,
      totalLosses: this.homeDefeat + this.awayDefeat,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsFavor - this.goalsOwn,
      efficiency: this.calculateEfficiency(),
    };
    return boardData;
  }
}
