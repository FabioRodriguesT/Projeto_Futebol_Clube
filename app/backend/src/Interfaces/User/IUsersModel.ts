import Login from '../LoginType';
import { ServiceResponse } from '../ServiceResponse';
import Token from './Token';

export interface IUsersModel {
  login(login: Login): Promise<ServiceResponse<Token>>
}
