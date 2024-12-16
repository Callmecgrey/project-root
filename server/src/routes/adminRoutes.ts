// server/src/routes/adminRoutes.ts

import express from 'express';
import { adminDashboard } from '../controllers/adminController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// Protect all admin routes with authentication middleware
router.use(authMiddleware);

// Example admin route
router.get('/dashboard', adminDashboard);

// Future admin routes can be added here
// For instance:
// router.post('/jobs', upload.single('companyLogo'), createJob);
// router.put('/jobs/:id', upload.single('companyLogo'), updateJob);
// router.delete('/jobs/:id', deleteJob);

export default router;
