// src/components/CallToAction/CallToAction.tsx

import React from 'react';
import Button  from "../ui/Button";
import Link from 'next/link';

const CallToAction: React.FC = () => {
    return (
        <section className="bg-blue-600 text-white py-24">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-6">Ready to Shape the Future of Luxury Living?</h2>
                <p className="text-xl mb-10 max-w-2xl mx-auto">
                    Join our team and help create extraordinary spaces that redefine elegance and comfort.
                </p>
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-100" asChild>
                    <Link href="#openings">View Open Positions</Link>
                </Button>
            </div>
        </section>
    );
};

export default CallToAction;
