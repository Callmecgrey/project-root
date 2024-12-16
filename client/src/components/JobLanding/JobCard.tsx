// src/components/JobLanding/JobCard.tsx

import React from 'react';
import Link from 'next/link';
import { Job } from '../../types';
import Button  from "../ui/Button";

interface JobCardProps {
    job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    return (
        <div className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <div className="p-8 flex flex-col h-full">
                <div className="flex-grow">
                    <h3 className="text-2xl font-semibold mb-3 text-blue-700">{job.title}</h3>
                    <p className="text-gray-600 mb-3">{job.department} | {job.location}</p>
                    <p className="text-sm text-gray-500 mb-6">{job.type}</p>
                </div>
                <Button variant="outline" className="self-start hover:bg-blue-600 hover:text-white transition-colors">
                    <Link href={`/jobs/${job.id}`}>Apply Now</Link>
                </Button>
            </div>
        </div>
    );
};

export default JobCard;
