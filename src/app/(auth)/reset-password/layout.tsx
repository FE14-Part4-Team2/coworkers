import SimpleLayout from "@/layouts/SimpleLayout";
import AuthHeader from "@/layouts/Header/AuthHeader";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    title: "Coworkers | 비밀번호 재설정",
    description: "비밀번호를 재설정합니다.",
    url: "https://coworkers.site/reset-password",
    images: [{ url: "/metadata.png", width: 1200, height: 630 }],
  },
};

export default async function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (token) {
    redirect("/?from=password-usersetting");
  }
  return (
    <>
      <AuthHeader />
      <SimpleLayout>{children}</SimpleLayout>
    </>
  );
}
