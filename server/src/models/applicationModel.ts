import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
    jobId: mongoose.Types.ObjectId; // Reference to the Job model
    applicantName: string;
    applicantEmail: string;
    coverLetter?: string;
    resumeUrl: string;
    appliedAt: Date;
}

const ApplicationSchema: Schema = new Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    applicantName: { type: String, required: true },
    applicantEmail: { type: String, required: true },
    coverLetter: { type: String },
    resumeUrl: { type: String, required: true },
    appliedAt: { type: Date, required: true, default: Date.now },
});

export default mongoose.model<IApplication>('Application', ApplicationSchema);
