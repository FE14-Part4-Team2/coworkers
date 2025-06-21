import MainLayout from "@/layouts/MainLayout";
import Header from "@/layouts/Header/Header";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    title: "Coworkers | 내 활동 기록",
    description: "내가 남긴 모든 히스토리를 확인합니다.",
    url: "https://coworkers.site/myhistory",
    images: [{ url: "/metadata.png", width: 1200, height: 630 }],
  },
};

export default async function MyHistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    redirect("/login");
  }

  return (
    <>
      <Header />
      <MainLayout>{children}</MainLayout>
    </>
  );
}
