import SimpleLayout from "@/layouts/SimpleLayout";
import AuthHeader from "@/layouts/Header/AuthHeader";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    title: "Coworkers | 회원가입",
    description: "새 계정을 만들어 Coworkers를 시작합니다.",
    url: "https://coworkers.site/sign-up",
    images: [{ url: "/metadata.png", width: 1200, height: 630 }],
  },
};

export default async function SignUpLayout({
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
