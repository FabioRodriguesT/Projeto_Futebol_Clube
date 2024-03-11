import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeTeams from './SequelizeTeams';

class SequelizeMatches extends Model<InferAttributes<SequelizeMatches>,
InferCreationAttributes<SequelizeMatches>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

SequelizeTeams.hasMany(
  SequelizeMatches,
  {
    foreignKey: 'homeTeamId',
    as: 'homeTeam',
  },
);

SequelizeTeams.hasMany(
  SequelizeMatches,
  {
    foreignKey: 'awayTeamId',
    as: 'awayTeam',
  },
);

SequelizeMatches.belongsTo(SequelizeTeams, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

SequelizeMatches.belongsTo(SequelizeTeams, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

export default SequelizeMatches;
