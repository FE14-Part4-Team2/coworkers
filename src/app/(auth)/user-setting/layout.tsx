import SimpleLayout from "@/layouts/SimpleLayout";
import Header from "@/layouts/Header/Header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    title: "Coworkers | 계정 설정",
    description: "내 프로필 및 계정 설정을 관리합니다.",
    url: "https://coworkers.site/user-setting",
    images: [{ url: "/metadata.png", width: 1200, height: 630 }],
  },
};

export default async function UserSettingLayout({
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
      <SimpleLayout>{children}</SimpleLayout>
    </>
  );
}
