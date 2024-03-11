import { ServiceResponse } from '../ServiceResponse';
import IMatches from './IMatches';

export default interface IMatchesModel {
  matchesList(inProgress: boolean | undefined): Promise<ServiceResponse<IMatches[]>>
}
