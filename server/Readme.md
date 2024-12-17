# Job Landing Page

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Health Check](#1-health-check)
  - [Public Routes](#2-public-routes)
    - [Get All Jobs](#a-get-all-jobs)
    - [Get Job by ID](#b-get-job-by-id)
    - [Apply for a Job](#c-apply-for-a-job)
  - [Admin Routes (Protected)](#3-admin-routes-protected)
    - [Create a Job](#a-create-a-job)
    - [Update a Job](#b-update-a-job)
    - [Delete a Job](#c-delete-a-job)
- [Authentication](#authentication)
- [Running the Server](#running-the-server)
- [License](#license)

---

## Description

This backend server serves as the core for a Job Landing Page application, enabling functionalities such as posting jobs, updating and deleting job listings, and handling job applications. It leverages **Express.js** for routing, **TypeScript** for type safety, and integrates with **Cloudflare R2** for file storage (resumes and company logos).

---

## Features

- **Job Management:** Create, update, and delete job listings via protected admin routes.
- **Job Applications:** Applicants can apply for jobs by submitting their details and uploading resumes.
- **File Uploads:** Resumes and company logos are stored securely in Cloudflare R2.
- **Authentication:** Admin routes are protected using a secure access code mechanism.
- **Validation:** Input data is validated to ensure data integrity and security.
- **Error Handling:** Comprehensive error handling to manage various error scenarios gracefully.

---

## Technologies Used

- **Node.js** & **Express.js**
- **TypeScript**
- **AWS SDK for JavaScript (S3 Client)** (used for Cloudflare R2 compatibility)
- **Multer** (for handling file uploads)
- **Express Validator** (for input validation)
- **Helmet** (for securing HTTP headers)
- **CORS** (for handling Cross-Origin Resource Sharing)
- **UUID** (for generating unique identifiers)

---

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/callmecgrey/project-root.git
   cd server

- Install Dependencies

- Ensure you have Node.js and npm installed.

- npm install
- Configure Environment Variables
- Create a .env file in the root directory and populate it with the necessary environment variables as shown in the Environment Variables section.
- Build the Project
- Compile TypeScript to JavaScript.

- npm run build
- Start the Server
- npm start
- For development purposes with automatic restarts on code changes, you can use:

- npm run dev
- Environment Variables

- Ensure that all sensitive information is stored securely in the .env file. Do not commit this file to version control.

---

## Environment Variables

- PORT=5009
- NODE_ENV=development

---

## Admin Authentication

- ADMIN_ACCESS_CODE=your_secure_admin_access_code

---

## Cloudflare R2 Configuration

- CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
- CLOUDFLARE_ACCESS_KEY_ID=your_cloudflare_access_key_id
- CLOUDFLARE_SECRET_ACCESS_KEY=your_cloudflare_secret_access_key
- CLOUDFLARE_R2_BUCKET_NAME=your_r2_bucket_name
- CLOUDFLARE_R2_ENDPOINT=<https://your-account-id.r2.cloudflarestorage.com>

---

## API Endpoints

---

## 1 Health Check

---

- Endpoint: GET /api/health
- Description: Checks the health status of the server.
- Authentication: None
- Request Parameters: None
- Request Body: None
- Response:
- Status Code: 200 OK

```bash
Body:
{
  "status": "OK"
}
```

## 2 Public Routes

---

## a. Get All Jobs

- Endpoint: GET /api/jobs
- Description: Retrieves a list of all available job listings.
- Authentication: None
- Request Parameters: None
- Request Body: None
- Response:
- Status Code: 200 OK

Body: Array of job objects.

```bash
[
  {
    "id": "job-id-1",
    "title": "Senior Software Engineer",
    "company": "TechCorp",
    "companyLogo": "https://example.com/logo.png",
    "description": "Job description here...",
    "responsibilities": ["Develop features", "Collaborate with team"],
    "department": "Engineering",
    "location": "New York, Remote",
    "type": "Full-Time",
    "requirements": ["React", "Node.js", "MongoDB"],
    "salary": "$120,000 - $140,000",
    "benefits": ["Health Insurance", "401k"],
    "mapUrl": "https://maps.google.com/?q=New+York"
  },
]
```

## b. Get Job by ID

- Endpoint: GET /api/jobs/:id
- Description: Retrieves details of a specific job by its ID.
- Authentication: None
- Request Parameters:
- id (string, required): The unique identifier of the job.
- Request Body: None
- Response:
- Status Code: 200 OK

Body: Job object.

```bash
{
  "id": "job-id-1",
  "title": "Senior Software Engineer",
  "company": "TechCorp",
  "companyLogo": "<https://example.com/logo.png>",
  "description": "Job description here...",
  "responsibilities": ["Develop features", "Collaborate with team"],
  "department": "Engineering",
  "location": "New York, Remote",
  "type": "Full-Time",
  "requirements": ["React", "Node.js", "MongoDB"],
  "salary": "$120,000 - $140,000",
  "benefits": ["Health Insurance", "401k"],
  "mapUrl": "<https://maps.google.com/?q=New+York>"
}
```

Status Code: 404 Not Found

```bash
Body:
{
  "message": "Job not found."
}
```

## c. Apply for a Job

- Endpoint: POST /api/jobs/:id/apply
- Description: Submits a job application for a specific job.
- Authentication: None
- Request Parameters:
- id (string, required): The unique identifier of the job.
- Request Body: multipart/form-data
- applicantName (string, required): Full name of the applicant.
- applicantEmail (string, required): Email address of the applicant.
- coverLetter (string, optional): Cover letter text.
- resume (file, required): Resume file (PDF or Word document, max 5MB).

- Response:
- Status Code: 201 Created

Body:

```bash
{
  "message": "Application submitted successfully.",
  "application": {
    "id": "application-id-1",
    "jobId": "job-id-1",
    "applicantName": "Jane Doe",
    "applicantEmail": "<jane.doe@example.com>",
    "coverLetter": "I am excited to apply for this position...",
    "resumeUrl": "<https://your-r2-bucket-url/resumes/1632345678901-resume.pdf>",
    "appliedAt": "2023-10-05T14:48:00.000Z"
}
```

Status Code: 400 Bad Request (e.g., missing fields or invalid file type)

Body:

```bash
{
  "message": "Invalid file type. Only PDF and Word documents are allowed."
}
```

Status Code: 404 Not Found (Job not found)

```bash
{
  "message": "Job not found."
}
```

## 3. Admin Routes Protected

Note: All admin routes require an Authorization header with the format Bearer <ADMIN_ACCESS_CODE>.

## a. Create a Job

Endpoint: POST /api/jobs
Description: Creates a new job listing.
Authentication: Required (Authorization: Bearer <ADMIN_ACCESS_CODE>)
Request Parameters: None

```bash
Request Body: application/json
{
  "title": "Senior Software Engineer",
  "company": "TechCorp",
  "description": "We are looking for a Senior Software Engineer...",
  "responsibilities": ["Develop features", "Collaborate with team"],
  "department": "Engineering",
  "location": "New York, Remote",
  "type": "Full-Time",
  "requirements": ["React", "Node.js", "MongoDB"],
  "salary": "$120,000 - $140,000",
  "benefits": ["Health Insurance", "401k"],
  "mapUrl": "<https://maps.google.com/?q=New+York>",
  "companyLogo": "<https://example.com/logo.png>" // Optional
}
```

Response:
Status Code: 201 Created
Body: Created job object.

```bash
{
  "id": "job-id-1",
  "title": "Senior Software Engineer",
  "company": "TechCorp",
  "companyLogo": "<https://example.com/logo.png>",
  "description": "We are looking for a Senior Software Engineer...",
  "responsibilities": ["Develop features", "Collaborate with team"],
  "department": "Engineering",
  "location": "New York, Remote",
  "type": "Full-Time",
  "requirements": ["React", "Node.js", "MongoDB"],
  "salary": "$120,000 - $140,000",
  "benefits": ["Health Insurance", "401k"],
  "mapUrl": "<https://maps.google.com/?q=New+York>"
}
```

Status Code: 400 Bad Request (Missing required fields)

```bash
{
  "message": "Missing required fields."
}
```

Status Code: 401 Unauthorized or 403 Forbidden (Invalid or missing access code)

```bash
{
  "message": "Invalid access code."
}
```

## b. Update a Job

Endpoint: PUT /api/jobs/:id
Description: Updates an existing job listing.
Authentication: Required (Authorization: Bearer <ADMIN_ACCESS_CODE>)
Request Parameters:
id (string, required): The unique identifier of the job.

```bash
Request Body: application/json (All fields optional; only include fields to update)
{
  "title": "Lead Software Engineer",
  "salary": "$130,000 - $150,000"
}
```

Response:
Status Code: 200 OK

```bash
Body: Updated job object.
{
  "id": "job-id-1",
  "title": "Lead Software Engineer",
  "company": "TechCorp",
  "companyLogo": "<https://example.com/logo.png>",
  "description": "We are looking for a Lead Software Engineer...",
  "responsibilities": ["Develop features", "Collaborate with team"],
  "department": "Engineering",
  "location": "New York, Remote",
  "type": "Full-Time",
  "requirements": ["React", "Node.js", "MongoDB"],
  "salary": "$130,000 - $150,000",
  "benefits": ["Health Insurance", "401k"],
  "mapUrl": "<https://maps.google.com/?q=New+York>"
}
```

Status Code: 400 Bad Request (Invalid input)

```bash
{
  "message": "Job title cannot be empty."
}
```

Status Code: 404 Not Found (Job not found)

```bash
{
  "message": "Job not found."
}
```

Status Code: 401 Unauthorized or 403 Forbidden (Invalid or missing access code)

```bash
{
  "message": "Invalid access code."
}
```

## c. Delete a Job

Endpoint: DELETE /api/jobs/:id
Description: Deletes a job listing.
Authentication: Required (Authorization: Bearer <ADMIN_ACCESS_CODE>)
Request Parameters:
id (string, required): The unique identifier of the job.
Request Body: None

```bash
Response:
Status Code: 204 No Content
Body: None
Status Code: 404 Not Found (Job not found)
{
  "message": "Job not found."
}
Status Code: 401 Unauthorized or 403 Forbidden (Invalid or missing access code)
{
  "message": "Invalid access code."
}
```

## Authentication

Admin Routes: Protected using a Bearer token. Admins must include the Authorization header with the value Bearer <ADMIN_ACCESS_CODE> to access protected routes.
Example:

Authorization: Bearer your_secure_admin_access_code
Obtaining the Access Code: The ADMIN_ACCESS_CODE is defined in the .env file and should be securely stored. Share it only with authorized personnel.

## Running the Server

Ensure Environment Variables are Set
Ensure all required environment variables are defined in the .env file as described in the Environment Variables section.

Install Dependencies

```bash
npm install
```

Build the Project

```bash
npm run build
```

Start the Server

```bash
npm start
```

For development with automatic restarts on code changes:

```bash
npm run dev
```

Server Access
The server will run on the port specified in the .env file (default is 5009). Access the health check endpoint to verify:

```bash
GET http://localhost:5009/api/health
```

## License

This project is licensed under the Apache License
