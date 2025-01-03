// src/models/jobModel.ts

export interface Job {
    id: string;
    title: string;
    company: string;
    companyLogo?: string; // URL to the company logo
    description: string;
    responsibilities: string[];
    department: string;
    location: string;
    type: string;
    requirements: string[];
    salary?: string;
    benefits?: string[];
    mapUrl?: string; // URL to the job location on a map
}
