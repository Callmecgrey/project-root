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
            <h1 className="text-2xl font-bold mb-4">Apply for {job.title}</h1>
            <ApplyForm />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;

    // Fetch job data by ID from the server API or a local JSON file
    const res = await fetch(`http://localhost:3000/api/jobs/${id}`);
    const job: Job = await res.json();

    return {
        props: {
            job,
        },
    };
};

export default ApplyPage;
