import React from 'react';
import Layout from '../components/common/Layout';
import JobList from '../components/JobLanding/JobList';
import type { GetStaticProps } from 'next';
import { Job } from '../types';

interface HomeProps {
    jobs: Job[];
}

const Home: React.FC<HomeProps> = ({ jobs }) => {
    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-4">Available Jobs</h1>
            <JobList jobs={jobs} />
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    // Fetch jobs from the server API or a local JSON file
    const res = await fetch('http://localhost:5009/api/jobs'); // Ensure the correct server port
    if (!res.ok) {
        throw new Error('Failed to fetch jobs');
    }
    const jobs: Job[] = await res.json();

    return {
        props: {
            jobs,
        },
        revalidate: 10, // Optional: Revalidate at most once every 10 seconds
    };
};

export default Home;
