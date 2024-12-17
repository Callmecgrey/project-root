// src/controllers/authController.ts

import { Request, Response } from 'express';

/**
 * Verify Access Code
 * 
 * This controller verifies if the provided access code matches the admin access code.
 */
export const verifyAccessCode = async (req: Request, res: Response) => {
    try {
        const { accessCode } = req.body;

        if (!accessCode) {
            return res.status(400).json({ message: 'Access code is required.' });
        }

        const ADMIN_ACCESS_CODE = process.env.ADMIN_ACCESS_CODE;

        if (!ADMIN_ACCESS_CODE) {
            console.error('ADMIN_ACCESS_CODE is not set in environment variables.');
            return res.status(500).json({ message: 'Internal server error.' });
        }

        if (accessCode === ADMIN_ACCESS_CODE) {
            return res.status(200).json({ message: 'Access code is valid.' });
        } else {
            return res.status(403).json({ message: 'Invalid access code.' });
        }
    } catch (error: any) {
        console.error('Error verifying access code:', error);
        return res.status(500).json({ message: 'Failed to verify access code.', error: error.message });
    }
};
