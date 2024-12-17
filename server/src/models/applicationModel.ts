// src/models/applicationModel.ts

export interface Application {
    id: string;
    jobId: string; // Reference to the Job ID
    applicantName: string;
    applicantEmail: string;
    coverLetter?: string;
    resumeUrl: string; // URL to the uploaded resume in Cloudflare R2
    appliedAt: string; // ISO date string
}
