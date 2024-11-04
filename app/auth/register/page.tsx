"use client"; // Ensure this directive is at the top

import { useState } from 'react';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // State to manage loading status

    const apiUrl = process.env.NEXT_PUBLIC_RAILWAYSPRODUCTION;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setMessage(''); // Clear previous messages
        setLoading(true); // Set loading to true when the request starts
        try {
            const response = await fetch('${apiUrl}/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Registration successful
                setMessage(data.message); // Show success message
            } else {
                // Handle errors
                setMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            setMessage('An error occurred while registering.');
            console.error('Error during registration:', error);
        } finally {
            setLoading(false); // Set loading to false when the request is completed
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md w-full">
                <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">Register</h1>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>} {/* Show message to the user */}
                <form onSubmit={handleSubmit} className="mt-6">
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
                    <button 
                        type="submit" 
                        className={`w-full p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white'}`} 
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? 'Registering...' : 'Register'} {/* Change button text based on loading state */}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
