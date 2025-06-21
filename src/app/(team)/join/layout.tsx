// Server Component
import { cookies } from "next/headers";
import ClientLayout from "@/app/(team)/ClientTeamLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    title: "Coworkers | 팀 참여",
    description: "링크를 통해 기존 팀에 참여해보세요.",
    url: "https://coworkers.site/join",
    images: [{ url: "/metadata.png", width: 1200, height: 630 }],
  },
};

export default async function TeamJoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  return <ClientLayout token={token}>{children}</ClientLayout>;
}
