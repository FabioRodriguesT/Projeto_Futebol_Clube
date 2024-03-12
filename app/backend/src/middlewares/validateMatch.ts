import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/teams.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class ValidationsMatch {
  static async checkingTeamExistence(id: number) {
    const teamsService = new TeamsService();
    const team = await teamsService.getTeamById(id);

    if (team.status === 'SUCCESSFUL') {
      return true;
    }

    return false;
  }

  static async validateTeams(req: Request, res: Response, next: NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(mapStatusHTTP('UNPROCESSABLE'))
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    if (
      !(await ValidationsMatch.checkingTeamExistence(homeTeamId))
    || !(await ValidationsMatch.checkingTeamExistence(awayTeamId))
    ) {
      return res.status(mapStatusHTTP('NOT_FOUND'))
        .json({ message: 'There is no team with such id!' });
    }

    next();
  }
}
