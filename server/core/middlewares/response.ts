import { NextFunction, Request, Response } from 'express';
import { matchers } from '../config';

export default (req: Request, res: Response, next: NextFunction) => {
  matchers.map(({ regExp, query }) => {
    if (regExp.test(req.url)) {
      req.query = query;
    }
  });
  next();
};
