// server/src/utils/errorHandler.ts

import { Request, Response, NextFunction } from 'express';
import logger from './logger';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;
