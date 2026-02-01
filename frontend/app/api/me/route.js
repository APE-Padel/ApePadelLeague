import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function decodeJwt(token) {
  const payload = token.split(".")[1];
  const decoded = Buffer.from(payload, "base64").toString("utf-8");
  return JSON.parse(decoded);
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  try {
    const decoded = decodeJwt(token);

    return NextResponse.json({
      user: {
        username: decoded.username,
        role: decoded.role,
      },
    });
  } catch (err) {
    return NextResponse.json({ user: null });
  }
}
