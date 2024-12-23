import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
    title: string;
    company: string;
    companyLogo?: string;
    description: string;
    responsibilities: string[];
    department: string;
    location: string;
    type: string;
    requirements: string[];
    salary?: string;
    benefits?: string[];
    mapUrl?: string;
}

const JobSchema: Schema = new Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    companyLogo: { type: String },
    description: { type: String, required: true },
    responsibilities: { type: [String], required: true },
    department: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    requirements: { type: [String], required: true },
    salary: { type: String },
    benefits: { type: [String] },
    mapUrl: { type: String },
});

export default mongoose.model<IJob>('Job', JobSchema);
