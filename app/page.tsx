// app/page.tsx
import Link from 'next/link';

const Home = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>Welcome to Technest App</h1>
            <p>Please choose an action:</p>
            <div>
                <Link href="/auth/register">
                    <button style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>Sign Up</button>
                </Link>
                <Link href="/auth/login">
                    <button style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>Login</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
