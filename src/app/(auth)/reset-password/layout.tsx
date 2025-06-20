import SimpleLayout from "@/layouts/SimpleLayout";
import AuthHeader from "@/layouts/Header/AuthHeader";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
