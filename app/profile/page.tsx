// app/profile/page.tsx
const Profile = () => {
    // For demonstration, using a hardcoded email.
    // In a real app, fetch user data from your API or state management.
    const email = "user@example.com"; // Replace with actual user email

    return (
        <div>
            <h1>Profile</h1>
            <p>Email: {email}</p>
        </div>
    );
};

export default Profile;
