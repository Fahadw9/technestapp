"use client"; // Ensure this directive is at the top

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPen } from 'react-icons/fa';

const Profile = () => {
    const defaultPfp = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'; // Default profile picture URL
    const [profile, setProfile] = useState({
        full_name: '',
        email: '',
        phone_number: '',
        date_of_birth: '',
        gender: '',
        profile_picture_url: '', // Initially empty
    });
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false); // State to toggle between edit and view mode
    const [imageFile, setImageFile] = useState<File | null>(null); // State for the uploaded image
    const router = useRouter(); // Hook for navigation

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('jwtToken'); // Get token from local storage
            if (!token) {
                setError('You are not authorized to view this page.');
                return;
            }

            try {
                const response = await fetch('https://technestapi-production.up.railway.app/profile/myprofile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch profile details.');
                }

                const data = await response.json();
                setProfile(data); // Assuming the API returns the full profile object
            } catch (err) {
                setError((err as Error).message);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file); // Set the new image file
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    profile_picture_url: reader.result as string, // Update the profile picture URL in state
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        const token = localStorage.getItem('jwtToken'); // Get token from local storage
        if (!token) {
            setError('You are not authorized to update this profile.');
            return;
        }

        const formData = new FormData();
        formData.append('full_name', profile.full_name);
        formData.append('email', profile.email);
        formData.append('phone_number', profile.phone_number);
        formData.append('date_of_birth', profile.date_of_birth);
        formData.append('gender', profile.gender);
        if (imageFile) {
            formData.append('profile_picture', imageFile); // Append the image file to the form data
        }

        try {
            const response = await fetch('https://technestapi-production.up.railway.app/profile/update', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData, // Send the updated profile data
            });

            if (!response.ok) {
                throw new Error('Failed to update profile details.');
            }

            setIsEditing(false); // Exit editing mode after saving
            // Optionally, fetch the updated profile again to reflect changes
            // await fetchProfile();
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md w-full">
                <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">Profile</h1>
                {error ? (
                    <p className="mt-4 text-center text-red-500">{error}</p>
                ) : (
                    <div className="mt-6 text-center">
                        <div className="relative inline-block">
                            <img 
                                src={profile.profile_picture_url || defaultPfp} // Use default image if null
                                alt="Profile" 
                                className="rounded-full h-24 w-24 mx-auto" 
                            />
                            <label htmlFor="profile_picture" className="absolute right-0 bottom-0 p-1 bg-white rounded-full shadow-lg cursor-pointer">
                                <FaPen className="text-blue-500" />
                            </label>
                            <input
                                type="file"
                                id="profile_picture"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>
                        {isEditing ? (
                            <div>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={profile.full_name}
                                    onChange={handleChange}
                                    className="mt-2 w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-400"
                                    placeholder="Full Name"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleChange}
                                    className="mt-2 w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-400"
                                    placeholder="Email"
                                />
                                <input
                                    type="text"
                                    name="phone_number"
                                    value={profile.phone_number}
                                    onChange={handleChange}
                                    className="mt-2 w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-400"
                                    placeholder="Phone Number"
                                />
                                <input
                                    type="date"
                                    name="date_of_birth"
                                    value={profile.date_of_birth}
                                    onChange={handleChange}
                                    className="mt-2 w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-400"
                                />
                                <select
                                    name="gender"
                                    value={profile.gender}
                                    onChange={handleChange}
                                    className="mt-2 w-full p-2 border rounded bg-gray-800 text-white"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                <button
                                    onClick={handleSave}
                                    className="mt-4 bg-blue-500 text-white p-2 rounded"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="mt-4 bg-gray-300 text-gray-800 p-2 rounded ml-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div>
                                <p className="text-lg text-gray-700 dark:text-gray-300">
                                    Full Name: <span className="font-semibold">{profile.full_name || 'Not Set'}</span>
                                </p>
                                <p className="text-lg text-gray-700 dark:text-gray-300">
                                    Email: <span className="font-semibold">{profile.email || 'Not Set'}</span>
                                </p>
                                <p className="text-lg text-gray-700 dark:text-gray-300">
                                    Phone Number: <span className="font-semibold">{profile.phone_number || 'Not Set'}</span>
                                </p>
                                <p className="text-lg text-gray-700 dark:text-gray-300">
                                    Date of Birth: <span className="font-semibold">{profile.date_of_birth || 'Not Set'}</span>
                                </p>
                                <p className="text-lg text-gray-700 dark:text-gray-300">
                                    Gender: <span className="font-semibold">{profile.gender ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) : 'Not Set'}</span>
                                </p>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="mt-4 bg-blue-500 text-white p-2 rounded"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
