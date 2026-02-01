import { NextResponse } from 'next/server'

export async function POST(req) {
  const { username, password } = await req.json();
  
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`;
  const request = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password })
	};

  const res = await fetch(url, request);

  if (!res.ok) {
    const errorMessage = await res.text();
    return NextResponse.json(
      { message: errorMessage || 'Login failed' },
      { status: res.status }
    );
  }

  const { token } = await res.json();

  const response = getResponseWithCookie(token);
  return response;
}

function getResponseWithCookie(token) {
	const response = NextResponse.json({ success: true });  

	const cookie = {
		name: 'auth_token',
		value: token,
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
    path: '/'
	};

	response.cookies.set(cookie);
	return response;
}