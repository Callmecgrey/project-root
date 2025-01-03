// src/services/storageService.ts

import fs from 'fs/promises';
import path from 'path';
import { Job } from '../models/jobModel';
import { Application } from '../models/applicationModel';

const jobsFilePath = path.join(__dirname, '../data/jobs.json');
const applicationsFilePath = path.join(__dirname, '../data/applications.json');

const storageService = {
    // --- Job Methods ---

    /**
     * Retrieve all jobs.
     */
    getJobs: async (): Promise<Job[]> => {
        try {
            const data = await fs.readFile(jobsFilePath, 'utf-8');
            return JSON.parse(data);
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                return [];
            }
            throw error;
        }
    },

    /**
     * Retrieve a job by its ID.
     * @param id - Job ID.
     */
    getJobById: async (id: string): Promise<Job | undefined> => {
        const jobs = await storageService.getJobs();
        return jobs.find(job => job.id === id);
    },

    /**
     * Add a new job.
     * @param job - Job object to add.
     */
    addJob: async (job: Job): Promise<void> => {
        const jobs = await storageService.getJobs();
        jobs.push(job);
        await fs.writeFile(jobsFilePath, JSON.stringify(jobs, null, 2));
    },

    /**
     * Update an existing job.
     * @param id - Job ID.
     * @param updatedJob - Updated job object.
     * @returns Success status.
     */
    updateJob: async (id: string, updatedJob: Job): Promise<boolean> => {
        const jobs = await storageService.getJobs();
        const index = jobs.findIndex(job => job.id === id);
        if (index === -1) return false;
        jobs[index] = updatedJob;
        await fs.writeFile(jobsFilePath, JSON.stringify(jobs, null, 2));
        return true;
    },

    /**
     * Delete a job.
     * @param id - Job ID.
     * @returns Success status.
     */
    deleteJob: async (id: string): Promise<boolean> => {
        let jobs = await storageService.getJobs();
        const initialLength = jobs.length;
        jobs = jobs.filter(job => job.id !== id);
        if (jobs.length === initialLength) return false;
        await fs.writeFile(jobsFilePath, JSON.stringify(jobs, null, 2));
        return true;
    },

    // --- Application Methods ---

    /**
     * Retrieve all applications.
     */
    getApplications: async (): Promise<Application[]> => {
        try {
            const data = await fs.readFile(applicationsFilePath, 'utf-8');
            return JSON.parse(data);
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                return [];
            }
            throw error;
        }
    },

    /**
     * Retrieve applications by Job ID.
     * @param jobId - Job ID.
     */
    getApplicationsByJobId: async (jobId: string): Promise<Application[]> => {
        const applications = await storageService.getApplications();
        return applications.filter(app => app.jobId === jobId);
    },

    /**
     * Add a new application.
     * @param application - Application object to add.
     */
    addApplication: async (application: Application): Promise<void> => {
        const applications = await storageService.getApplications();
        applications.push(application);
        await fs.writeFile(applicationsFilePath, JSON.stringify(applications, null, 2));
    },
};

export default storageService;
