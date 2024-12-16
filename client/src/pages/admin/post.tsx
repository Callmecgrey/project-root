import React from 'react';
import Layout from '../../components/common/Layout';
import PostJobForm from '../../components/Admin/PostJobForm';

const PostJob: React.FC = () => {
    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Post a New Job</h1>
            <PostJobForm />
        </Layout>
    );
};

export default PostJob;
