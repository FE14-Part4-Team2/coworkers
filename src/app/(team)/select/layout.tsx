// Server Component
import { cookies } from "next/headers";
import ClientLayout from "@/app/(team)/ClientTeamLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    title: "Coworkers | 팀 생성 또는 참여",
    description: "새로운 팀을 만들거나 기존 팀에 참여하세요.",
    url: "https://coworkers.site/select",
    images: [{ url: "/metadata.png", width: 1200, height: 630 }],
  },
};

export default async function TeamSelectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  return <ClientLayout token={token}>{children}</ClientLayout>;
}
