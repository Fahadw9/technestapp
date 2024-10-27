// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { email, password } = await req.json();

    // Prepare the request to your backend API
    const response = await fetch('https://technestapi-production.up.railway.app/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    // Check if the request was successful
    if (!response.ok) {
        const errorData = await response.json();
        return NextResponse.json({ message: errorData.message || 'Registration failed' }, { status: response.status });
    }

    // If registration is successful
    const data = await response.json();
    return NextResponse.json({ message: data.message || 'User registered successfully!' });
}
