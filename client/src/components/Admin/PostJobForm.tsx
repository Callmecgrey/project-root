// src/components/Admin/PostJobForm.tsx

import React, { useState, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Job } from '../../types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Button from '../ui/Button';
import { useRouter } from 'next/router';
import { createJob } from '../../utils/api';
import { AuthContext } from '../../contexts/AuthContext';

interface FormInputs {
    title: string;
    company: string;
    description: string;
    requirements: string;
    responsibilities: string;
    department: string;
    location: string;
    type: string;
    salary?: string;
    benefits?: string;
    mapUrl?: string;
    // Removed companyLogo from FormInputs as it's no longer editable
}

const DEFAULT_COMPANY_LOGO_URL = 'https://storage.eliteresidences.cloud/bintu.png';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Job title is required'),
    company: Yup.string().required('Company name is required'),
    description: Yup.string().required('Description is required'),
    requirements: Yup.string().required('Requirements are required'),
    responsibilities: Yup.string().required('Responsibilities are required'),
    department: Yup.string().required('Department is required'),
    location: Yup.string().required('Location is required'),
    type: Yup.string().required('Job type is required'),
    salary: Yup.string(),
    benefits: Yup.string(),
    mapUrl: Yup.string().url('Must be a valid URL'),
    // Removed companyLogo validation
});

const PostJobForm: React.FC = () => {
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);
    const { accessCode } = useContext(AuthContext); // Retrieve access code from context

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormInputs>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setServerError(null);
        try {
            if (!accessCode) {
                throw new Error('Unauthorized access. Please log in again.');
            }

            const jobData = {
                title: data.title,
                company: data.company,
                description: data.description,
                requirements: data.requirements.split(',').map(req => req.trim()),
                responsibilities: data.responsibilities.split(',').map(resp => resp.trim()),
                department: data.department,
                location: data.location,
                type: data.type,
                salary: data.salary || '',
                benefits: data.benefits ? data.benefits.split(',').map(ben => ben.trim()) : [],
                mapUrl: data.mapUrl || '',
                companyLogo: DEFAULT_COMPANY_LOGO_URL, // Set to default URL
            };

            const createdJob: Job = await createJob(jobData, accessCode); // Now passing two arguments
            alert('Job posted successfully.');
            reset();
            router.push('/admin'); // Redirect to admin dashboard
        } catch (err: any) {
            setServerError(err.message || 'An unexpected error occurred.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Job Title */}
            <div>
                <label htmlFor="title" className="block text-gray-700">
                    Job Title
                </label>
                <input
                    id="title"
                    type="text"
                    {...register('title')}
                    className={`mt-1 block w-full rounded-md border ${
                        errors.title ? 'border-red-500' : 'border-gray-300'
                    } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                    placeholder="Job Title"
                />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.title.message}
                    </p>
                )}
            </div>

            {/* Company */}
            <div>
                <label htmlFor="company" className="block text-gray-700">
                    Company
                </label>
                <input
                    id="company"
                    type="text"
                    {...register('company')}
                    className={`mt-1 block w-full rounded-md border ${
                        errors.company ? 'border-red-500' : 'border-gray-300'
                    } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                    placeholder="Company Name"
                />
                {errors.company && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.company.message}
                    </p>
                )}
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className="block text-gray-700">
                    Description
                </label>
                <textarea
                    id="description"
                    {...register('description')}
                    className={`mt-1 block w-full rounded-md border ${
                        errors.description
                            ? 'border-red-500'
                            : 'border-gray-300'
                    } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                    rows={5}
                    placeholder="Job Description"
                ></textarea>
                {errors.description && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.description.message}
                    </p>
                )}
            </div>

            {/* Requirements */}
            <div>
                <label
                    htmlFor="requirements"
                    className="block text-gray-700"
                >
                    Requirements (comma separated)
                </label>
                <input
                    id="requirements"
                    type="text"
                    {...register('requirements')}
                    className={`mt-1 block w-full rounded-md border ${
                        errors.requirements
                            ? 'border-red-500'
                            : 'border-gray-300'
                    } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                    placeholder="e.g., React, Node.js, MongoDB"
                />
                {errors.requirements && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.requirements.message}
                    </p>
                )}
            </div>

            {/* Responsibilities */}
            <div>
                <label
                    htmlFor="responsibilities"
                    className="block text-gray-700"
                >
                    Responsibilities (comma separated)
                </label>
                <input
                    id="responsibilities"
                    type="text"
                    {...register('responsibilities')}
                    className={`mt-1 block w-full rounded-md border ${
                        errors.responsibilities
                            ? 'border-red-500'
                            : 'border-gray-300'
                    } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                    placeholder="e.g., Develop features, Collaborate with team"
                />
                {errors.responsibilities && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.responsibilities.message}
                    </p>
                )}
            </div>

            {/* Department */}
            <div>
                <label htmlFor="department" className="block text-gray-700">
                    Department
                </label>
                <input
                    id="department"
                    type="text"
                    {...register('department')}
                    className={`mt-1 block w-full rounded-md border ${
                        errors.department
                            ? 'border-red-500'
                            : 'border-gray-300'
                    } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                    placeholder="e.g., Engineering, Marketing"
                />
                {errors.department && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.department.message}
                    </p>
                )}
            </div>

            {/* Location */}
            <div>
                <label htmlFor="location" className="block text-gray-700">
                    Location
                </label>
                <input
                    id="location"
                    type="text"
                    {...register('location')}
                    className={`mt-1 block w-full rounded-md border ${
                        errors.location
                            ? 'border-red-500'
                            : 'border-gray-300'
                    } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                    placeholder="e.g., New York, Remote"
                />
                {errors.location && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.location.message}
                    </p>
                )}
            </div>

            {/* Job Type */}
            <div>
                <label htmlFor="type" className="block text-gray-700">
                    Job Type
                </label>
                <select
                    id="type"
                    {...register('type')}
                    className={`mt-1 block w-full rounded-md border ${
                        errors.type ? 'border-red-500' : 'border-gray-300'
                    } bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                >
                    <option value="">Select Type</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                </select>
                {errors.type && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.type.message}
                    </p>
                )}
            </div>

            {/* Salary */}
            <div>
                <label htmlFor="salary" className="block text-gray-700">
                    Salary
                </label>
                <input
                    id="salary"
                    type="text"
                    {...register('salary')}
                    className={`mt-1 block w-full rounded-md border ${
                        errors.salary
                            ? 'border-red-500'
                            : 'border-gray-300'
                    } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                    placeholder="e.g., $80,000 - $100,000"
                />
                {errors.salary && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.salary.message}
                    </p>
                )}
            </div>

            {/* Benefits */}
            <div>
                <label htmlFor="benefits" className="block text-gray-700">
                    Benefits (comma separated)
                </label>
                <input
                    id="benefits"
                    type="text"
                    {...register('benefits')}
                    className={`mt-1 block w-full rounded-md border ${
                        errors.benefits
                            ? 'border-red-500'
                            : 'border-gray-300'
                    } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                    placeholder="e.g., Health Insurance, 401k"
                />
                {errors.benefits && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.benefits.message}
                    </p>
                )}
            </div>

            {/* Map URL */}
            <div>
                <label htmlFor="mapUrl" className="block text-gray-700">
                    Map URL
                </label>
                <input
                    id="mapUrl"
                    type="url"
                    {...register('mapUrl')}
                    className={`mt-1 block w-full rounded-md border ${
                        errors.mapUrl
                            ? 'border-red-500'
                            : 'border-gray-300'
                    } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                    placeholder="https://maps.google.com/..."
                />
                {errors.mapUrl && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.mapUrl.message}
                    </p>
                )}
            </div>

            {/* Server Error */}
            {serverError && (
                <p className="text-red-500 text-sm">{serverError}</p>
            )}

            {/* Submit Button */}
            <div>
                <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Posting...' : 'Post Job'}
                </Button>
            </div>
        </form>
    );
};

export default PostJobForm;
