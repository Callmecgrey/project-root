// server/src/models/jobModel.ts

export interface Job {
    id: string;
    title: string;
    company: string;
    companyLogo?: string; // Optional, as some jobs might not have a logo
    responsibilities: string[]; // Multiple responsibilities
    description: string;
    department: string;
    location: string;
    type: string; // e.g., Full-Time, Part-Time, Contract
    mapUrl?: string; // URL for the location map
    requirements: string[];
    salary?: string; // Optional salary information
    benefits?: string[]; // Optional list of benefits
}
