// server/src/models/jobModel.ts
export interface Job {
    id: string;
    title: string;
    company: string;
    description: string;
    requirements: string[];
    // Add more fields as needed
}
