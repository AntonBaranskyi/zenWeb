import jwt from 'jsonwebtoken';

import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNext,
} from 'express';

export default (
  req: ExpressRequest,
  resp: ExpressResponse,
  next: ExpressNext
) => {
  const token = req.headers.authorization || '';

  if (token) {
    try {
      const decodedToken = jwt.verify(token, 'secret123');

      console.log(decodedToken);
      // @ts-ignore

      req.body.user_id = decodedToken.id;
      next();
    } catch (error) {
      console.log(error);
      return resp.status(403).json({
        message: 'No permission',
      });
    }
  } else {
    return resp.status(403).json({
      message: 'No permission',
    });
  }
};
