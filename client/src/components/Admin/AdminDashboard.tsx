import React from 'react';
import Link from 'next/link';

const AdminDashboard: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="space-y-2">
                <Link href="/admin/post" className="block bg-green-500 text-white px-4 py-2 rounded">
                    Post a New Job
                </Link>
                <Link href="/admin" className="block bg-blue-500 text-white px-4 py-2 rounded">
                    Manage Jobs
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
