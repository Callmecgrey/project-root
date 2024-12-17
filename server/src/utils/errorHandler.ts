// src/utils/errorHandler.ts

import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import logger from './logger';

/**
 * Global error handling middleware.
 */
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message || 'An unknown error occurred.');

    if (err instanceof multer.MulterError) {
        // Handle Multer-specific errors
        return res.status(400).json({ message: err.message });
    } else if (err.message === 'Invalid file type. Only PDF and Word documents are allowed.') {
        return res.status(400).json({ message: err.message });
    }

    // Handle validation errors from express-validator
    if (err.errors) {
        return res.status(400).json({ errors: err.errors });
    }

    // In production, avoid sending detailed error information
    const isProduction = process.env.NODE_ENV === 'production';
    const errorMessage = isProduction ? 'Internal Server Error' : err.message;

    res.status(500).json({ message: errorMessage });
};

export default errorHandler;
