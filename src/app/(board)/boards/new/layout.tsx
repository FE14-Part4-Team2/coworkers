import MainLayout from "@/layouts/MainLayout";

export default function BoardNewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
