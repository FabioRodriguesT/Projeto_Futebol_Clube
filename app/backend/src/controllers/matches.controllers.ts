import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  public async matchesList(_req: Request, res: Response) {
    const { inProgress } = _req.query;
    // undefined, false or true
    const { status, data } = await this.matchesService.matchesList(
      inProgress === undefined ? undefined : inProgress === 'true',
    );

    res.status(mapStatusHTTP(status)).json(data);
  }

  public async finishAMatch(_req: Request, res: Response) {
    const { id } = _req.params;

    const { status, data } = await this.matchesService.finishAMatch(Number(id));

    res.status(mapStatusHTTP(status)).json(data);
  }

  public async changeResultMatch(_req: Request, res: Response) {
    const { id } = _req.params;
    const { homeTeamGoals, awayTeamGoals } = _req.body;

    const { status, data } = await this.matchesService.changeResultMatch(
      Number(id),
      homeTeamGoals,
      awayTeamGoals,
    );

    res.status(mapStatusHTTP(status)).json(data);
  }

  public async createAMatch(_req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = _req.body;

    console.log(_req.body);
    const { status, data } = await this.matchesService.createAMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );

    res.status(mapStatusHTTP(status)).json(data);
  }
}
