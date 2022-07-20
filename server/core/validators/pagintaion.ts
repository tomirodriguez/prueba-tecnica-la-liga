import { Request, Response } from 'express';
import { matchers } from '../config';
import LaLigaError from '../formatters/errors';
import LaLigaResponse from '../formatters/responses';

const checkPaginationValue = (pagination: {
  offset: string | null;
  limit: string | null;
}) => {
  const { offset, limit } = pagination;
  return isNaN(parseFloat(offset || '')) || isNaN(parseFloat(limit || ''));
};
function getParameterByName(name: string, url: string) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export const validatePagination = (req: Request, res: Response) => {
  const unpaginatedUrl = matchers.some(({ regExp }) =>
    regExp.test(req.originalUrl)
  );
  if (req.method === 'DELETE' && /\/clubs\/.{1,}/.test(req.path)) {
    const id = req.path.replace('/clubs/', '');
    return res.status(200).json({ id });
  }
  if (unpaginatedUrl) {
    return LaLigaResponse.itemResponse(res);
  }
  const offset = getParameterByName('offset', req.originalUrl);
  const limit = getParameterByName('limit', req.originalUrl);

  if (offset || limit) {
    if (checkPaginationValue({ offset, limit })) {
      return LaLigaError.badRequest(res, 'Invalid pagination values');
    }
    return LaLigaResponse.pagination(res, {
      offset: parseFloat(offset as string),
      limit: parseFloat(limit as string),
    });
  }

  return LaLigaResponse.pagination(res);
};
