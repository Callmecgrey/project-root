// src/pages/admin/update/[id].tsx

import React from 'react';
import Layout from '../../../components/common/Layout';
import UpdateJobForm from '../../../components/Admin/UpdateJobForm';
import { GetServerSideProps } from 'next';
import { Job } from '../../../types';
import Head from 'next/head';

interface UpdateJobPageProps {
    job: Job;
}

const UpdateJobPage: React.FC<UpdateJobPageProps> = ({ job }) => {
    return (
        <Layout>
            <Head>
                <title>Update Job - {job.title} | Admin Dashboard</title>
            </Head>
            <div className="max-w-3xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
                    Update Job
                </h1>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <UpdateJobForm job={job} />
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

export default UpdateJobPage;
