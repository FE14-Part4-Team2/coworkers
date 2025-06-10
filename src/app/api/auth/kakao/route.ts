import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const response = await fetch(`${BACKEND_URL}/auth/signIn/KAKAO`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message },
        { status: response.status },
      );
    }
    const res = NextResponse.json({ user: data.user });

    res.cookies.set("accessToken", data.accessToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    res.cookies.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (error) {
    return `${error}:서버 오류가 발생했습니다.`;
  }
}
