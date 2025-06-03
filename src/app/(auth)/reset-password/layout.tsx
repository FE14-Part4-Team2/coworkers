import SimpleLayout from "@/layouts/SimpleLayout";
import AuthHeader from "@/layouts/Header/AuthHeader";

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthHeader />
      <SimpleLayout>{children}</SimpleLayout>
    </>
  );
}
