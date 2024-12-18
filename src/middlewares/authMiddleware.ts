import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { unauthorizedError } from '../utils/errorUtils';

export async function ensureAuthenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) throw unauthorizedError('Missing authorization header');

  const token = authorization.replace('Bearer ', '');
  if (!token) throw unauthorizedError('Missing token');

  // jwt will throw in case of error, thats the reason for "try" and "catch"
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) throw unauthorizedError('Missing JWT secret');

    const decodedToken = jwt.verify(token, JWT_SECRET) as unknown as { userId: number };
    const { userId } = decodedToken;
    res.locals.user = userId;
    next();
  } catch {
    throw unauthorizedError('Invalid token');
  }
}
