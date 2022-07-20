import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import LaLigaError from '../formatters/errors';

const generateAccessToken = (email: string | object | Buffer) => {
  return jwt.sign(email, process.env.TOKEN_SECRET as string, {
    expiresIn: '3600s',
  });
};

export default (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email === 'fake.user@fake.com' && password === '123') {
    const token = generateAccessToken({
      email: req.body.email,
    });
    return res.json({
      token,
    });
  } else {
    return LaLigaError.badRequest(res, 'Invalid user');
  }
};
