import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/common/Layout';
import JobDetail from '../../components/JobDetail/JobDetail';
import { Job } from '../../types';
import { fetchJobById } from '../../utils/api';

interface JobPageProps {
    job: Job;
}

const JobPage: React.FC<JobPageProps> = ({ job }) => {
    return (
        <Layout>
            <JobDetail job={job} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<JobPageProps> = async (context) => {
    const { id } = context.params!;

    try {
        const job = await fetchJobById(id as string);

        return {
            props: {
                job,
            },
        };
    } catch (error) {
        console.error(`Error fetching job with ID ${id}:`, error);

        return {
            notFound: true,
        };
    }
};

export default JobPage;
