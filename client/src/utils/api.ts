// src/utils/api.ts

/**
 * API Utility Functions for Job Landing Page Application
 * 
 * This file contains all the necessary functions to interact with the backend server's API endpoints.
 * It includes both public and admin routes, handling data fetching, submissions, and administrative actions.
 */

import axios, { AxiosResponse } from 'axios';
import useAuth from '../hooks/useAuth';

// Base URL configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5009/api';

/**
 * Custom Axios instance to include Authorization header when access code is available.
 */
const useAxios = () => {
    const { accessCode } = useAuth();

    const instance = axios.create({
        baseURL: API_BASE_URL,
    });

    // Add a request interceptor to include the Authorization header
    instance.interceptors.request.use(
        (config) => {
            if (accessCode) {
                config.headers['Authorization'] = `Bearer ${accessCode}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return instance;
};

/**
 * Fetch all job listings.
 * 
 * @returns Promise resolving to an array of Job objects.
 */
export const fetchJobs = async (): Promise<any[]> => {
    try {
        const axiosInstance = useAxios();
        const res: AxiosResponse<any[]> = await axiosInstance.get('/jobs');
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
        const axiosInstance = useAxios();
        const res: AxiosResponse<any> = await axiosInstance.get(`/jobs/${jobId}`);
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
}): Promise<any> => {
    try {
        const axiosInstance = useAxios();
        const res: AxiosResponse<any> = await axiosInstance.post('/jobs', jobData);
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
    }>
): Promise<any> => {
    try {
        const axiosInstance = useAxios();
        const res: AxiosResponse<any> = await axiosInstance.put(`/jobs/${jobId}`, updatedData);
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
 * @returns Promise resolving to a success message or void.
 */
export const deleteJob = async (jobId: string): Promise<void> => {
    try {
        const axiosInstance = useAxios();
        await axiosInstance.delete(`/jobs/${jobId}`);
    } catch (error: any) {
        console.error(`Error deleting job with ID ${jobId}:`, error);
        throw new Error(error.response?.data?.message || 'Failed to delete job');
    }
};

/**
 * (Optional) Fetch all applications for a specific job (Admin Route).
 * 
 * @param jobId - The unique identifier of the job.
 * @returns Promise resolving to an array of Application objects.
 */
export const fetchApplicationsByJobId = async (jobId: string): Promise<any[]> => {
    try {
        const axiosInstance = useAxios();
        const res: AxiosResponse<any[]> = await axiosInstance.get(`/jobs/${jobId}/applications`);
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
 * @returns Promise resolving to a success message or void.
 */
export const deleteApplication = async (applicationId: string): Promise<void> => {
    try {
        const axiosInstance = useAxios();
        await axiosInstance.delete(`/applications/${applicationId}`);
    } catch (error: any) {
        console.error(`Error deleting application with ID ${applicationId}:`, error);
        throw new Error(error.response?.data?.message || 'Failed to delete application');
    }
};
