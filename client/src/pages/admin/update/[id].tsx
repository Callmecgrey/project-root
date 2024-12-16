import React from 'react';
import Layout from '../../../components/common/Layout';
import UpdateJobForm from '../../../components/Admin/UpdateJobForm';
import { GetServerSideProps } from 'next';
import { Job } from '../../../types';

interface UpdateJobPageProps {
    job: Job;
}

const UpdateJobPage: React.FC<UpdateJobPageProps> = ({ job }) => {
    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Update Job</h1>
            <UpdateJobForm />
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

export default UpdateJobPage;
