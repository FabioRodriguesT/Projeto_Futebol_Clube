// async allLeaderBords(): Promise<ServiceResponse<ILeaderBoard[]>> {
//   const teams = await this.teamModel.findAll();
//   const teamNames = teams.map((team) => team.teamName);
//   const matches = await this.matchModel.matchInProgress(false);

//   const currLeaderBoard = teamNames.map((teamName) => {
//     const teamNameBoard = new TeamBoardService(teamName);

//     const matchesHome = matches.filter((match) => match.homeTeam?.teamName === teamName);

//     const matchesAway = matches.filter((match) => match.awayTeam?.teamName === teamName);

//     teamNameBoard.addBothTeamsData(matchesHome, matchesAway);
//     return teamNameBoard.getBoardData();
//   });

//   const sortLeaderBoard = sortLeaderboard(currLeaderBoard);
//   return { status: 'SUCCESSFUL', data: sortLeaderBoard };
// }

// // Promise<ServiceResponse<ILeaderBoard[]>>
// // public async getLeaderboardTeams(): Promise<ServiceResponse<{ message: string }>> {
// // const teams = await this.teamsModel.findAll();

// // const teamsNameTable = teams.map((dataValues: ITeams) => dataValues);
// // const map = teamsNameTable.map(async (teamName) => {
// //   const teamId = await this.teamsModel.findOne({ where: { teamName } });
// //   if (teamId) {
// //     const matchesHome = await this.matchesModel.findAll({ where: { homeTeamId: teamId } });
// //     const matchesAway = await this.matchesModel.findAll({ where: { awayTeamId: teamId } });
// //   }
// //   const leaderboardTeam = new GenerateLeaderboard(
// //     teamName,
// //     teamId,
// //     matchesHome,
// //     matchesAway,
// //   );
// //   await leaderboardTeam.calculateVictories('home');
// //   const report = await leaderboardTeam.createReport;
// //   console.log(report);
// //   return report;
// // const creatObject = {
// //   name: teamName,
// //   totalVictories: 2,
// //   totalDraws: 0,
// //   totalLosses: 0,
// //   goalsFavor: 6, // gols que o time marcou
// //   goalsOwn: 1, // gols que o time tomou
// //   totalPoints: this.leaderboardCalculate.totalOfPoints(6, 3),
// //   totalGames: this.leaderboardCalculate.totalOfMatch(6, 3, 2),
// // };
// // });

// //   return { status: 'SUCCESSFUL', data: { message: 'jabuticaba' } };
// // }
