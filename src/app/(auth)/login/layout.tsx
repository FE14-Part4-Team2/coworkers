import SimpleLayout from "@/layouts/SimpleLayout";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SimpleLayout>{children}</SimpleLayout>;
}
