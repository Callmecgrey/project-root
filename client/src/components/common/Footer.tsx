// src/components/common/Footer.tsx

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-2xl font-bold mb-6 md:mb-0">Elite Residences</div>
                    <nav>
                        <ul className="flex space-x-6">
                            <li><Link href="#" className="hover:text-blue-300 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-blue-300 transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-blue-300 transition-colors">Contact Us</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="mt-8 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} Elite Residences. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
