import React, { useState } from 'react';

const ApplyForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        resume: null as File | null,
        coverLetter: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, files } = e.target;
        if (name === 'resume' && files) {
            setFormData(prev => ({ ...prev, resume: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border px-3 py-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border px-3 py-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Resume</label>
                <input
                    type="file"
                    name="resume"
                    onChange={handleChange}
                    className="w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Cover Letter</label>
                <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    className="w-full border px-3 py-2"
                    rows={5}
                    required
                ></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Submit Application
            </button>
        </form>
    );
};

export default ApplyForm;
