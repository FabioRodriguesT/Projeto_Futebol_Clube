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
}
