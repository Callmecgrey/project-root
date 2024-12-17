// src/contexts/AuthContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of your context
interface AuthContextType {
    accessCode: string | null;
    setAccessCode: (code: string | null) => void;
}

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
    accessCode: null,
    setAccessCode: () => {},
});

// Define the props for the AuthProvider
interface AuthProviderProps {
    children: ReactNode;
}

// Create the AuthProvider component without using React.FC
export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
    const [accessCode, setAccessCodeState] = useState<string | null>(null);

    useEffect(() => {
        // Retrieve the access code from localStorage on initial load
        const storedCode = localStorage.getItem('adminAccessCode');
        if (storedCode) {
            setAccessCodeState(storedCode);
        }
    }, []);

    // Function to update the access code
    const setAccessCode = (code: string | null) => {
        if (code) {
            localStorage.setItem('adminAccessCode', code);
        } else {
            localStorage.removeItem('adminAccessCode');
        }
        setAccessCodeState(code);
    };

    // Provide the context to child components
    return (
        <AuthContext.Provider value={{ accessCode, setAccessCode }}>
            {children}
        </AuthContext.Provider>
    );
};
