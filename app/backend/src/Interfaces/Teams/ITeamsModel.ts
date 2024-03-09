import { ServiceResponse } from '../ServiceResponse';
import ITeams from './ITeams';

export interface ITeamsModel {
  getAllTeams(): Promise<ServiceResponse<ITeams[]>>
  getTeamById(id: ITeams['id']): Promise<ServiceResponse<ITeams>>
}
