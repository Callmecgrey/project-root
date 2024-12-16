// server/src/services/cloudflareServices.ts

import { R2 } from 'cloudflare'; // Assuming you have a Cloudflare SDK
import { Readable } from 'stream';

// Initialize Cloudflare R2 client
const cloudflare = new R2({
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
    bucketName: process.env.CLOUDFLARE_R2_BUCKET_NAME,
});

const cloudflareService = {
    uploadImage: async (file: Express.Multer.File): Promise<string> => {
        if (!file) {
            throw new Error('No file provided');
        }

        const fileStream = Readable.from(file.buffer);
        const objectKey = `images/${Date.now()}-${file.originalname}`;

        await cloudflare.put(objectKey, fileStream, {
            'Content-Type': file.mimetype,
        });

        return `https://${process.env.CLOUDFLARE_R2_BUCKET_NAME}.r2.cloudflarestorage.com/${objectKey}`;
    },
};

export default cloudflareService;
