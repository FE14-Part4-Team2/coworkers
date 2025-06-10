"use client";

import { usePathname } from "next/navigation";
import Header from "@/layouts/Header/Header";
import AuthHeader from "@/layouts/Header/AuthHeader";
import SimpleLayout from "@/layouts/SimpleLayout";

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage =
    pathname?.includes("/create") || pathname?.includes("/join");

  return (
    <>
      {isAuthPage ? <AuthHeader /> : <Header />}
      <SimpleLayout>{children}</SimpleLayout>
    </>
  );
}
