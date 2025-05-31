import MainLayout from "@/layouts/MainLayout";

export default function MyHistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
