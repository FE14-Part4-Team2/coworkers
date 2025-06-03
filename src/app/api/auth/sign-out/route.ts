import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({
    message: "로그아웃이 성공적으로 처리되었습니다.",
  });

  res.cookies.set("accessToken", "", {
    path: "/",
    maxAge: 0,
  });

  res.cookies.set("refreshToken", "", {
    path: "/",
    maxAge: 0,
  });

  return res;
}
