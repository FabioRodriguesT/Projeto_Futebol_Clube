import { Request, Response, NextFunction } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';

class ValidationsLogin {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const user = req.body;

    if (!user.email || !user.password) {
      return res.status(mapStatusHTTP('INVALID_DATA'))
        .json({ message: 'All fields must be filled' });
    }

    return next();
  }
}

export default ValidationsLogin;
