import Job from '../models/jobModel';
import Application from '../models/applicationModel';

const storageService = {
    // --- Job Methods ---

    /**
     * Retrieve all jobs.
     */
    getJobs: async () => {
        return await Job.find();
    },

    /**
     * Retrieve a job by its ID.
     * @param id - Job ID.
     */
    getJobById: async (id: string) => {
        return await Job.findById(id);
    },

    /**
     * Add a new job.
     * @param job - Job object to add.
     */
    addJob: async (job: any) => {
        const newJob = new Job(job);
        await newJob.save();
    },

    /**
     * Update an existing job.
     * @param id - Job ID.
     * @param updatedJob - Updated job object.
     */
    updateJob: async (id: string, updatedJob: any) => {
        const result = await Job.findByIdAndUpdate(id, updatedJob, { new: true });
        return !!result;
    },

    /**
     * Delete a job.
     * @param id - Job ID.
     */
    deleteJob: async (id: string) => {
        const result = await Job.findByIdAndDelete(id);
        return !!result;
    },

    // --- Application Methods ---

    /**
     * Retrieve all applications.
     */
    getApplications: async () => {
        return await Application.find();
    },

    /**
     * Retrieve applications by Job ID.
     * @param jobId - Job ID.
     */
    getApplicationsByJobId: async (jobId: string) => {
        return await Application.find({ jobId });
    },

    /**
     * Add a new application.
     * @param application - Application object to add.
     */
    addApplication: async (application: any) => {
        const newApplication = new Application(application);
        await newApplication.save();
    },
};

export default storageService;
