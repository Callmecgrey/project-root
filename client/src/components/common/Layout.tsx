import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gradient-to-br from-blue-50 to-blue-200">
            <Header />
            <main className="flex-grow px-4 py-8">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
