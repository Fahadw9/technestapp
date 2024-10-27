"use client"; // Ensure this directive is at the top

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter(); // Hook for navigation

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch('https://technestapi-production.up.railway.app/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            // Check if the response is successful
            if (!response.ok) {
                throw new Error(data.message || 'Login failed'); // Use message from the response
            }

            // Check if the specific success message is present
            if (data.message === 'User logged in') {
                localStorage.setItem('jwtToken', data.accessToken); // Store token in local storage
                setSuccess('Login successful! Welcome back.');
                router.push('/profile'); // Redirect to profile
            } else {
                setError(data.message); // Display other messages
            }

        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md w-full">
                <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">Login</h1>
                <form onSubmit={handleLogin} className="mt-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300" htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300" htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        />
                    </div>
                    <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Login
                    </button>
                </form>
                {error && <p className="mt-4 text-center text-red-500">{error}</p>}
                {success && <p className="mt-4 text-center text-green-500">{success}</p>}
            </div>
        </div>
    );
};

export default Login;
