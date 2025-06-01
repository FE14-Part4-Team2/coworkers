import MainLayout from "@/layouts/MainLayout";

export default function BoardEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
