// src/controllers/applicationController.ts

import { Request, Response } from 'express';
import { Application } from '../models/applicationModel';
import storageService from '../services/storageService';
import cloudflareService from '../services/cloudflareService';
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';

/**
 * Submit a job application.
 */
export const submitApplication = async (req: Request, res: Response) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { jobId, applicantName, applicantEmail, coverLetter } = req.body;

        // Check if the job exists
        const job = await storageService.getJobById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found.' });
        }

        // Handle resume upload
        if (!req.file) {
            return res.status(400).json({ message: 'Resume file is required.' });
        }

        // Upload resume to Cloudflare R2
        const resumeUrl = await cloudflareService.uploadResume(req.file);

        const newApplication: Application = {
            id: uuidv4(),
            jobId,
            applicantName,
            applicantEmail,
            coverLetter: coverLetter || '',
            resumeUrl,
            appliedAt: new Date().toISOString(),
        };

        await storageService.addApplication(newApplication);

        res.status(201).json({ message: 'Application submitted successfully.', application: newApplication });
    } catch (error: any) {
        console.error('Error submitting application:', error);
        res.status(500).json({ message: 'Failed to submit application.', error: error.message });
    }
};
