import React, { useState } from 'react';

const PostJobForm: React.FC = () => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        description: '',
        requirements: '',
        // Add more fields as needed
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission to post a new job
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
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                Post Job
            </button>
        </form>
    );
};

export default PostJobForm;
