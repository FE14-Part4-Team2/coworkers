// Server Component
import { cookies } from "next/headers";
import ClientLayout from "@/app/(team)/ClientTeamLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    title: "Coworkers | 팀 생성",
    description: "새로운 팀을 만들어 관리해보세요.",
    url: "https://coworkers.site/create",
    images: [{ url: "/metadata.png", width: 1200, height: 630 }],
  },
};

export default async function TeamCreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  return <ClientLayout token={token}>{children}</ClientLayout>;
}
