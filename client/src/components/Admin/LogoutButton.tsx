// src/components/Admin/LogoutButton.tsx

import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const LogoutButton: React.FC = () => {
    const { setAccessCode } = useContext(AuthContext);

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            setAccessCode(null);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
