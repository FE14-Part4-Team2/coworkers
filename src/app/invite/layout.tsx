import Header from "@/layouts/Header/Header";
import InnerLayout from "@/layouts/InnerLayout";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  openGraph: {
    title: "Coworkers | 초대 수락",
    description: "초대 링크를 통해 팀에 참여합니다.",
    url: "https://coworkers.site/invite",
    images: [{ url: "/metadata.png", width: 1200, height: 630 }],
  },
};

export default async function InvitePageLayout({
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
      <InnerLayout>{children}</InnerLayout>
    </>
  );
}
