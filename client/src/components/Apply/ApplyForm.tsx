import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Button from '../ui/Button';
import { useRouter } from 'next/router';
import { submitApplication } from '../../utils/api';

interface FormData {
    name: string;
    email: string;
    resume: FileList;
    coverLetter: string;
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    resume: Yup.mixed<FileList>()
        .required('Resume is required')
        .test(
            'fileSize',
            'File size is too large (Max 5MB)',
            value => value && value.length > 0 && value[0].size <= 5 * 1024 * 1024
        )
        .test(
            'fileType',
            'Only PDF, DOC, and DOCX files are allowed',
            value => value && value.length > 0 && ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value[0].type)
        ),
    coverLetter: Yup.string().required('Cover Letter is required'),
});

const ApplyForm: React.FC<{ jobId: string }> = ({ jobId }) => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data: FormData) => {
        try {
            const formData = {
                applicantName: data.name,
                applicantEmail: data.email,
                coverLetter: data.coverLetter,
                resume: data.resume[0],
            };

            await submitApplication(jobId, formData);

            alert('Application submitted successfully!');
            router.push('/');
        } catch (error: any) {
            console.error('Error submitting application:', error.message);
            alert(`Failed to submit application: ${error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-gray-700">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    {...register('name')}
                    className={`mt-1 block w-full rounded-md border ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                    } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                    placeholder="Your Full Name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div>
                <label htmlFor="email" className="block text-gray-700">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={`mt-1 block w-full rounded-md border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                    } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                    placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
                <label htmlFor="resume" className="block text-gray-700">
                    Resume
                </label>
                <input
                    id="resume"
                    type="file"
                    {...register('resume')}
                    className={`mt-1 block w-full ${
                        errors.resume ? 'border-red-500' : 'border-gray-300'
                    } text-gray-700`}
                    accept=".pdf,.doc,.docx"
                />
                {errors.resume && <p className="mt-1 text-sm text-red-500">{errors.resume.message}</p>}
            </div>

            <div>
                <label htmlFor="coverLetter" className="block text-gray-700">
                    Cover Letter
                </label>
                <textarea
                    id="coverLetter"
                    {...register('coverLetter')}
                    className={`mt-1 block w-full rounded-md border ${
                        errors.coverLetter ? 'border-red-500' : 'border-gray-300'
                    } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                    rows={5}
                    placeholder="Your Cover Letter"
                ></textarea>
                {errors.coverLetter && <p className="mt-1 text-sm text-red-500">{errors.coverLetter.message}</p>}
            </div>

            <div>
                <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
            </div>
        </form>
    );
};

export default ApplyForm;
