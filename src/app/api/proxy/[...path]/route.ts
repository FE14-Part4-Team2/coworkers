import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

async function proxyHandler(req: NextRequest) {
  const { pathname, search } = new URL(req.url);
  const path = pathname.replace(/^\/api\/proxy/, "");
  const url = `${BACKEND_URL}${path}${search}`;

  const headers = Object.fromEntries(
    [...req.headers.entries()].filter(([key]) => key.toLowerCase() !== "host"),
  );

  const accessToken = req.cookies.get("accessToken")?.value;

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const backendRes = await fetch(url, {
    method: req.method,
    headers,
    body: req.body,
    duplex: "half",
  } as RequestInit);

  const response = new NextResponse(backendRes.body, {
    status: backendRes.status,
    headers: backendRes.headers,
  });

  return response;
}

export async function GET(req: NextRequest) {
  return proxyHandler(req);
}
export async function POST(req: NextRequest) {
  return proxyHandler(req);
}
export async function PATCH(req: NextRequest) {
  return proxyHandler(req);
}
export async function PUT(req: NextRequest) {
  return proxyHandler(req);
}
export async function DELETE(req: NextRequest) {
  return proxyHandler(req);
}
