// src/pages/apply/[id].tsx

import React from 'react';
import Layout from '../../components/common/Layout';
import ApplyForm from '../../components/Apply/ApplyForm';
import { GetServerSideProps } from 'next';
import { Job } from '../../types';

interface ApplyPageProps {
    job: Job;
}

const ApplyPage: React.FC<ApplyPageProps> = ({ job }) => {
    return (
        <Layout>
            <div className="max-w-2xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Apply for <span className="text-blue-700">{job.title}</span>
                </h1>
                <ApplyForm />
            </div>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;

    // Fetch job data by ID from the server API or a local JSON file
    const res = await fetch(`http://localhost:5009/api/jobs/${id}`);
    const job: Job = await res.json();

    return {
        props: {
            job,
        },
    };
};

export default ApplyPage;
