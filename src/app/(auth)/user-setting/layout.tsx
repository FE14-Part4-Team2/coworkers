import SimpleLayout from "@/layouts/SimpleLayout";
import Header from "@/layouts/Header/Header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function UserSettingLayout({
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
      <SimpleLayout>{children}</SimpleLayout>
    </>
  );
}
