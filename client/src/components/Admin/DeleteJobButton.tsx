// src/components/Admin/DeleteJobButton.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Trash2 } from 'lucide-react';
import classNames from 'classnames';
import { deleteJob } from '../../utils/api';

interface DeleteJobButtonProps {
    jobId: string;
}

const DeleteJobButton: React.FC<DeleteJobButtonProps> = ({ jobId }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this job? This action cannot be undone.');

        if (!confirmed) return;

        setIsDeleting(true);
        setError(null);

        try {
            await deleteJob(jobId);
            // Optionally, show a success message
            alert('Job deleted successfully.');

            // Redirect to admin dashboard
            router.push('/admin');
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
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
                    'flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded',
                    { 'opacity-50 cursor-not-allowed': isDeleting }
                )}
            >
                <Trash2 className="w-5 h-5" />
                <span>Delete Job</span>
            </button>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default DeleteJobButton;
