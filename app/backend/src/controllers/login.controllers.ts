import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) {}

  public async login(_req: Request, res: Response) {
    const { status, data } = await this.loginService.login(_req.body);

    res.status(mapStatusHTTP(status)).json(data);
  }

  public async findRole(_req: Request, res: Response) {
    const { status, data } = await this.loginService.findRole(res.locals.email);

    res.status(mapStatusHTTP(status)).json(data);
  }
}
