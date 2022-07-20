import { Response } from 'express';

export default class LaLigaError {
  static forbidden(res: Response, message: string = 'Forbidden') {
    return res.status(403).json({
      status: 403,
      message: message,
    });
  }
  static unauthorized(res: Response, message: string = 'Unauthorized') {
    return res.status(401).json({
      status: 401,
      message: message,
    });
  }
  static badRequest(res: Response, message: string = 'Bad Request') {
    return res.status(400).json({
      status: 400,
      message: message,
    });
  }
  static notFound(res: Response, message: string = 'Not Found') {
    return res.status(404).json({
      status: 404,
      message: message,
    });
  }
}
