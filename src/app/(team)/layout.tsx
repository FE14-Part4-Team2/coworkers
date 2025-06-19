// Server Component
import { cookies } from "next/headers";
import ClientLayout from "@/app/(team)/ClientTeamLayout";

export default async function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  return <ClientLayout token={token}>{children}</ClientLayout>;
}
