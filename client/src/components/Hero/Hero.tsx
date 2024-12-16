// src/components/Hero/Hero.tsx

import React from 'react';
import Image from 'next/image';
import Button  from "../ui/Button";
import Link from 'next/link';

const Hero: React.FC = () => {
    return (
        <section className="bg-blue-700 text-white py-24 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <Image 
                    src="/placeholder.svg" 
                    alt="Background" 
                    layout="fill" 
                    objectFit="cover" 
                    priority 
                />
            </div>
            <div className="container mx-auto px-4 text-center relative z-10">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Build the Future of Luxury Living</h1>
                <p className="text-xl mb-10 max-w-2xl mx-auto">
                    Join our team and help create extraordinary living experiences for discerning clients worldwide.
                </p>
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-100" asChild>
                    <Link href="#openings">Explore Opportunities</Link>
                </Button>
            </div>
        </section>
    );
};

export default Hero;
