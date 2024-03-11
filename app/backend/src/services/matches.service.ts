import SequelizeTeams from '../database/models/SequelizeTeams';
import IMatches from '../Interfaces/Matches/IMatches';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatchesModel from '../Interfaces/Matches/IMatchesModel';

export default class matchesService implements IMatchesModel {
  private model = SequelizeMatches;

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

    console.log('MATCHES', matches.length);
    return { status: 'SUCCESSFUL', data: matches };
  }
}
