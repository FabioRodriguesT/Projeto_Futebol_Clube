const finishedMatchMock = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 8,
  awayTeamGoals: 1,
  inProgress: false,
  homeTeam: {
    teamName: "São Paulo"
  },
  awayTeam: {
    teamName: "Grêmio"
  }
}

const inProgressMatchMock = {
  id: 43,
  homeTeamId: 11,
  homeTeamGoals: 0,
  awayTeamId: 10,
  awayTeamGoals: 0,
  inProgress: true,
  homeTeam: {
    teamName: "Napoli-SC"
  },
  awayTeam: {
    teamName: "Minas Brasília"
  }
}

const createdMatchMock = {
  homeTeamId: 7,
  homeTeamGoals: 2,
  awayTeamId: 15,
  awayTeamGoals: 2,
  inProgress: true
}

export {
  finishedMatchMock,
  inProgressMatchMock,
  createdMatchMock
}