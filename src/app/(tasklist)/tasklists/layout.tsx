import MainLayout from "@/layouts/MainLayout";

export default function TasklistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
