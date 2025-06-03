import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST() {
  const cookieStore = cookies();
  const refreshToken = (await cookieStore).get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { message: "리프레시 토큰이 없습니다." },
      { status: 401 },
    );
  }

  const response = await fetch(`${BACKEND_URL}/auth/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ refreshToken: refreshToken }),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { message: data.message || "토큰 재발급 실패" },
      { status: response.status },
    );
  }

  const res = NextResponse.json({ message: "토큰 재발급 완료" });

  res.cookies.set("accessToken", data.accessToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });

  return res;
}
