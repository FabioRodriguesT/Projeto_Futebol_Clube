import SequelizeTeams from '../database/models/SequelizeTeams';
import IMatches from '../Interfaces/Matches/IMatches';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatchesModel from '../Interfaces/Matches/IMatchesModel';
import TeamsService from './teams.service';

export default class matchesService implements IMatchesModel {
  private model = SequelizeMatches;
  private teamsService = new TeamsService();

  public async matchesList(inProgress: boolean | undefined): Promise<ServiceResponse<IMatches[]>> {
    const where = inProgress !== undefined ? { inProgress } : undefined;

    const matches = await this.model.findAll({
      where,
      include: [{
        model: SequelizeTeams,
        as: 'homeTeam',
        attributes: ['teamName'],
      }, {
        model: SequelizeTeams,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
    });

    return { status: 'SUCCESSFUL', data: matches };
  }

  public async finishAMatch(id: number): Promise<ServiceResponse<{ message: string }>> {
    await this.model.update({ inProgress: false }, { where: { id } });
    return { status: 'SUCCESSFUL', data: { message: 'Finish' } };
  }

  public async changeResultMatch(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<{ message: string }>> {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return { status: 'SUCCESSFUL', data: { message: 'Updated results' } };
  }

  public async createAMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<IMatches>> {
    const match = await this.model.create({
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress: true,
    });

    return { status: 'CREATED', data: match };
  }
}
