import React from 'react';
import Layout from '../../components/common/Layout';
import ApplyForm from '../../components/Apply/ApplyForm';
import { GetServerSideProps } from 'next';
import { Job } from '../../types';
import { fetchJobById } from '../../utils/api';

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
                <ApplyForm jobId={job.id} />
            </div>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;

    try {
        const job = await fetchJobById(id as string);
        return {
            props: {
                job,
            },
        };
    } catch (error) {
        console.error(`Error fetching job: ${error}`);
        return {
            notFound: true,
        };
    }
};

export default ApplyPage;
