import React from 'react';
import { Job } from '../../types';

interface JobDetailProps {
    job: Job;
}

const JobDetail: React.FC<JobDetailProps> = ({ job }) => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-gray-600">{job.company}</p>
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Job Description</h2>
                <p>{job.description}</p>
            </div>
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Requirements</h2>
                <ul className="list-disc list-inside">
                    {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                    ))}
                </ul>
            </div>
            <div className="mt-4">
                <a href={`/apply/${job.id}`} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Apply Now
                </a>
            </div>
        </div>
    );
};

export default JobDetail;
