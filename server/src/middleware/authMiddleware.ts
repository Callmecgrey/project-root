// server/src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const ADMIN_ACCESS_CODE = process.env.ADMIN_ACCESS_CODE || 'your_default_access_code';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        if (token === ADMIN_ACCESS_CODE) {
            next();
        } else {
            logger.error('Invalid admin access code');
            res.status(403).json({ message: 'Forbidden: Invalid access code' });
        }
    } else {
        logger.error('No authorization header provided');
        res.status(401).json({ message: 'Unauthorized: No access code provided' });
    }
};

export default authMiddleware;
