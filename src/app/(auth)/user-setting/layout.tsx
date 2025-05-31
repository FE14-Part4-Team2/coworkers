import SettingLayout from "@/layouts/SettingLayout";

export default function UserSettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SettingLayout>{children}</SettingLayout>;
}
