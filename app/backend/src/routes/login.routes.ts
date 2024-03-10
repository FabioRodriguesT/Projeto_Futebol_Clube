import { Request, Router, Response } from 'express';
import ValidationsLogin from '../middlewares/validateLogin';
import UserController from '../controllers/login.controllers';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  ValidationsLogin.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

router.get(
  '/role',
  ValidationsLogin.validateToken,
  (req: Request, res: Response) => userController.findRole(req, res),
);

export default router;
