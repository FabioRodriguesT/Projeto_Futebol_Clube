import ILeaderBoard from '../Interfaces/Leaderboard/ILeaderboard';
import sortLeaderboard from '../utils/sortBoard';
import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import GenerateLeaderboard from '../utils/leaderboard';

export default class leaderboardService {
  private teamsModel = SequelizeTeams;
  private matchesModel = SequelizeMatches;

  public async getLeaderboardTeams(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const teams = await this.teamsModel.findAll();

    const mapTeams = teams.map((team) => team.dataValues);

    const mapBoard = mapTeams.map(async ({ id, teamName }) => {
      const matchesHome = await this.matchesModel.findAll({ where: { homeTeamId: id } });

      const mapMatchesHome = matchesHome.map((match) => match.dataValues);

      const matchesAway = await this.matchesModel.findAll({ where: { homeTeamId: id } });

      const mapMatchesAway = matchesAway.map((match) => match.dataValues);

      const teamBoard = new GenerateLeaderboard(teamName);
      teamBoard.calculateMatches(mapMatchesHome, mapMatchesAway);

      return teamBoard.generateBoardData();
    });

    const resolvePromisses = await Promise.all(mapBoard);
    const result = sortLeaderboard(resolvePromisses);
    return { status: 'SUCCESSFUL', data: result };
  }

  public async getLeaderboardHome(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const teams = await this.teamsModel.findAll();
    const mapTeams = teams.map((team) => team.dataValues);
    const matches = await this.matchesModel.findAll({ where: { inProgress: false } });

    const mapBoard = mapTeams.map(({ id, teamName }) => {
      const teamBoard = new GenerateLeaderboard(teamName);

      const matchesHome = matches
        .filter((match) => match.homeTeamId === id);

      teamBoard.homeTeamData(matchesHome);
      return teamBoard.generateBoardData();
    });

    const resolvePromisses = await Promise.all(mapBoard);
    const result = sortLeaderboard(resolvePromisses);
    return { status: 'SUCCESSFUL', data: result };
  }

  public async getLeaderboardAway(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const teams = await this.teamsModel.findAll();
    const mapTeams = teams.map((team) => team.dataValues);
    const matches = await this.matchesModel.findAll({ where: { inProgress: false } });

    const mapBoard = mapTeams.map(({ id, teamName }) => {
      const teamBoard = new GenerateLeaderboard(teamName);

      const machesAway = matches
        .filter((match) => match.awayTeamId === id);
      teamBoard.awayTeamData(machesAway);

      return teamBoard.generateBoardData();
    });

    const resolvePromisses = await Promise.all(mapBoard);
    const result = sortLeaderboard(resolvePromisses);
    return { status: 'SUCCESSFUL', data: result };
  }
}
