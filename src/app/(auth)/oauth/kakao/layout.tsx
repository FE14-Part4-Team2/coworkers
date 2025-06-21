import AuthHeader from "@/layouts/Header/AuthHeader";
import SimpleLayout from "@/layouts/SimpleLayout";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  openGraph: {
    title: "Coworkers | 카카오 로그인",
    description: "카카오 계정으로 Coworkers에 로그인합니다.",
    url: "https://coworkers.site/oauth/kakao",
    images: [{ url: "/metadata.png", width: 1200, height: 630 }],
  },
};

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (token) {
    redirect("/?from=guest-only");
  }

  return (
    <>
      <AuthHeader />
      <SimpleLayout>{children}</SimpleLayout>
    </>
  );
}
