// server/src/routes/jobRoutes.ts

import express from 'express';
import { getAllJobs, getJobById, createJob, updateJob, deleteJob } from '../controllers/jobController';
import multer from 'multer';

const router = express.Router();

// Configure multer for handling file uploads (company logos)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Public routes
router.get('/', getAllJobs);
router.get('/:id', getJobById);

// Protected routes
router.post('/', upload.single('companyLogo'), createJob);
router.put('/:id', upload.single('companyLogo'), updateJob);
router.delete('/:id', deleteJob);

export default router;
