import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import LaLigaError from '../formatters/errors';

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token =
    authHeader &&
    authHeader.includes('Bearer ') &&
    (authHeader.replace('Bearer ', '') as any);

  if (req.path?.includes('/api-docs')) {
    return next();
  }
  if (token == null) return LaLigaError.unauthorized(res);

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any) => {
    if (err) {
      return LaLigaError.forbidden(res, 'Invalid Token');
    }
    next();
  });
};
