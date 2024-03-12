import { Request, Router, Response } from 'express';
import ValidationsLogin from '../middlewares/validateLogin';
import MatchesController from '../controllers/matches.controllers';

const matchesController = new MatchesController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => matchesController.matchesList(req, res),
);

router.patch(
  '/:id/finish',
  ValidationsLogin.validateToken,
  (req: Request, res: Response) => matchesController.finishAMatch(req, res),
);

export default router;
