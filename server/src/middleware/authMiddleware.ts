// src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to authenticate admin routes using a Bearer token.
 */
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing.' });
    }

    const token = authHeader.split(' ')[1]; // Expecting format "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Bearer token missing.' });
    }

    const ADMIN_ACCESS_CODE = process.env.ADMIN_ACCESS_CODE;

    if (!ADMIN_ACCESS_CODE) {
        console.error('ADMIN_ACCESS_CODE is not set in environment variables.');
        return res.status(500).json({ message: 'Internal server error.' });
    }

    if (token !== ADMIN_ACCESS_CODE) {
        return res.status(403).json({ message: 'Invalid access code.' });
    }

    next();
};

export default authMiddleware;
