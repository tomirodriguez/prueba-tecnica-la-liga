import { Response } from 'express';

export type Pagination = {
  offset: number;
  limit: number;
};
export default class LaLigaResponse {
  static pagination(res: Response, pagination?: Pagination) {
    const data = pagination
      ? res.locals.data.slice(
          pagination.offset,
          pagination.offset + pagination.limit
        )
      : res.locals.data;
    return res.jsonp({
      results: data,
      total: res.locals.data.length,
    });
  }
  static itemResponse(res: Response) {
    return res.jsonp(res.locals.data);
  }
}
