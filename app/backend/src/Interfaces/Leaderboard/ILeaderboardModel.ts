import { ServiceResponse } from '../ServiceResponse';

export default interface ILeaderboardModel {
  getLeaderboard(): Promise<ServiceResponse<{ message: string }>>
}
