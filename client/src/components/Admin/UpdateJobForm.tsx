import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const UpdateJobForm: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        description: '',
        requirements: '',
        // Add more fields as needed
    });

    useEffect(() => {
        if (id) {
            // Fetch the job data by ID and populate the form
            // Example:
            // fetch()
            //     .then(res => res.json())
            //     .then(data => setFormData(data));
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission to update the job
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="mb-4">
                <label className="block text-gray-700">Job Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border px-3 py-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Company</label>
                <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full border px-3 py-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border px-3 py-2"
                    rows={5}
                    required
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Requirements (comma separated)</label>
                <input
                    type="text"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    className="w-full border px-3 py-2"
                    required
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Update Job
            </button>
        </form>
    );
};

export default UpdateJobForm;
