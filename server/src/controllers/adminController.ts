// src/controllers/adminController.ts

import { Request, Response } from 'express';
import { Job } from '../models/jobModel';
import storageService from '../services/storageService';
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
            mapUrl,
            companyLogo, // Assuming the frontend sends a URL
        } = req.body;

        // Validate required fields
        if (!title || !company || !description || !responsibilities || !department || !location || !type || !requirements) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        const newJob: Job = {
            id: uuidv4(),
            title,
            company,
            companyLogo: companyLogo || '',
            description,
            responsibilities: Array.isArray(responsibilities) ? responsibilities : [responsibilities],
            department,
            location,
            type,
            requirements: Array.isArray(requirements) ? requirements : [requirements],
            salary: salary || '',
            benefits: benefits ? (Array.isArray(benefits) ? benefits : [benefits]) : [],
            mapUrl: mapUrl || '',
        };

        await storageService.addJob(newJob);
        res.status(201).json(newJob);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to create job.', error: error.message });
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
            mapUrl,
            companyLogo, // Optional URL update
        } = req.body;

        const existingJob = await storageService.getJobById(jobId);
        if (!existingJob) {
            return res.status(404).json({ message: 'Job not found.' });
        }

        const updatedJob: Job = {
            ...existingJob,
            title: title || existingJob.title,
            company: company || existingJob.company,
            companyLogo: companyLogo || existingJob.companyLogo,
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
            mapUrl: mapUrl || existingJob.mapUrl,
        };

        const success = await storageService.updateJob(jobId, updatedJob);
        if (success) {
            res.json(updatedJob);
        } else {
            res.status(404).json({ message: 'Job not found.' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to update job.', error: error.message });
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
            res.status(404).json({ message: 'Job not found.' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to delete job.', error: error.message });
    }
};
