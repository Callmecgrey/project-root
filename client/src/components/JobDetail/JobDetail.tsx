// src/components/JobDetail/JobDetail.tsx

import React from 'react';
import { Job } from '../../types';
import Card from '../ui/Card';
import CardContent from '../ui/CardContent';
import Button from '../ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { Building, MapPin, Briefcase, DollarSign, Map } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface JobDetailProps {
    job: Job;
}

const JobDetail: React.FC<JobDetailProps> = ({ job }) => {
    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <Card variant="shadow" className="max-w-4xl mx-auto">
                <CardContent>
                    {/* Company Information */}
                    <div className="flex items-center space-x-4 mb-6">
                        {job.companyLogo ? (
                            <Image
                                src={job.companyLogo}
                                alt={`${job.company} Logo`}
                                width={70}
                                height={70}
                                className="rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-gray-500 text-sm">No Logo</span>
                            </div>
                        )}
                        <div>
                            <h1 className="text-3xl font-bold text-blue-700">{job.title}</h1>
                            <p className="text-gray-600">{job.company}</p>
                        </div>
                    </div>

                    {/* Job Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="flex items-center">
                            <Briefcase className="w-5 h-5 text-gray-500 mr-2" />
                            <span className="text-gray-700">{job.type}</span>
                        </div>
                        <div className="flex items-center">
                            <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                            <span className="text-gray-700">{job.location}</span>
                        </div>
                        {job.salary && (
                            <div className="flex items-center">
                                <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
                                <span className="text-gray-700">{job.salary}</span>
                            </div>
                        )}
                        {job.department && (
                            <div className="flex items-center">
                                <Building className="w-5 h-5 text-gray-500 mr-2" />
                                <span className="text-gray-700">{job.department}</span>
                            </div>
                        )}
                        {job.mapUrl && (
                            <div className="flex items-center">
                                <Map className="w-5 h-5 text-gray-500 mr-2" />
                                <a
                                    href={job.mapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    View on Map
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Job Description */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-blue-800 mb-2">Job Description</h2>
                        <ReactMarkdown className="prose text-gray-700">{job.description}</ReactMarkdown>
                    </div>

                    {/* Requirements */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-blue-800 mb-2">Requirements</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {job.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Responsibilities */}
                    {job.responsibilities && job.responsibilities.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-blue-800 mb-2">Responsibilities</h2>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                {job.responsibilities.map((resp, index) => (
                                    <li key={index}>{resp}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Benefits */}
                    {job.benefits && job.benefits.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-blue-800 mb-2">Benefits</h2>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                {job.benefits.map((benefit, index) => (
                                    <li key={index}>{benefit}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Map Embed */}
                    {job.mapUrl && (
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-blue-800 mb-2">Location</h2>
                            <iframe
                                src={job.mapUrl}
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                title={`${job.location} Map`}
                                className="rounded-md shadow-sm"
                            ></iframe>
                        </div>
                    )}

                    {/* Apply Button */}
                    <div className="mt-8">
                        <Button variant="primary" size="lg" asChild>
                            <Link href={`/apply/${job.id}`} className="w-full text-center">
                            Apply Now
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

};

export default JobDetail;
