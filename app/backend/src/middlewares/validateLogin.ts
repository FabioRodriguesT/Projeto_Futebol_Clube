import { Request, Response, NextFunction } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import jwtUtil from '../utils/jwt.utils';

class ValidationsLogin {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const user = req.body;

    if (!user.email || !user.password) {
      return res.status(mapStatusHTTP('INVALID_DATA'))
        .json({ message: 'All fields must be filled' });
    }

    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!regex.test(user.email) || user.password.length < 7) {
      return res.status(mapStatusHTTP('UNAUTHORIZED'))
        .json({ message: 'Invalid email or password' });
    }

    return next();
  }

  static async validateToken(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Token not found' });
    }

    const validToken = await jwtUtil.verify(token.split(' ')[1]);

    if (validToken === 'Token must be a valid token') {
      return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: validToken });
    }

    if (typeof validToken !== 'string') {
      res.locals.email = validToken.email;
    }

    next();
  }
}

export default ValidationsLogin;
