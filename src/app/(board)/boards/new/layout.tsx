import MainLayout from "@/layouts/MainLayout";
import Header from "@/layouts/Header/Header";

export default function BoardNewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <MainLayout>{children}</MainLayout>
    </>
  );
}
