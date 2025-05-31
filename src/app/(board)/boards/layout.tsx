import MainLayout from "@/layouts/MainLayout";

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
