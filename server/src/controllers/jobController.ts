// server/src/controllers/jobController.ts

import { Request, Response } from 'express';
import { Job } from '../models/jobModel';
import storageService from '../services/storageService';
import cloudflareService from '../services/cloudflareService';
import { v4 as uuidv4 } from 'uuid';

export const getAllJobs = async (req: Request, res: Response) => {
    try {
        const jobs: Job[] = await storageService.getJobs();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch jobs' });
    }
};

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

export const createJob = async (req: Request, res: Response) => {
    try {
        const { title, company, description, responsibilities, department, location, type, requirements, salary, benefits } = req.body;

        // Optional: Handle image upload if a file is provided
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
            responsibilities,
            department,
            location,
            type,
            requirements,
            salary,
            benefits,
            mapUrl: '', // You can set this based on location if needed
        };

        await storageService.addJob(newJob);
        res.status(201).json(newJob);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create job', error: error.message });
    }
};

export const updateJob = async (req: Request, res: Response) => {
    try {
        const { title, company, description, responsibilities, department, location, type, requirements, salary, benefits } = req.body;
        const jobId = req.params.id;

        const existingJob = await storageService.getJobById(jobId);
        if (!existingJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Optional: Handle image upload if a file is provided
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
            responsibilities: responsibilities || existingJob.responsibilities,
            department: department || existingJob.department,
            location: location || existingJob.location,
            type: type || existingJob.type,
            requirements: requirements || existingJob.requirements,
            salary: salary || existingJob.salary,
            benefits: benefits || existingJob.benefits,
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
