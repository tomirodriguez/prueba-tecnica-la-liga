import { NextFunction, Request, Response } from 'express';

export default (req: Request, _: Response, next: NextFunction) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  next();
};
