// src/services/cloudflareServices.ts

import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Initialize the S3 Client for Cloudflare R2
const s3Client = new S3Client({
    region: 'auto', // Cloudflare R2 uses 'auto' as the region
    endpoint: process.env.CLOUDFLARE_R2_ENDPOINT, // e.g., https://<account_id>.r2.cloudflarestorage.com
    credentials: {
        accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
        secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
    },
    forcePathStyle: true, // Required for Cloudflare R2
});

const cloudflareService = {
    /**
     * Upload a resume to Cloudflare R2.
     * @param file - The resume file uploaded via multer.
     * @returns URL of the uploaded resume.
     */
    uploadResume: async (file: Express.Multer.File): Promise<string> => {
        if (!file) {
            throw new Error('No file provided.');
        }

        const objectKey = `resumes/${Date.now()}-${file.originalname}`;

        try {
            const upload = new Upload({
                client: s3Client,
                params: {
                    Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
                    Key: objectKey,
                    Body: file.buffer, // Automatically calculates Content-Length
                    ContentType: file.mimetype,
                },
            });

            await upload.done();
            return `${process.env.CLOUDFLARE_R2_ENDPOINT}/${process.env.CLOUDFLARE_R2_BUCKET_NAME}/${objectKey}`;
        } catch (error: any) {
            console.error('Error uploading resume:', error);
            throw new Error('Failed to upload resume.');
        }
    },
};

export default cloudflareService;
