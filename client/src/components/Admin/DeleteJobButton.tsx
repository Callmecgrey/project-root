import React from 'react';

interface DeleteJobButtonProps {
    jobId: string;
}

const DeleteJobButton: React.FC<DeleteJobButtonProps> = ({ jobId }) => {
    const handleDelete = () => {
        // Handle job deletion
        console.log(`Delete job with ID: ${jobId}`);
    };

    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
        >
            Delete Job
        </button>
    );
};

export default DeleteJobButton;
