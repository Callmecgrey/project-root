import { Request, Response } from 'express';
import { Job } from '../models/jobModel';
import storageService from '../services/storageService';

// Get all jobs
export const getAllJobs = async (req: Request, res: Response) => {
    try {
        const jobs: Job[] = await storageService.getJobs();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch jobs' });
    }
};

// Get job by ID
export const getJobById = async (req: Request, res: Response) => {
    try {
        const job: Job | undefined = await storageService.getJobById(req.params.id);
        if (job) {
            res.json(job);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch job' });
    }
};

// Create a new job
export const createJob = async (req: Request, res: Response) => {
    try {
        const newJob: Job = req.body;
        await storageService.addJob(newJob);
        res.status(201).json(newJob);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create job' });
    }
};

// Update a job
export const updateJob = async (req: Request, res: Response) => {
    try {
        const updatedJob: Job = req.body;
        const success = await storageService.updateJob(req.params.id, updatedJob);
        if (success) {
            res.json(updatedJob);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update job' });
    }
};

// Delete a job
export const deleteJob = async (req: Request, res: Response) => {
    try {
        const success = await storageService.deleteJob(req.params.id);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete job' });
    }
};
