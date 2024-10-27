"use client"; // Ensure this directive is at the top

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Profile = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const router = useRouter(); // Hook for navigation

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('jwtToken'); // Get token from local storage
            if (!token) {
                setError('You are not authorized to view this page.');
                return;
            }

            try {
                const response = await fetch('https://technestapi-production.up.railway.app/profile/email', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('You are not authorized to view this page.');
                }

                const data = await response.json();
                setEmail(data.email);
            } catch (err) {
                setError((err as Error).message);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md w-full">
                <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">Profile</h1>
                {error ? (
                    <p className="mt-4 text-center text-red-500">{error}</p>
                ) : (
                    <div className="mt-6 text-center">
                        <p className="text-lg text-gray-700 dark:text-gray-300">Email: <span className="font-semibold">{email}</span></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
