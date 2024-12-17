// src/components/Testimonial/Testimonial.tsx

import React from 'react';
import Image from 'next/image';

const Testimonial: React.FC = () => {
    return (
        <section className="py-24 bg-blue-50">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-16 text-blue-800">What Our Team Says</h2>
                <div className="max-w-4xl mx-auto bg-white p-12 rounded-lg shadow-xl">
                    <Image
                        src="/placeholder.svg"
                        alt="Employee"
                        width={150}
                        height={150}
                        className="rounded-full mx-auto mb-8 border-4 border-blue-200"
                    />
                    <blockquote className="text-2xl italic mb-8 text-gray-700">
                        "Working at Elite Residences has been an incredible journey. Every day brings new challenges and opportunities to create something truly extraordinary."
                    </blockquote>
                    <p className="font-semibold text-xl text-blue-700">Emily Williams, Senior Architect</p>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
