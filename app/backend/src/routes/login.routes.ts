import { Request, Router, Response } from 'express';
import ValidationsLogin from '../middlewares/validateLogin';
import LoginController from '../controllers/login.controllers';

const loginController = new LoginController();

const router = Router();

router.post(
  '/',
  ValidationsLogin.validateLogin,
  (req: Request, res: Response) => loginController.login(req, res),
);

export default router;
