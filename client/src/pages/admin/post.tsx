// src/pages/admin/post.tsx

import React from 'react';
import Layout from '../../components/common/Layout';
import PostJobForm from '../../components/Admin/PostJobForm';
import Head from 'next/head';
import withAdminAuth from '../../hoc/withAdminAuth';

const PostJob: React.FC = () => {
    return (
        <Layout>
            <Head>
                <title>Post a New Job | Admin Dashboard</title>
            </Head>
            <div className="max-w-3xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-green-600">
                    Post a New Job
                </h1>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <PostJobForm />
                </div>
            </div>
        </Layout>
    );
};

export default withAdminAuth(PostJob);
