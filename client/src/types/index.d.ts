// src/types/index.ts

export interface Job {
    id: string;
    title: string;
    company: string;
    companyLogo?: string; // Optional, as some jobs might not have a logo
    responsibilities: string[]; // Changed from string to string[] for multiple points
    description: string;
    department: string;
    location: string;
    type: string; // e.g., Full-Time, Part-Time, Contract
    mapUrl?: string; // Renamed from 'map' for clarity
    requirements: string[];
    salary?: string; // Optional field for salary information
    benefits?: string[]; // Optional, list of benefits
    // Add more fields as needed
}
