// src/services/cloudflareServices.ts

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
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
     * Upload an image to Cloudflare R2.
     * @param file - The image file uploaded via multer.
     * @returns URL of the uploaded image.
     */
    uploadImage: async (file: Express.Multer.File): Promise<string> => {
        if (!file) {
            throw new Error('No file provided.');
        }

        const objectKey = `images/${Date.now()}-${file.originalname}`;

        const uploadParams = {
            Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
            Key: objectKey,
            Body: Readable.from(file.buffer),
            ContentType: file.mimetype,
        };

        try {
            await s3Client.send(new PutObjectCommand(uploadParams));
            return `${process.env.CLOUDFLARE_R2_ENDPOINT}/${process.env.CLOUDFLARE_R2_BUCKET_NAME}/${objectKey}`;
        } catch (error: any) {
            console.error('Error uploading image:', error);
            throw new Error('Failed to upload image.');
        }
    },

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

        const uploadParams = {
            Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
            Key: objectKey,
            Body: Readable.from(file.buffer),
            ContentType: file.mimetype,
        };

        try {
            await s3Client.send(new PutObjectCommand(uploadParams));
            return `${process.env.CLOUDFLARE_R2_BUCKET_NAME}.r2.cloudflarestorage.com/${objectKey}`;
        } catch (error: any) {
            console.error('Error uploading resume:', error);
            throw new Error('Failed to upload resume.');
        }
    },
};

export default cloudflareService;
