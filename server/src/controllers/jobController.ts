// src/controllers/jobController.ts

import { Request, Response } from 'express';
import { Job } from '../models/jobModel';
import storageService from '../services/storageService';

/**
 * Get all job listings.
 */
export const getAllJobs = async (req: Request, res: Response) => {
    try {
        const jobs: Job[] = await storageService.getJobs();
        res.json(jobs);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to fetch jobs.', error: error.message });
    }
};

/**
 * Get a single job by ID.
 */
export const getJobById = async (req: Request, res: Response) => {
    try {
        const job: Job | undefined = await storageService.getJobById(req.params.id);
        if (job) {
            res.json(job);
        } else {
            res.status(404).json({ message: 'Job not found.' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to fetch job.', error: error.message });
    }
};
