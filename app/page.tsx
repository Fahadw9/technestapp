// app/page.tsx
import Link from 'next/link';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
            <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200">Welcome to TechNest App</h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Please choose an action:</p>
            <div className="mt-6">
                <Link href="/auth/register">
                    <button className="mx-2 mt-2 px-6 py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                        Sign Up
                    </button>
                </Link>
                <Link href="/auth/login">
                    <button className="mx-2 mt-2 px-6 py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                        Login
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
