import SimpleLayout from "@/layouts/SimpleLayout";
import Header from "@/layouts/Header/Header";

export default function TeamEditLayout({
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
