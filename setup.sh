#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "Creating folder structure..."

# Create Client Directories
mkdir -p client/public/images
mkdir -p client/src/components/common
mkdir -p client/src/components/JobLanding
mkdir -p client/src/components/JobDetail
mkdir -p client/src/components/Apply
mkdir -p client/src/components/Admin
mkdir -p client/src/pages/jobs
mkdir -p client/src/pages/apply
mkdir -p client/src/pages/admin/update
mkdir -p client/src/pages/admin/delete
mkdir -p client/src/styles
mkdir -p client/src/types
mkdir -p client/src/utils
mkdir -p client/src/hooks

# Create Server Directories
mkdir -p server/src/controllers
mkdir -p server/src/routes
mkdir -p server/src/models
mkdir -p server/src/services
mkdir -p server/src/middleware
mkdir -p server/src/utils
mkdir -p server/src/data

echo "Folders created successfully."

echo "Creating files..."

# --- Root Files ---
touch README.md .gitignore

# Add basic content to README.md
cat <<EOL > README.md
# Job Landing Page Application

This is a job landing page application built with React, Next.js, TypeScript, TailwindCSS for the client, and Node.js with Express for the server. It allows users to view job listings, view individual job details, and apply for jobs. Admins can post, update, and delete job listings.

## Tech Stack

- **Frontend**: React, Next.js, TypeScript, TailwindCSS
- **Backend**: Node.js, Express, TypeScript
- **Storage**: JSON files, Cloudflare R2 for image uploads

## Setup Instructions

### Client

\`\`\`bash
cd client
npm install
npm run dev
\`\`\`

### Server

\`\`\`bash
cd server
npm install
npm run dev
\`\`\`

## License

This project is licensed under the MIT License.
EOL

# Add basic content to .gitignore
cat <<EOL > .gitignore
# Node modules
node_modules/

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env

# Build output
/dist
/build

# Misc
.DS_Store
EOL

# --- Client Files ---

# public/favicon.ico (Placeholder)
touch client/public/favicon.ico
echo "/* Placeholder for favicon.ico */" > client/public/favicon.ico

# src/components/common/Header.tsx
cat <<EOL > client/src/components/common/Header.tsx
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-blue-500 p-4 text-white">
            <h1 className="text-xl">Company Name</h1>
        </header>
    );
};

export default Header;
EOL

# src/components/common/Footer.tsx
cat <<EOL > client/src/components/common/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 p-4 text-white text-center">
            <p>&copy; 2024 Company Name. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
EOL

# src/components/common/Layout.tsx
cat <<EOL > client/src/components/common/Layout.tsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto p-4">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
EOL

# src/components/JobLanding/JobList.tsx
cat <<EOL > client/src/components/JobLanding/JobList.tsx
import React from 'react';
import JobCard from './JobCard';
import { Job } from '../../types';

interface JobListProps {
    jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map(job => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    );
};

export default JobList;
EOL

# src/components/JobLanding/JobCard.tsx
cat <<EOL > client/src/components/JobLanding/JobCard.tsx
import React from 'react';
import Link from 'next/link';
import { Job } from '../../types';

interface JobCardProps {
    job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    return (
        <div className="border rounded p-4 shadow">
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
            <Link href={\`/jobs/\${job.id}\`}>
                <a className="text-blue-500 mt-2 inline-block">View Details</a>
            </Link>
        </div>
    );
};

export default JobCard;
EOL

# src/components/JobDetail/JobDetail.tsx
cat <<EOL > client/src/components/JobDetail/JobDetail.tsx
import React from 'react';
import { Job } from '../../types';

interface JobDetailProps {
    job: Job;
}

const JobDetail: React.FC<JobDetailProps> = ({ job }) => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-gray-600">{job.company}</p>
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Job Description</h2>
                <p>{job.description}</p>
            </div>
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Requirements</h2>
                <ul className="list-disc list-inside">
                    {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                    ))}
                </ul>
            </div>
            <div className="mt-4">
                <a href={\`/apply/\${job.id}\`} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Apply Now
                </a>
            </div>
        </div>
    );
};

export default JobDetail;
EOL

# src/components/Apply/ApplyForm.tsx
cat <<EOL > client/src/components/Apply/ApplyForm.tsx
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
EOL

# src/components/Admin/AdminDashboard.tsx
cat <<EOL > client/src/components/Admin/AdminDashboard.tsx
import React from 'react';
import Link from 'next/link';

const AdminDashboard: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="space-y-2">
                <Link href="/admin/post">
                    <a className="block bg-green-500 text-white px-4 py-2 rounded">Post a New Job</a>
                </Link>
                <Link href="/admin">
                    <a className="block bg-blue-500 text-white px-4 py-2 rounded">Manage Jobs</a>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
EOL

# src/components/Admin/PostJobForm.tsx
cat <<EOL > client/src/components/Admin/PostJobForm.tsx
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
EOL

# src/components/Admin/UpdateJobForm.tsx
cat <<EOL > client/src/components/Admin/UpdateJobForm.tsx
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
            // fetch(`/api/jobs/${id}`)
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
EOL

# src/components/Admin/DeleteJobButton.tsx
cat <<EOL > client/src/components/Admin/DeleteJobButton.tsx
import React from 'react';

interface DeleteJobButtonProps {
    jobId: string;
}

const DeleteJobButton: React.FC<DeleteJobButtonProps> = ({ jobId }) => {
    const handleDelete = () => {
        // Handle job deletion
        console.log(\`Delete job with ID: \${jobId}\`);
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
EOL

# src/pages/index.tsx
cat <<EOL > client/src/pages/index.tsx
import React from 'react';
import Layout from '../components/common/Layout';
import JobList from '../components/JobLanding/JobList';
import { GetStaticProps } from 'next';
import { Job } from '../types';

interface HomeProps {
    jobs: Job[];
}

const Home: React.FC<HomeProps> = ({ jobs }) => {
    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-4">Available Jobs</h1>
            <JobList jobs={jobs} />
        </Layout>
    );
};

export const GetStaticProps: GetStaticProps = async () => {
    // Fetch jobs from the server API or a local JSON file
    const res = await fetch('http://localhost:3000/api/jobs');
    const jobs: Job[] = await res.json();

    return {
        props: {
            jobs,
        },
    };
};

export default Home;
EOL

# src/pages/jobs/[id].tsx
cat <<EOL > client/src/pages/jobs/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/common/Layout';
import JobDetail from '../../components/JobDetail/JobDetail';
import { Job } from '../../types';

interface JobPageProps {
    job: Job;
}

const JobPage: React.FC<JobPageProps> = ({ job }) => {
    return (
        <Layout>
            <JobDetail job={job} />
        </Layout>
    );
};

export const getServerSideProps = async (context: any) => {
    const { id } = context.params;

    // Fetch job data by ID from the server API or a local JSON file
    const res = await fetch(\`http://localhost:3000/api/jobs/\${id}\`);
    const job: Job = await res.json();

    return {
        props: {
            job,
        },
    };
};

export default JobPage;
EOL

# src/pages/apply/[id].tsx
cat <<EOL > client/src/pages/apply/[id].tsx
import React from 'react';
import Layout from '../../components/common/Layout';
import ApplyForm from '../../components/Apply/ApplyForm';
import { GetServerSideProps } from 'next';
import { Job } from '../../types';

interface ApplyPageProps {
    job: Job;
}

const ApplyPage: React.FC<ApplyPageProps> = ({ job }) => {
    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Apply for {job.title}</h1>
            <ApplyForm />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;

    // Fetch job data by ID from the server API or a local JSON file
    const res = await fetch(\`http://localhost:3000/api/jobs/\${id}\`);
    const job: Job = await res.json();

    return {
        props: {
            job,
        },
    };
};

export default ApplyPage;
EOL

# src/pages/admin/index.tsx
cat <<EOL > client/src/pages/admin/index.tsx
import React from 'react';
import Layout from '../../components/common/Layout';
import AdminDashboard from '../../components/Admin/AdminDashboard';

const Admin: React.FC = () => {
    return (
        <Layout>
            <AdminDashboard />
        </Layout>
    );
};

export default Admin;
EOL

# src/pages/admin/post.tsx
cat <<EOL > client/src/pages/admin/post.tsx
import React from 'react';
import Layout from '../../components/common/Layout';
import PostJobForm from '../../components/Admin/PostJobForm';

const PostJob: React.FC = () => {
    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Post a New Job</h1>
            <PostJobForm />
        </Layout>
    );
};

export default PostJob;
EOL

# src/pages/admin/update/[id].tsx
cat <<EOL > client/src/pages/admin/update/[id].tsx
import React from 'react';
import Layout from '../../../components/common/Layout';
import UpdateJobForm from '../../../components/Admin/UpdateJobForm';
import { GetServerSideProps } from 'next';
import { Job } from '../../../types';

interface UpdateJobPageProps {
    job: Job;
}

const UpdateJobPage: React.FC<UpdateJobPageProps> = ({ job }) => {
    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Update Job</h1>
            <UpdateJobForm />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;

    // Fetch job data by ID from the server API or a local JSON file
    const res = await fetch(\`http://localhost:3000/api/jobs/\${id}\`);
    const job: Job = await res.json();

    return {
        props: {
            job,
        },
    };
};

export default UpdateJobPage;
EOL

# src/pages/admin/delete/[id].tsx
cat <<EOL > client/src/pages/admin/delete/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/common/Layout';
import DeleteJobButton from '../../../components/Admin/DeleteJobButton';
import { GetServerSideProps } from 'next';
import { Job } from '../../../types';

interface DeleteJobPageProps {
    job: Job;
}

const DeleteJobPage: React.FC<DeleteJobPageProps> = ({ job }) => {
    const router = useRouter();

    const handleDelete = () => {
        // Implement deletion logic
        console.log(\`Deleting job with ID: \${job.id}\`);
        // After deletion, redirect to admin dashboard
        router.push('/admin');
    };

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Delete Job</h1>
            <p>Are you sure you want to delete the job "{job.title}"?</p>
            <DeleteJobButton jobId={job.id} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;

    // Fetch job data by ID from the server API or a local JSON file
    const res = await fetch(\`http://localhost:3000/api/jobs/\${id}\`);
    const job: Job = await res.json();

    return {
        props: {
            job,
        },
    };
};

export default DeleteJobPage;
EOL

# src/styles/globals.css
cat <<EOL > client/src/styles/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Add any global styles here */
EOL

# src/styles/tailwind.css
cat <<EOL > client/src/styles/tailwind.css
@tailwind base;
@tailwind components;
@tailwind utilities;
EOL

# src/types/index.d.ts
cat <<EOL > client/src/types/index.d.ts
export interface Job {
    id: string;
    title: string;
    company: string;
    description: string;
    requirements: string[];
    // Add more fields as needed
}
EOL

# src/utils/api.ts
cat <<EOL > client/src/utils/api.ts
export const fetchJobs = async () => {
    const res = await fetch('/api/jobs');
    if (!res.ok) {
        throw new Error('Failed to fetch jobs');
    }
    return res.json();
};

// Add more API utility functions as needed
EOL

# src/utils/helpers.ts
cat <<EOL > client/src/utils/helpers.ts
// Add any helper functions here

export const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};
EOL

# src/hooks/useAuth.ts
cat <<EOL > client/src/hooks/useAuth.ts
import { useState, useEffect } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Implement authentication logic here
        // For example, check for a valid auth token
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return { isAuthenticated };
};

export default useAuth;
EOL

# tailwind.config.js
cat <<EOL > client/tailwind.config.js
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        './public/index.html',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
EOL

# postcss.config.js
cat <<EOL > client/postcss.config.js
module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
};
EOL

# tsconfig.json for client
cat <<EOL > client/tsconfig.json
{
    "compilerOptions": {
        "target": "es5",
        "lib": ["dom", "dom.iterable", "esnext"],
        "allowJs": true,
        "skipLibCheck": true,
        "strict": true,
        "forceConsistentCasingInFileNames": true,
        "noEmit": true,
        "esModuleInterop": true,
        "module": "esnext",
        "moduleResolution": "node",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "jsx": "preserve",
        "incremental": true
    },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
    "exclude": ["node_modules"]
}
EOL

# package.json for client
cat <<EOL > client/package.json
{
    "name": "client",
    "version": "1.0.0",
    "private": true,
    "scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "lint": "next lint"
    },
    "dependencies": {
        "next": "latest",
        "react": "latest",
        "react-dom": "latest",
        "tailwindcss": "^3.0.0"
    },
    "devDependencies": {
        "autoprefixer": "^10.0.0",
        "postcss": "^8.0.0",
        "typescript": "^4.0.0"
    }
}
EOL

# --- Server Files ---

# src/controllers/jobController.ts
cat <<EOL > server/src/controllers/jobController.ts
import { Request, Response } from 'express';
import { Job } from '../models/jobModel';
import storageService from '../services/storageService';

// Get all jobs
export const getAllJobs = async (req: Request, res: Response) => {
    try {
        const jobs: Job[] = await storageService.getJobs();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch jobs' });
    }
};

// Get job by ID
export const getJobById = async (req: Request, res: Response) => {
    try {
        const job: Job | undefined = await storageService.getJobById(req.params.id);
        if (job) {
            res.json(job);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch job' });
    }
};

// Create a new job
export const createJob = async (req: Request, res: Response) => {
    try {
        const newJob: Job = req.body;
        await storageService.addJob(newJob);
        res.status(201).json(newJob);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create job' });
    }
};

// Update a job
export const updateJob = async (req: Request, res: Response) => {
    try {
        const updatedJob: Job = req.body;
        const success = await storageService.updateJob(req.params.id, updatedJob);
        if (success) {
            res.json(updatedJob);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update job' });
    }
};

// Delete a job
export const deleteJob = async (req: Request, res: Response) => {
    try {
        const success = await storageService.deleteJob(req.params.id);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete job' });
    }
};
EOL

# src/controllers/adminController.ts
cat <<EOL > server/src/controllers/adminController.ts
import { Request, Response } from 'express';
import { Job } from '../models/jobModel';
import storageService from '../services/storageService';

// Admin-specific operations can be added here
// For example, authentication, authorization, etc.
EOL

# src/routes/jobRoutes.ts
cat <<EOL > server/src/routes/jobRoutes.ts
import express from 'express';
import { getAllJobs, getJobById, createJob, updateJob, deleteJob } from '../controllers/jobController';

const router = express.Router();

router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

export default router;
EOL

# src/routes/adminRoutes.ts
cat <<EOL > server/src/routes/adminRoutes.ts
import express from 'express';
import { /* Admin controller functions */ } from '../controllers/adminController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// Protect admin routes with authentication middleware
router.use(authMiddleware);

// Define admin routes here
// Example:
// router.post('/jobs', createJob);
// router.put('/jobs/:id', updateJob);
// router.delete('/jobs/:id', deleteJob);

export default router;
EOL

# src/models/jobModel.ts
cat <<EOL > server/src/models/jobModel.ts
export interface Job {
    id: string;
    title: string;
    company: string;
    description: string;
    requirements: string[];
    // Add more fields as needed
}
EOL

# src/services/storageService.ts
cat <<EOL > server/src/services/storageService.ts
import fs from 'fs/promises';
import path from 'path';
import { Job } from '../models/jobModel';

const dataFilePath = path.join(__dirname, '../data/jobs.json');

const storageService = {
    // Get all jobs
    getJobs: async (): Promise<Job[]> => {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        return JSON.parse(data);
    },

    // Get job by ID
    getJobById: async (id: string): Promise<Job | undefined> => {
        const jobs = await storageService.getJobs();
        return jobs.find(job => job.id === id);
    },

    // Add a new job
    addJob: async (job: Job): Promise<void> => {
        const jobs = await storageService.getJobs();
        jobs.push(job);
        await fs.writeFile(dataFilePath, JSON.stringify(jobs, null, 2));
    },

    // Update an existing job
    updateJob: async (id: string, updatedJob: Job): Promise<boolean> => {
        const jobs = await storageService.getJobs();
        const index = jobs.findIndex(job => job.id === id);
        if (index === -1) return false;
        jobs[index] = updatedJob;
        await fs.writeFile(dataFilePath, JSON.stringify(jobs, null, 2));
        return true;
    },

    // Delete a job
    deleteJob: async (id: string): Promise<boolean> => {
        let jobs = await storageService.getJobs();
        const initialLength = jobs.length;
        jobs = jobs.filter(job => job.id !== id);
        if (jobs.length === initialLength) return false;
        await fs.writeFile(dataFilePath, JSON.stringify(jobs, null, 2));
        return true;
    },
};

export default storageService;
EOL

# src/services/cloudflareService.ts
cat <<EOL > server/src/services/cloudflareService.ts
// Import necessary Cloudflare SDK or use API calls
// This is a placeholder for Cloudflare R2 integration

const cloudflareService = {
    uploadImage: async (file: Express.Multer.File): Promise<string> => {
        // Implement image upload to Cloudflare R2
        // Return the URL of the uploaded image
        return 'https://your-cloudflare-r2-bucket-url/' + file.filename;
    },
};

export default cloudflareService;
EOL

# src/middleware/authMiddleware.ts
cat <<EOL > server/src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Implement authentication and authorization logic
    // For example, check for a valid JWT token in headers
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        // Verify token logic here
        // If valid:
        next();
        // Else:
        // res.status(401).json({ message: 'Unauthorized' });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export default authMiddleware;
EOL

# src/utils/logger.ts
cat <<EOL > server/src/utils/logger.ts
// Simple logger utility
const logger = {
    info: (message: string) => {
        console.log(\`INFO: \${message}\`);
    },
    error: (message: string) => {
        console.error(\`ERROR: \${message}\`);
    },
};

export default logger;
EOL

# src/utils/errorHandler.ts
cat <<EOL > server/src/utils/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import logger from './logger';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;
EOL

# src/data/jobs.json
cat <<EOL > server/src/data/jobs.json
[
    {
        "id": "1",
        "title": "Frontend Developer",
        "company": "Tech Corp",
        "description": "We are looking for a skilled Frontend Developer...",
        "requirements": ["React", "TypeScript", "TailwindCSS"]
    },
    {
        "id": "2",
        "title": "Backend Developer",
        "company": "Innovate LLC",
        "description": "Seeking an experienced Backend Developer...",
        "requirements": ["Node.js", "Express", "TypeScript"]
    }
]
EOL

# src/app.ts
cat <<EOL > server/src/app.ts
import express from 'express';
import cors from 'cors';
import jobRoutes from './routes/jobRoutes';
import adminRoutes from './routes/adminRoutes';
import errorHandler from './utils/errorHandler';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling Middleware
app.use(errorHandler);

export default app;
EOL

# src/server.ts
cat <<EOL > server/src/server.ts
import app from './app';
import logger from './utils/logger';

const PORT = process.env.PORT || 5009;

app.listen(PORT, () => {
    logger.info(\`Server is running on port \${PORT}\`);
});
EOL

# tsconfig.json for server
cat <<EOL > server/tsconfig.json
{
    "compilerOptions": {
        "target": "ES6",
        "module": "CommonJS",
        "rootDir": "src",
        "outDir": "dist",
        "esModuleInterop": true,
        "strict": true,
        "skipLibCheck": true
    },
    "include": ["src"],
    "exclude": ["node_modules"]
}
EOL

# package.json for server
cat <<EOL > server/package.json
{
    "name": "server",
    "version": "1.0.0",
    "main": "dist/server.js",
    "scripts": {
        "build": "tsc",
        "start": "node dist/server.js",
        "dev": "ts-node-dev src/server.ts"
    },
    "dependencies": {
        "cors": "^2.8.5",
        "express": "^4.17.1"
    },
    "devDependencies": {
        "@types/cors": "^2.8.12",
        "@types/express": "^4.17.13",
        "ts-node-dev": "^1.1.8",
        "typescript": "^4.0.0"
    }
}
EOL

echo "Files created successfully."

echo "Initializing Client and Server..."

# Initialize npm in client and install dependencies
cd client
npm install

# Initialize npm in server and install dependencies
cd ../server
npm install

# Return to project root
cd ..

echo "Setup completed successfully!"
echo "You can now start the client and server:"
echo "1. Start the Server:"
echo "   cd server"
echo "   npm run dev"
echo "2. Start the Client:"
echo "   cd client"
echo "   npm run dev"
