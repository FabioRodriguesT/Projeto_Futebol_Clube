import SequelizeTeams from '../database/models/SequelizeTeams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ITeams from '../Interfaces/Teams/ITeams';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';

export default class TeamsServices implements ITeamsModel {
  private model = SequelizeTeams;

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.model.findAll();

    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: ITeams['id']): Promise<ServiceResponse<ITeams>> {
    const team = await this.model.findByPk(id);

    if (!team) {
      return { status: 'NOT_FOUND', data: { message: 'Team not found' } };
    }

    return { status: 'SUCCESSFUL', data: team };
  }
}
