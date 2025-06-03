import SimpleLayout from "@/layouts/SimpleLayout";
import AuthHeader from "@/layouts/Header/AuthHeader";

export default function TeamJoinLayout({
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
