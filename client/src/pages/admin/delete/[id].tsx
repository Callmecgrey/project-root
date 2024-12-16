// src/pages/admin/jobs/[id]/delete.tsx

import React from 'react';
import Layout from '../../../components/common/Layout';
import DeleteJobButton from '../../../components/Admin/DeleteJobButton';
import { GetServerSideProps } from 'next';
import { Job } from '../../../types';
import Head from 'next/head';

interface DeleteJobPageProps {
    job: Job;
}

const DeleteJobPage: React.FC<DeleteJobPageProps> = ({ job }) => {
    return (
        <Layout>
            <Head>
                <title>Delete Job - {job.title} | Admin Dashboard</title>
            </Head>
            <div className="max-w-3xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-red-600">
                    Delete Job
                </h1>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">
                        Are you sure you want to delete the job "{job.title}"?
                    </h2>
                    <p className="text-gray-700 mb-6">
                        This action cannot be undone. The job posting will be permanently removed from the platform.
                    </p>
                    <DeleteJobButton jobId={job.id} />
                </div>
            </div>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${id}`);

        if (!res.ok) {
            return {
                notFound: true,
            };
        }

        const job: Job = await res.json();

        return {
            props: {
                job,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            notFound: true,
        };
    }
};

export default DeleteJobPage;
