// server/src/app.ts

import express from 'express';
import cors from 'cors';
import jobRoutes from './routes/jobRoutes';
import adminRoutes from './routes/adminRoutes';
import errorHandler from './utils/errorHandler';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/admin', adminRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK' });
});

// Error Handling Middleware
app.use(errorHandler);

export default app;
