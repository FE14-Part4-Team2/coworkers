import MainLayout from "@/layouts/MainLayout";
import Header from "@/layouts/Header/Header";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
