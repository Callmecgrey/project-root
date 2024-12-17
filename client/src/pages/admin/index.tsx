// src/pages/admin/index.tsx

import React from 'react';
import Layout from '../../components/common/Layout';
import AdminDashboard from '../../components/Admin/AdminDashboard';
import Head from 'next/head';
import withAdminAuth from '../../hoc/withAdminAuth';

const AdminPage: React.FC = () => {
    return (
        <Layout>
            <Head>
                <title>Admin Dashboard | Elite Residences</title>
            </Head>
            <div className="max-w-5xl mx-auto px-4 py-8">
                <AdminDashboard />
            </div>
        </Layout>
    );
};

export default withAdminAuth(AdminPage);
