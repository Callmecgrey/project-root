// src/routes/authRoutes.ts

import express from 'express';
import { verifyAccessCode } from '../controllers/authController';

const router = express.Router();

/**
 * @route   POST /api/verify-access-code
 * @desc    Verify the provided admin access code
 * @access  Public
 */
router.post('/verify-access-code', verifyAccessCode);

export default router;
