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

interface HomeProps {
    jobs: Job[];
}

const Home: React.FC<HomeProps> = ({ jobs }) => {
    return (
        <Layout>
            <Hero />
            <CompanyOverview />
            <JobListings jobs={jobs} />
            <Testimonial />
            <CallToAction />
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const res = await fetch('http://localhost:5009/api/jobs');
    if (!res.ok) {
        throw new Error('Failed to fetch jobs');
    }
    const jobs: Job[] = await res.json();

    return {
        props: {
            jobs,
        },
        revalidate: 10,
    };
};

export default Home;
