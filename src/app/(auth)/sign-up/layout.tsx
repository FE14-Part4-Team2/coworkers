import SimpleLayout from "@/layouts/SimpleLayout";

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SimpleLayout>{children}</SimpleLayout>;
}
