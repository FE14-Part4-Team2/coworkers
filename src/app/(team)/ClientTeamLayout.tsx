"use client";

import Header from "@/layouts/Header/Header";
import AuthHeader from "@/layouts/Header/AuthHeader";
import SimpleLayout from "@/layouts/SimpleLayout";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ClientLayout({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string | undefined;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  const isAuthPage = pathname.includes("/create") || pathname.includes("/join");

  return (
    <>
      {isAuthPage ? <AuthHeader /> : <Header />}
      <SimpleLayout>{children}</SimpleLayout>
    </>
  );
}
