// src/components/Admin/AdminAccessModal.tsx

import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import classNames from 'classnames';
import axios from 'axios';

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
            // Replace with your actual API endpoint
            const response = await axios.post('/api/verify-access-code', { accessCode: codeInput.trim() });

            if (response.data.isValid) {
                setAccessCode(codeInput.trim());
            } else {
                setError('Invalid access code. Please try again.');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while verifying the access code.');
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
                            className={classNames(
                                'mt-1 block w-full rounded-md border shadow-sm focus:border-blue-500 focus:ring-blue-500',
                                { 'border-red-500': error }
                            )}
                            placeholder="Access Code"
                            required
                        />
                        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        {isSubmitting ? 'Verifying...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminAccessModal;
