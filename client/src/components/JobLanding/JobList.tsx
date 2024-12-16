// src/components/JobLanding/JobList.tsx

import React from 'react';
import JobCard from './JobCard';
import { Job } from '../../types';

interface JobListProps {
    jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {jobs.map(job => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    );
};

export default JobList;
