import AuthHeader from "@/layouts/Header/AuthHeader";
import SimpleLayout from "@/layouts/SimpleLayout";

export default function LoginLayout({
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
