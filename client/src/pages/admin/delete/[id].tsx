import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/common/Layout';
import DeleteJobButton from '../../../components/Admin/DeleteJobButton';
import { GetServerSideProps } from 'next';
import { Job } from '../../../types';

interface DeleteJobPageProps {
    job: Job;
}

const DeleteJobPage: React.FC<DeleteJobPageProps> = ({ job }) => {
    const router = useRouter();

    const handleDelete = () => {
        // Implement deletion logic
        console.log(`Deleting job with ID: ${job.id}`);
        // After deletion, redirect to admin dashboard
        router.push('/admin');
    };

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Delete Job</h1>
            <p>Are you sure you want to delete the job "{job.title}"?</p>
            <DeleteJobButton jobId={job.id} />
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

export default DeleteJobPage;
