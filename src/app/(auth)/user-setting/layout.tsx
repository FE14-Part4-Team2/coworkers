import SimpleLayout from "@/layouts/SimpleLayout";
import Header from "@/layouts/Header/Header";

export default function UserSettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <SimpleLayout>{children}</SimpleLayout>
    </>
  );
}
