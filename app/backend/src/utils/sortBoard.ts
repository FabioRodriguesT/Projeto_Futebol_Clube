import ILeaderBoard from '../Interfaces/Leaderboard/ILeaderboard';

function sortLeaderboard(leaderboard: ILeaderBoard[]) {
  const sortedLeaderBoard = leaderboard.sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (a.goalsBalance !== b.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }
    return b.goalsFavor - a.goalsFavor;
  });
  return sortedLeaderBoard;
}

export default sortLeaderboard;
