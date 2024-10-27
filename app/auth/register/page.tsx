"use client"; // Ensure this directive is at the top

import { useState } from 'react';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Call the external register API directly
        try {
            const response = await fetch('https://technestapi-production.up.railway.app/auth/register', {
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
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Register</h1>
            {message && <p>{message}</p>} {/* Show message to the user */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
