import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNext,
} from 'express';
import { Deal } from '../models/Deal.js';

const getAll = async (
  req: ExpressRequest,
  resp: ExpressResponse,
  next: ExpressNext
) => {
  try {
    const deals = await Deal.findAll();

    resp.json({ deals });
  } catch (error) {
    next(error);
  }
};

export default { getAll };
