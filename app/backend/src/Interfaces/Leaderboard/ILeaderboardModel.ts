import { ServiceResponse } from '../ServiceResponse';
import ILeaderboard from './ILeaderboard';

export default interface ILeaderboardModel {
  getLeaderboardTeams(): Promise<ServiceResponse<ILeaderboard[]>>
  getLeaderboardHome(): Promise<ServiceResponse<ILeaderboard[]>>
  getLeaderboardAway(): Promise<ServiceResponse<ILeaderboard[]>>
}
