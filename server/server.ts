import jsonServer from 'json-server';
import dataInitiator from './core/fake';
import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import responseMiddleware from './core/middlewares/response';
import tokenMiddleware from './core/middlewares/token';
import postMiddleware from './core/middlewares/post';
import login from './core/controllers/login';
import { apiConfig, configResponses } from './core/config';
import swaggerUI from 'swagger-ui-express';
import apiJson from './core/apiDocs/api.json';
const server = jsonServer.create();
const data = dataInitiator();
const router = jsonServer.router(data);
const middlewares = jsonServer.defaults();

config();
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  postMiddleware(req, res, next);
});

server.post('/login', (req, res) => {
  login(req, res);
});
server.use((req: Request, res: Response, next: NextFunction) => {
  tokenMiddleware(req, res, next);
});
server.use('/api-docs', swaggerUI.serve);
server.get('/api-docs', swaggerUI.setup(apiJson));

configResponses(router);
server.use((req: Request, res: Response, next: NextFunction) => {
  responseMiddleware(req, res, next);
});
server.use(jsonServer.rewriter(apiConfig));
server.use('/api', router);

const host = `http://localhost:${process.env.PORT}`;
server.listen(process.env.PORT, () => {
  console.log('--------------------------------------------------------------');
  console.log(`|            ⚽ Welcome to LaLiga challenge ⚽               |`);
  console.log('--------------------------------------------------------------');
  console.log(`|                                                            |`);
  console.log(`| ✅ Server is running on ${host}              |`);
  console.log(`|                                                            |`);
  console.log(`| 🔍 Visit ${host}/api-docs to explore the API |`);
  console.log(`|                                                            |`);
  console.log('--------------------------------------------------------------');
  console.log(`|                   💻 Happy coding! 😊                      |`);
  console.log('--------------------------------------------------------------');
});
