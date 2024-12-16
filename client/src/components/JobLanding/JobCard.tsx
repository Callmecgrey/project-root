import React from 'react';
import Link from 'next/link';
import { Job } from '../../types';

interface JobCardProps {
    job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    return (
        <div className="border rounded p-4 shadow">
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
            <Link href={`/jobs/${job.id}`} className="text-blue-500 mt-2 inline-block">
                View Details
            </Link>
        </div>
    );
};

export default JobCard;
