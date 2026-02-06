import { NextResponse } from 'next/server';

export async function PUT(req) {
  try {
    const token = req.cookies.get('auth_token')?.value;

    const body = await req.json();
    const { matchId, homeScore, awayScore } = body;
    
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/matches/${matchId}/result`;

    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ homeScore, awayScore }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
