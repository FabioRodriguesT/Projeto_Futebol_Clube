import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) {}

  public async getAllTeams(_req: Request, res: Response) {
    const { status, data } = await this.teamsService.getAllTeams();

    res.status(mapStatusHTTP(status)).json(data);
  }

  public async getTeamById(_req: Request, res: Response) {
    const { id } = _req.params;
    const { status, data } = await this.teamsService.getTeamById(Number(id));

    res.status(mapStatusHTTP(status)).json(data);
  }
}
