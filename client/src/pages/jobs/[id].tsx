// src/pages/jobs/[id].tsx

import React from 'react';
import { GetServerSideProps } from 'next';
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

export const getServerSideProps: GetServerSideProps<JobPageProps> = async (context) => {
    const { id } = context.params!;

    // Use environment variables for the API base URL
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5009';

    try {
        const res = await fetch(`${API_BASE_URL}/api/jobs/${id}`);

        if (!res.ok) {
            // Handle HTTP errors
            if (res.status === 404) {
                return {
                    notFound: true,
                };
            }
            throw new Error(`Failed to fetch job with id ${id}`);
        }

        const job: Job = await res.json();

        return {
            props: {
                job,
            },
            // Optionally, you can add revalidation if using getStaticProps
            // revalidate: 10,
        };
    } catch (error) {
        console.error(error);
        // You can choose to redirect to an error page or handle it as needed
        return {
            notFound: true,
        };
    }
};

export default JobPage;
