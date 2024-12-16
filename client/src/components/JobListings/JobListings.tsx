// src/components/JobListings/JobListings.tsx

import React from 'react';
import JobList from '../JobLanding/JobList';
import { Job } from '../../types';

interface JobListingsProps {
    jobs: Job[];
}

const JobListings: React.FC<JobListingsProps> = ({ jobs }) => {
    return (
        <section id="openings" className="py-24 bg-gray-100  text-blue-800">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16">Open Positions</h2>
                <JobList jobs={jobs} />
            </div>
        </section>
    );
};

export default JobListings;
