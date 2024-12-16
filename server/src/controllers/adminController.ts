// server/src/controllers/adminController.ts

import { Request, Response } from 'express';
import { Job } from '../models/jobModel';
import storageService from '../services/storageService';
import cloudflareService from '../services/cloudflareService';
import { v4 as uuidv4 } from 'uuid';

/**
 * Create a new job listing.
 */
export const createJob = async (req: Request, res: Response) => {
    try {
        const {
            title,
            company,
            description,
            responsibilities,
            department,
            location,
            type,
            requirements,
            salary,
            benefits,
        } = req.body;

        // Handle image upload if a file is provided
        let companyLogo: string | undefined = undefined;
        if (req.file) {
            companyLogo = await cloudflareService.uploadImage(req.file);
        }

        const newJob: Job = {
            id: uuidv4(),
            title,
            company,
            companyLogo,
            description,
            responsibilities: Array.isArray(responsibilities) ? responsibilities : [responsibilities],
            department,
            location,
            type,
            requirements: Array.isArray(requirements) ? requirements : [requirements],
            salary,
            benefits: benefits ? (Array.isArray(benefits) ? benefits : [benefits]) : undefined,
            mapUrl: '', // Optional: Set based on location if needed
        };

        await storageService.addJob(newJob);
        res.status(201).json(newJob);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create job', error: error.message });
    }
};

/**
 * Update an existing job listing.
 */
export const updateJob = async (req: Request, res: Response) => {
    try {
        const jobId = req.params.id;
        const {
            title,
            company,
            description,
            responsibilities,
            department,
            location,
            type,
            requirements,
            salary,
            benefits,
        } = req.body;

        const existingJob = await storageService.getJobById(jobId);
        if (!existingJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Handle image upload if a file is provided
        let companyLogo = existingJob.companyLogo;
        if (req.file) {
            companyLogo = await cloudflareService.uploadImage(req.file);
        }

        const updatedJob: Job = {
            ...existingJob,
            title: title || existingJob.title,
            company: company || existingJob.company,
            companyLogo,
            description: description || existingJob.description,
            responsibilities: responsibilities
                ? Array.isArray(responsibilities)
                    ? responsibilities
                    : [responsibilities]
                : existingJob.responsibilities,
            department: department || existingJob.department,
            location: location || existingJob.location,
            type: type || existingJob.type,
            requirements: requirements
                ? Array.isArray(requirements)
                    ? requirements
                    : [requirements]
                : existingJob.requirements,
            salary: salary || existingJob.salary,
            benefits: benefits
                ? Array.isArray(benefits)
                    ? benefits
                    : [benefits]
                : existingJob.benefits,
            mapUrl: existingJob.mapUrl, // Update if necessary
        };

        const success = await storageService.updateJob(jobId, updatedJob);
        if (success) {
            res.json(updatedJob);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update job', error: error.message });
    }
};

/**
 * Delete a job listing.
 */
export const deleteJob = async (req: Request, res: Response) => {
    try {
        const jobId = req.params.id;
        const success = await storageService.deleteJob(jobId);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete job' });
    }
};
