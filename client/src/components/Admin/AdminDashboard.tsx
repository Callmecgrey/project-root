// src/components/Admin/AdminDashboard.tsx

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, RefreshCw } from 'lucide-react';
import { Job } from '../../types';
import classNames from 'classnames';
import LogoutButton from './LogoutButton';
import { fetchJobs } from '../../utils/api';

const AdminDashboard: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadJobs = async () => {
        setLoading(true);
        setError(null);
        try {
            const data: Job[] = await fetchJobs();
            setJobs(data);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadJobs();
    }, []);

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-700">Manage Jobs</h2>
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                    <Link href="/admin/post" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center space-x-2">
                        <span>Post New Job</span>
                    </Link>
                    <button
                        onClick={loadJobs}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center space-x-1"
                    >
                        <RefreshCw className="w-4 h-4" />
                        <span>Refresh</span>
                    </button>
                    <LogoutButton />
                </div>
            </div>

            {/* Content Section */}
            {loading ? (
                <div className="flex justify-center items-center">
                    <svg
                        className="animate-spin h-8 w-8 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                    </svg>
                    <span className="ml-2 text-gray-700">Loading jobs...</span>
                </div>
            ) : (
                <>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center">
                            <span className="block sm:inline">{error}</span>
                            <button
                                onClick={loadJobs}
                                className="ml-auto bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center space-x-1"
                            >
                                <RefreshCw className="w-4 h-4" />
                                <span>Retry</span>
                            </button>
                        </div>
                    )}

                    {jobs.length === 0 ? (
                        <p className="text-gray-700">No jobs found. Start by posting a new job.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white shadow rounded-lg">
                                <thead>
                                    <tr>
                                        <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Company
                                        </th>
                                        <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Location
                                        </th>
                                        <th className="py-3 px-6 bg-gray-100 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobs.map(job => (
                                        <tr key={job.id} className="border-b hover:bg-gray-50">
                                            <td className="py-4 px-6">{job.title}</td>
                                            <td className="py-4 px-6">{job.company}</td>
                                            <td className="py-4 px-6">{job.location}</td>
                                            <td className="py-4 px-6 text-center space-x-4">
                                                <Link href={`/admin/jobs/${job.id}/update`} className="text-blue-500 hover:text-blue-700 flex items-center space-x-1">
                                                    <Edit className="w-4 h-4" />
                                                    <span>Update</span>
                                                </Link>
                                                <Link href={`/admin/jobs/${job.id}/delete`} className="text-red-500 hover:text-red-700 flex items-center space-x-1">
                                                    <Trash2 className="w-4 h-4" />
                                                    <span>Delete</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    );

};

export default AdminDashboard;
