import {
  randAvatar,
  randUuid,
  randFirstName,
  randLastName,
  randEmail,
  randFootballTeam,
  randNumber,
  randImg,
  randBetweenDate,
} from '@ngneat/falso';

const clubIds = [] as Array<string>;
const playerIds = [] as Array<string>;

export type Club = {
  id: string;
  name: string;
  foundationDate: Date;
  avatar: string;
  favorite: boolean;
};

export type Player = {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  clubId: string;
  stats: Array<PlayerStats>;
};

export type PlayerStats = {
  id: string;
  season: 'current' | 'last';
  kicksToGoal: number;
  goals: number;
  goalsPercentage: number;
  goalPasses: number;
  intercepts: number;
  score: number;
};

type EntityType = 'player' | 'club';

const getClub = (): Club => {
  const id = randUuid();
  clubIds.push(id);
  return {
    id,
    name: randFootballTeam({}),
    foundationDate: randBetweenDate({
      from: new Date('10/07/1950'),
      to: new Date(),
    }),
    avatar: randImg({
      width: Math.floor(Math.random() * 30) + 290,
      height: Math.floor(Math.random() * 30) + 290,
    }),
    favorite: false,
  };
};

const getPlayer = (): Player => {
  const firstName = randFirstName();
  const lastName = randLastName();
  const id = randUuid();
  playerIds.push(id);
  return {
    id,
    avatar: randAvatar(),
    firstName,
    lastName,
    email: randEmail({ firstName, lastName }),
    clubId: clubIds[Math.floor(Math.random() * clubIds.length)],
    stats: getPlayerStats(),
  };
};
const getPlayerStats = (): PlayerStats[] => {
  return new Array(2).fill(0).map((_, i) => {
    const id = randUuid();
    const kicksToGoal = randNumber({ max: 500 });
    const goals = randNumber({ max: kicksToGoal });
    const goalPasses = randNumber({ max: 200 });
    const intercepts = randNumber({ max: 800 });
    const goalsPercentage = (goals * 100) / kicksToGoal;
    return {
      id,
      season: i === 0 ? 'last' : 'current',
      kicksToGoal,
      goals,
      goalsPercentage,
      goalPasses,
      intercepts,
      score: +(
        ((goalPasses + intercepts + goalsPercentage * 10) / 2000) *
        10
      ).toFixed(2),
    };
  });
};

const getGenerator = (entity: EntityType) => {
  switch (entity) {
    case 'club':
      return getClub;
    case 'player':
      return getPlayer;
  }
};

const generator = (
  entity: EntityType,
  amount: number = 100
): Array<Club | Player> => {
  const buildFunction = getGenerator(entity);
  //@ts-ignore
  return new Array(amount).fill(0).flatMap(() => buildFunction());
};

export default () => {
  return {
    clubs: generator('club', 20),
    players: generator('player', 100),
    // stats: generator('stats', 100),
  };
};
