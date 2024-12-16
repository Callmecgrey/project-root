export const fetchJobs = async () => {
    const res = await fetch('/api/jobs');
    if (!res.ok) {
        throw new Error('Failed to fetch jobs');
    }
    return res.json();
};

// Add more API utility functions as needed
