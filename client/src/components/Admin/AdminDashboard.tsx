import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { Edit, Trash2, RefreshCw } from 'lucide-react';
import { Job } from '../../types';
import LogoutButton from './LogoutButton';
import Modal from '../common/Modal'; // Import Modal
import { fetchJobs, deleteJob } from '../../utils/api';
import { AuthContext } from '../../contexts/AuthContext';
import UpdateJobForm from './UpdateJobForm';

const AdminDashboard: React.FC = () => {
    const { accessCode } = useContext(AuthContext);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showLoader, setShowLoader] = useState<boolean>(false); // Delayed loader state
    const [error, setError] = useState<string | null>(null);

    const [deleteJobId, setDeleteJobId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const [updateJob, setUpdateJob] = useState<Job | null>(null);

    const loadJobs = async () => {
        setLoading(true);
        setShowLoader(false);
        setError(null);

        // Delay spinner display for 500ms
        const delayTimeout = setTimeout(() => {
            setShowLoader(true);
        }, 500);

        try {
            const data: Job[] = await fetchJobs();
            setJobs(data);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            clearTimeout(delayTimeout); // Clear timeout if data loads quickly
            setLoading(false);
            setShowLoader(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteJobId || !accessCode) return;

        setIsDeleting(true);
        setDeleteError(null);

        try {
            await deleteJob(deleteJobId, accessCode);
            setJobs(jobs.filter(job => job.id !== deleteJobId));
            setDeleteJobId(null);
        } catch (err: any) {
            setDeleteError(err.message || 'Failed to delete job.');
        } finally {
            setIsDeleting(false);
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
            {loading && showLoader ? (
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
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : jobs.length === 0 ? (
                <p className="text-gray-700">No jobs found. Start by posting a new job.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow rounded-lg">
                        <thead>
                            <tr>
                                <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase">Title</th>
                                <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase">Company</th>
                                <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-700 uppercase">Location</th>
                                <th className="py-3 px-6 bg-gray-100 text-center text-xs font-medium text-gray-700 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map(job => (
                                <tr key={job.id} className="border-b hover:bg-gray-50">
                                    <td className="py-4 px-6">{job.title}</td>
                                    <td className="py-4 px-6">{job.company}</td>
                                    <td className="py-4 px-6">{job.location}</td>
                                    <td className="py-4 px-6 text-center space-x-4">
                                        <button
                                            onClick={() => setUpdateJob(job)}
                                            className="text-blue-500 hover:text-blue-700 flex items-center space-x-1"
                                        >
                                            <Edit className="w-4 h-4" />
                                            <span>Update</span>
                                        </button>
                                        <button
                                            onClick={() => setDeleteJobId(job.id)}
                                            className="text-red-500 hover:text-red-700 flex items-center space-x-1"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            <span>Delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <Modal isOpen={!!deleteJobId} onClose={() => setDeleteJobId(null)} title="Confirm Deletion">
                <p>Are you sure you want to delete this job? This action cannot be undone.</p>
                {deleteError && <p className="text-red-500">{deleteError}</p>}
                <div className="flex justify-end mt-4 space-x-2">
                    <button onClick={() => setDeleteJobId(null)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </Modal>

            {/* Update Job Modal */}
            <Modal isOpen={!!updateJob} onClose={() => setUpdateJob(null)} title="Update Job">
                {updateJob && <UpdateJobForm job={updateJob} />}
            </Modal>
        </div>
    );
};

export default AdminDashboard;
