// src/pages/_app.tsx

// src/pages/_app.tsx

import React from 'react';
import { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import ErrorBoundary from '../components/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css'; // Your global CSS

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <ErrorBoundary>
                <Component {...pageProps} />
                <ToastContainer />
            </ErrorBoundary>
        </AuthProvider>
    );
}

export default MyApp;
