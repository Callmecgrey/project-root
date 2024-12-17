// src/app.ts

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import jobRoutes from './routes/jobRoutes';
import errorHandler from './utils/errorHandler';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

// Middleware
app.use(helmet()); // Secure HTTP headers
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK' });
});

// Error Handling Middleware
app.use(errorHandler);

export default app;
