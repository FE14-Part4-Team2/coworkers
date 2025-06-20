import Header from "@/layouts/Header/Header";
import InnerLayout from "@/layouts/InnerLayout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
