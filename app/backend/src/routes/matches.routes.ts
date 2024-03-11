import { Request, Router, Response } from 'express';
import ValidationsLogin from '../middlewares/validateLogin';
import MatchesController from '../controllers/matches.controllers';

const matchesController = new MatchesController();

const router = Router();

router.get(
  '/',
  ValidationsLogin.validateToken,
  (req: Request, res: Response) => matchesController.matchesList(req, res),
);

export default router;
