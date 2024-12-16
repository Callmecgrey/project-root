// src/components/JobLanding/JobCard.tsx

import React from 'react';
import Link from 'next/link';
import { Job } from '../../types';
import Button from '../ui/Button';
import Card from '../ui/Card';
import CardContent from '../ui/CardContent';

interface JobCardProps {
    job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    return (
        <Card variant="shadow" className="hover:shadow-xl transition-shadow">
            <CardContent className="flex flex-col h-full">
                <div className="flex-grow">
                    <h3 className="text-2xl font-semibold mb-3 text-blue-700">{job.title}</h3>
                    <p className="text-gray-600 mb-3">{job.department} | {job.location}</p>
                    <p className="text-sm text-gray-500 mb-6">{job.type}</p>
                </div>
                <Button variant="outline" className="self-start hover:bg-blue-600 hover:text-white transition-colors" asChild>
                    <Link href={`/jobs/${job.id}`}>Apply Now</Link>
                </Button>
            </CardContent>
        </Card>
    );
};

export default JobCard;
