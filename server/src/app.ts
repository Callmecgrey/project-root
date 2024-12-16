import express from 'express';
import cors from 'cors';
import jobRoutes from './routes/jobRoutes';
import adminRoutes from './routes/adminRoutes';
import errorHandler from './utils/errorHandler';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling Middleware
app.use(errorHandler);

export default app;
