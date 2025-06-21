import Header from "@/layouts/Header/Header";
import MainLayout from "@/layouts/MainLayout";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  openGraph: {
    title: "Coworkers | 팀 페이지",
    description: "팀 페이지에서 업무 현황을 확인하세요.",
    url: "https://coworkers.site/[teamId]",
    images: [{ url: "/metadata.png", width: 1200, height: 630 }],
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    redirect("/login?from=auth-only");
  }

  return (
    <>
      <Header />
      <MainLayout>{children}</MainLayout>
    </>
  );
}
