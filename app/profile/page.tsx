"use client"; // Ensure this directive is at the top

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Profile = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('jwtToken');

            // Check if the token exists
            if (!token) {
                setErrorMessage('YOU ARE NOT AUTHORIZED TO VIEW THIS PAGE');
                return;
            }

            try {
                const response = await fetch('https://technestapi-production.up.railway.app/profile/email', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                // Check if the response is successful
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }

                const data = await response.json();

                // Check if the email in the response matches the expected format
                if (data.email) {
                    setEmail(data.email);
                } else {
                    setErrorMessage('YOU ARE NOT AUTHORIZED TO VIEW THIS PAGE');
                }
            } catch (error) {
                setErrorMessage('YOU ARE NOT AUTHORIZED TO VIEW THIS PAGE');
            }
        };

        fetchProfile();
    }, []);

    if (errorMessage) {
        return <p>{errorMessage}</p>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <p>Email: {email}</p>
        </div>
    );
};

export default Profile;
