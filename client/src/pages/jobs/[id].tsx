import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/common/Layout';
import JobDetail from '../../components/JobDetail/JobDetail';
import { Job } from '../../types';

interface JobPageProps {
    job: Job;
}

const JobPage: React.FC<JobPageProps> = ({ job }) => {
    return (
        <Layout>
            <JobDetail job={job} />
        </Layout>
    );
};

export const getServerSideProps = async (context: any) => {
    const { id } = context.params;

    // Fetch job data by ID from the server API or a local JSON file
    const res = await fetch(`http://localhost:3000/api/jobs/${id}`);
    const job: Job = await res.json();

    return {
        props: {
            job,
        },
    };
};

export default JobPage;
