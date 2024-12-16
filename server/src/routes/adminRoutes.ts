// server/src/routes/adminRoutes.ts

import express from 'express';
import { createJob, updateJob, deleteJob } from '../controllers/adminController';
import authMiddleware from '../middleware/authMiddleware';
import multer from 'multer';

const router = express.Router();

// Configure multer for handling file uploads (company logos)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Protect all admin routes with authentication middleware
router.use(authMiddleware);

// Create a new job
router.post('/jobs', upload.single('companyLogo'), createJob);

// Update an existing job
router.put('/jobs/:id', upload.single('companyLogo'), updateJob);

// Delete a job
router.delete('/jobs/:id', deleteJob);

export default router;
