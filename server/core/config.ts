import { JsonServerRouter } from 'json-server';
import { Club, Player } from './fake';
import { validatePagination } from './validators/pagintaion';

export const matchers = [
  {
    regExp: /\/api\/clubs\/.{1,}/,
    query: { _embed: 'players' },
  },
  {
    regExp: /\/api\/players\/.{1,}/,
    query: { _embed: 'stats' },
  },
];

export const apiConfig = {
  '/clubs\\?id=:id\\?name_like=:name_like': '/clubs/:id',
  '/players\\?id=:id\\?offset=:offset\\?limit=:limit':
    '/:players/:id?offset=:offset&limit=:limit',
  '/player\\?id=:id': '/:players/:id',
};

type RouterType = JsonServerRouter<{
  clubs: (Club | Player)[];
  players: (Club | Player)[];
}>;

export const configResponses = (router: RouterType) => {
  // @ts-ignore
  router.render = (req, res) => {
    validatePagination(req, res);
  };
};
