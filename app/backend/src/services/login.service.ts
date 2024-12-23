import bcrypt from 'bcryptjs';
import { IUsersModel } from '../Interfaces/User/IUsersModel';
import Login from '../Interfaces/LoginType';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import SequelizeUsers from '../database/models/SequelizeUsers';
import Token from '../Interfaces/User/Token';
import jwtUtil from '../utils/jwt.utils';

type Role = {
  role: string;
};

export default class loginService implements IUsersModel {
  private model = SequelizeUsers;

  public async login(login: Login): Promise<ServiceResponse<Token>> {
    const user = await this.model.findOne({ where: { email: login.email } });

    if (!user || !bcrypt.compareSync(login.password, user.dataValues.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const { email } = user.dataValues;

    const token = jwtUtil.sign({ email });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async findRole(email: string): Promise<ServiceResponse<Role>> {
    const user = await this.model.findOne({ where: { email } });

    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'User not found' } };
    }

    return { status: 'SUCCESSFUL', data: { role: user.dataValues.role } };
  }
}
