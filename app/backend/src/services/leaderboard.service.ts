import ILeaderboardModel from '../Interfaces/Leaderboard/ILeaderboardModel';
import ILeaderBoard from '../Interfaces/Leaderboard/ILeaderboard';
import sortLeaderboard from '../utils/sortBoard';
import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import GenerateLeaderboard from '../utils/leaderboard';

export default class leaderboardService implements ILeaderboardModel {
  private teamsModel = SequelizeTeams;
  private matchesModel = SequelizeMatches;

  public async getLeaderboardTeams(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const teams = await this.teamsModel.findAll();

    const mapTeams = teams.map((team) => team.dataValues);

    const mapBoard = mapTeams.map(async ({ id, teamName }) => {
      const matchesHome = await this.matchesModel.findAll({
        where: { homeTeamId: id, inProgress: false },
      });

      const mapMatchesHome = matchesHome.map((match) => match.dataValues);

      const matchesAway = await this.matchesModel.findAll({
        where: { awayTeamId: id, inProgress: false },
      });

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

    const mapBoard = mapTeams.map(async ({ id, teamName }) => {
      const teamBoard = new GenerateLeaderboard(teamName);

      const matches = await this.matchesModel.findAll({
        where: { inProgress: false, homeTeamId: id },
      });

      const mapMatches = matches.map((match) => match.dataValues);

      const matchesHome = mapMatches
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

    const mapBoard = mapTeams.map(async ({ id, teamName }) => {
      const teamBoard = new GenerateLeaderboard(teamName);

      const matches = await this.matchesModel.findAll({
        where: { inProgress: false, awayTeamId: id },
      });

      const mapMatches = matches.map((match) => match.dataValues);

      const machesAway = mapMatches
        .filter((match) => match.awayTeamId === id);

      teamBoard.awayTeamData(machesAway);

      return teamBoard.generateBoardData();
    });

    const resolvePromisses = await Promise.all(mapBoard);
    const result = sortLeaderboard(resolvePromisses);
    return { status: 'SUCCESSFUL', data: result };
  }
}
