// src/components/Admin/AdminAccessModal.tsx

import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import classNames from 'classnames';
import { verifyAccessCode } from '../../utils/api';
import { toast } from 'react-toastify';

interface AdminAccessModalProps {}

const AdminAccessModal: React.FC<AdminAccessModalProps> = () => {
    const { setAccessCode } = useContext(AuthContext);
    const [codeInput, setCodeInput] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await verifyAccessCode(codeInput.trim());
            setAccessCode(codeInput.trim());
            toast.success(response.message);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'An error occurred while verifying the access code.');
            toast.error(err.message || 'An error occurred while verifying the access code.');
        }

        setIsSubmitting(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 max-w-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">Admin Access</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="accessCode" className="block text-gray-700">
                            Enter Access Code
                        </label>
                        <input
    id="accessCode"
    type="password"
    value={codeInput}
    onChange={(e) => setCodeInput(e.target.value)}
    className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring focus:ring-blue-200 focus:ring-opacity-50 focus:border-blue-500 transition-all"
    placeholder="Access Code"
    required
/>

                        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                    </div>
                    <button
    type="submit"
    disabled={isSubmitting}
    className="w-full bg-gradient-to-br from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all"
>
                        {isSubmitting ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 mr-3 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                </svg>
                                Verifying...
                            </>
                        ) : (
                            'Submit'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminAccessModal;
