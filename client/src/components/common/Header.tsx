import React from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';

const Header: React.FC = () => {
    return (
        <header className="bg-blue-600 text-white py-4 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="text-2xl font-bold">Elite Residences</div>
                <Link href="/" className="p-2 hover:bg-blue-700 rounded-full transition-colors">
                    <Home className="w-6 h-6" />
                    <span className="sr-only">Home</span>
                </Link>
            </div>
        </header>
    );
};

export default Header;
