// src/pages/index.tsx

import React from 'react';
import Layout from '../components/common/Layout';
import Hero from '../components/Hero/Hero';
import CompanyOverview from '../components/CompanyOverview/CompanyOverview';
import JobListings from '../components/JobListings/JobListings';
import Testimonial from '../components/Testimonial/Testimonial';
import CallToAction from '../components/CallToAction/CallToAction';
import { GetStaticProps } from 'next';
import { Job } from '../types';
import { fetchJobs } from '../utils/api'; // Import fetchJobs

interface HomeProps {
    jobs: Job[];
    error?: string; // Optional error message
}

const Home: React.FC<HomeProps> = ({ jobs, error }) => {
    return (
        <Layout>
            <Hero />
            <CompanyOverview />
            {error ? (
                <div className="error">Failed to load job listings. Please try again later.</div>
            ) : (
                <JobListings jobs={jobs} />
            )}
            <Testimonial />
            <CallToAction />
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    try {
        const jobs: Job[] = await fetchJobs(); // Use fetchJobs

        return {
            props: {
                jobs,
            },
            revalidate: 10, // Revalidate at most once every 10 seconds
        };
    } catch (error: any) {
        console.error('Error in getStaticProps:', error);

        // Return an empty jobs array and an error message
        return {
            props: {
                jobs: [],
                error: error.message || 'Failed to fetch jobs',
            },
            revalidate: 10,
        };
    }
};

export default Home;
