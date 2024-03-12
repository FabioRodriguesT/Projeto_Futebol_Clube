import { Request, Router, Response } from 'express';
import ValidationsLogin from '../middlewares/validateLogin';
import MatchesController from '../controllers/matches.controllers';
import ValidationsMatch from '../middlewares/validateMatch';

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

router.patch(
  '/:id',
  ValidationsLogin.validateToken,
  (req: Request, res: Response) => matchesController.changeResultMatch(req, res),
);

router.post(
  '/',
  ValidationsLogin.validateToken,
  ValidationsMatch.validateTeams,
  (req: Request, res: Response) => matchesController.createAMatch(req, res),
);

export default router;
