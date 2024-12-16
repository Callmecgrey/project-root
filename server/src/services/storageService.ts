import fs from 'fs/promises';
import path from 'path';
import { Job } from '../models/jobModel';

const dataFilePath = path.join(__dirname, '../data/jobs.json');

const storageService = {
    // Get all jobs
    getJobs: async (): Promise<Job[]> => {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        return JSON.parse(data);
    },

    // Get job by ID
    getJobById: async (id: string): Promise<Job | undefined> => {
        const jobs = await storageService.getJobs();
        return jobs.find(job => job.id === id);
    },

    // Add a new job
    addJob: async (job: Job): Promise<void> => {
        const jobs = await storageService.getJobs();
        jobs.push(job);
        await fs.writeFile(dataFilePath, JSON.stringify(jobs, null, 2));
    },

    // Update an existing job
    updateJob: async (id: string, updatedJob: Job): Promise<boolean> => {
        const jobs = await storageService.getJobs();
        const index = jobs.findIndex(job => job.id === id);
        if (index === -1) return false;
        jobs[index] = updatedJob;
        await fs.writeFile(dataFilePath, JSON.stringify(jobs, null, 2));
        return true;
    },

    // Delete a job
    deleteJob: async (id: string): Promise<boolean> => {
        let jobs = await storageService.getJobs();
        const initialLength = jobs.length;
        jobs = jobs.filter(job => job.id !== id);
        if (jobs.length === initialLength) return false;
        await fs.writeFile(dataFilePath, JSON.stringify(jobs, null, 2));
        return true;
    },
};

export default storageService;
