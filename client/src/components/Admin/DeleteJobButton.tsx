// src/components/Admin/DeleteJobButton.tsx

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Trash2 } from 'lucide-react';
import classNames from 'classnames';
import { deleteJob } from '../../utils/api';
import { AuthContext } from '../../contexts/AuthContext';

interface DeleteJobButtonProps {
    jobId: string;
}

const DeleteJobButton: React.FC<DeleteJobButtonProps> = ({ jobId }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { accessCode } = useContext(AuthContext); // Retrieve accessCode from context

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this job? This action cannot be undone.');

        if (!confirmed) return;

        if (!accessCode) {
            setError('You are not authorized to perform this action. Please log in again.');
            return;
        }

        setIsDeleting(true);
        setError(null);

        try {
            await deleteJob(jobId, accessCode); // Pass accessCode to deleteJob

            // Optionally, show a success message
            alert('Job deleted successfully.');

            // Redirect to admin dashboard
            router.push('/admin');
        } catch (err: any) {
            console.error('Delete Job Error:', err);
            setError(err.message || 'An unexpected error occurred while deleting the job.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div>
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={classNames(
                    'flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-200',
                    { 'opacity-50 cursor-not-allowed': isDeleting }
                )}
            >
                <Trash2 className="w-5 h-5" />
                <span>Delete Job</span>
            </button>
            {isDeleting && <p className="mt-2 text-sm text-gray-700">Deleting...</p>}
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default DeleteJobButton;
