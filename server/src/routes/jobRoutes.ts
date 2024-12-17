// src/routes/jobRoutes.ts

import express from 'express';
import {
    getAllJobs,
    getJobById,
} from '../controllers/jobController';
import {
    createJob,
    updateJob,
    deleteJob,
} from '../controllers/adminController';
import { submitApplication } from '../controllers/applicationController';
import authMiddleware from '../middleware/authMiddleware';
import upload from '../middleware/uploadMiddleware';
import { body } from 'express-validator';

const router = express.Router();

// --- Public Routes ---

// Get all jobs
router.get('/', getAllJobs);

// Get a specific job by ID
router.get('/:id', getJobById);

// Apply for a job
router.post(
    '/:id/apply',
    upload.single('resume'),
    [
        body('applicantName').notEmpty().withMessage('Applicant name is required.'),
        body('applicantEmail').isEmail().withMessage('Valid applicant email is required.'),
        body('coverLetter').optional().isString(),
    ],
    submitApplication
);

// --- Admin Routes ---

// Create a new job (Protected)
router.post(
    '/',
    authMiddleware,
    [
        body('title').notEmpty().withMessage('Job title is required.'),
        body('company').notEmpty().withMessage('Company name is required.'),
        body('description').notEmpty().withMessage('Job description is required.'),
        body('responsibilities').isArray({ min: 1 }).withMessage('At least one responsibility is required.'),
        body('department').notEmpty().withMessage('Department is required.'),
        body('location').notEmpty().withMessage('Location is required.'),
        body('type').notEmpty().withMessage('Job type is required.'),
        body('requirements').isArray({ min: 1 }).withMessage('At least one requirement is required.'),
    ],
    createJob
);

// Update an existing job (Protected)
router.put(
    '/:id',
    authMiddleware,
    [
        body('title').optional().notEmpty().withMessage('Job title cannot be empty.'),
        body('company').optional().notEmpty().withMessage('Company name cannot be empty.'),
        body('description').optional().notEmpty().withMessage('Job description cannot be empty.'),
        body('responsibilities').optional().isArray({ min: 1 }).withMessage('At least one responsibility is required if provided.'),
        body('department').optional().notEmpty().withMessage('Department cannot be empty.'),
        body('location').optional().notEmpty().withMessage('Location cannot be empty.'),
        body('type').optional().notEmpty().withMessage('Job type cannot be empty.'),
        body('requirements').optional().isArray({ min: 1 }).withMessage('At least one requirement is required if provided.'),
    ],
    updateJob
);

// Delete a job (Protected)
router.delete(
    '/:id',
    authMiddleware,
    deleteJob
);

export default router;
