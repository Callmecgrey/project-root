// src/utils/api.ts

/**
 * API Utility Functions for Job Landing Page Application
 * 
 * This file contains all the necessary functions to interact with the backend server's API endpoints.
 * It includes both public and admin routes, handling data fetching, submissions, and administrative actions.
 */

import axios, { AxiosResponse } from 'axios';

// Base URL configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5009/api';

/**
 * Fetch all job listings.
 * 
 * @returns Promise resolving to an array of Job objects.
 */
export const fetchJobs = async (): Promise<any[]> => {
    try {
        const res: AxiosResponse<any[]> = await axios.get(`${API_BASE_URL}/jobs`);
        return res.data;
    } catch (error: any) {
        console.error('Error fetching jobs:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch jobs');
    }
};

/**
 * Fetch a specific job by its ID.
 * 
 * @param jobId - The unique identifier of the job.
 * @returns Promise resolving to the Job object.
 */
export const fetchJobById = async (jobId: string): Promise<any> => {
    try {
        const res: AxiosResponse<any> = await axios.get(`${API_BASE_URL}/jobs/${jobId}`);
        return res.data;
    } catch (error: any) {
        console.error(`Error fetching job with ID ${jobId}:`, error);
        throw new Error(error.response?.data?.message || 'Failed to fetch job');
    }
};

/**
 * Submit a job application.
 * 
 * @param jobId - The unique identifier of the job being applied to.
 * @param applicationData - An object containing applicant details and resume file.
 * @returns Promise resolving to the submission response.
 */
export const submitApplication = async (
    jobId: string,
    applicationData: {
        applicantName: string;
        applicantEmail: string;
        coverLetter?: string;
        resume: File;
    }
): Promise<any> => {
    try {
        const formData = new FormData();
        formData.append('jobId', jobId);
        formData.append('applicantName', applicationData.applicantName);
        formData.append('applicantEmail', applicationData.applicantEmail);
        if (applicationData.coverLetter) {
            formData.append('coverLetter', applicationData.coverLetter);
        }
        formData.append('resume', applicationData.resume);

        const res: AxiosResponse<any> = await axios.post(
            `${API_BASE_URL}/jobs/${jobId}/apply`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return res.data;
    } catch (error: any) {
        console.error('Error submitting application:', error);
        throw new Error(error.response?.data?.message || 'Failed to submit application');
    }
};

/**
 * Create a new job listing (Admin Route).
 * 
 * @param jobData - An object containing all necessary job details.
 * @param accessCode - The admin access code for authorization.
 * @returns Promise resolving to the created Job object.
 */
export const createJob = async (jobData: {
    title: string;
    company: string;
    description: string;
    responsibilities: string[];
    department: string;
    location: string;
    type: string;
    requirements: string[];
    salary?: string;
    benefits?: string[];
    mapUrl?: string;
    companyLogo?: string; // URL to the company logo
}, accessCode: string): Promise<any> => {
    try {
        const res: AxiosResponse<any> = await axios.post(`${API_BASE_URL}/jobs`, jobData, {
            headers: {
                'Authorization': `Bearer ${accessCode}`,
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    } catch (error: any) {
        console.error('Error creating job:', error);
        throw new Error(error.response?.data?.message || 'Failed to create job');
    }
};

/**
 * Update an existing job listing (Admin Route).
 * 
 * @param jobId - The unique identifier of the job to update.
 * @param updatedData - An object containing the fields to update.
 * @param accessCode - The admin access code for authorization.
 * @returns Promise resolving to the updated Job object.
 */
export const updateJob = async (
    jobId: string,
    updatedData: Partial<{
        title: string;
        company: string;
        description: string;
        responsibilities: string[];
        department: string;
        location: string;
        type: string;
        requirements: string[];
        salary?: string;
        benefits?: string[];
        mapUrl?: string;
        companyLogo?: string; // URL to the company logo
    }>,
    accessCode: string
): Promise<any> => {
    try {
        const res: AxiosResponse<any> = await axios.put(`${API_BASE_URL}/jobs/${jobId}`, updatedData, {
            headers: {
                'Authorization': `Bearer ${accessCode}`,
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    } catch (error: any) {
        console.error(`Error updating job with ID ${jobId}:`, error);
        throw new Error(error.response?.data?.message || 'Failed to update job');
    }
};

/**
 * Delete a job listing (Admin Route).
 * 
 * @param jobId - The unique identifier of the job to delete.
 * @param accessCode - The admin access code for authorization.
 * @returns Promise resolving to a success message or void.
 */
export const deleteJob = async (jobId: string, accessCode: string): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/jobs/${jobId}`, {
            headers: {
                'Authorization': `Bearer ${accessCode}`,
            },
        });
    } catch (error: any) {
        console.error(`Error deleting job with ID ${jobId}:`, error);
        throw new Error(error.response?.data?.message || 'Failed to delete job');
    }
};

/**
 * (Optional) Fetch all applications for a specific job (Admin Route).
 * 
 * @param jobId - The unique identifier of the job.
 * @param accessCode - The admin access code for authorization.
 * @returns Promise resolving to an array of Application objects.
 */
export const fetchApplicationsByJobId = async (jobId: string, accessCode: string): Promise<any[]> => {
    try {
        const res: AxiosResponse<any[]> = await axios.get(`${API_BASE_URL}/jobs/${jobId}/applications`, {
            headers: {
                'Authorization': `Bearer ${accessCode}`,
            },
        });
        return res.data;
    } catch (error: any) {
        console.error(`Error fetching applications for job ID ${jobId}:`, error);
        throw new Error(error.response?.data?.message || 'Failed to fetch applications');
    }
};

/**
 * (Optional) Delete an application by its ID (Admin Route).
 * 
 * @param applicationId - The unique identifier of the application to delete.
 * @param accessCode - The admin access code for authorization.
 * @returns Promise resolving to a success message or void.
 */
export const deleteApplication = async (applicationId: string, accessCode: string): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/applications/${applicationId}`, {
            headers: {
                'Authorization': `Bearer ${accessCode}`,
            },
        });
    } catch (error: any) {
        console.error(`Error deleting application with ID ${applicationId}:`, error);
        throw new Error(error.response?.data?.message || 'Failed to delete application');
    }
};

/**
 * Verify Admin Access Code
 * 
 * @param accessCode - The access code to verify
 * @returns Promise resolving to the verification result
 */
export const verifyAccessCode = async (accessCode: string): Promise<{ message: string }> => {
    try {
        const res: AxiosResponse<{ message: string }> = await axios.post(`${API_BASE_URL}/verify-access-code`, { accessCode });
        return res.data;
    } catch (error: any) {
        console.error('Error verifying access code:', error);
        throw new Error(error.response?.data?.message || 'Failed to verify access code.');
    }
};

