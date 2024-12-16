import express from 'express';
import { /* Admin controller functions */ } from '../controllers/adminController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// Protect admin routes with authentication middleware
router.use(authMiddleware);

// Define admin routes here
// Example:
// router.post('/jobs', createJob);
// router.put('/jobs/:id', updateJob);
// router.delete('/jobs/:id', deleteJob);

export default router;
