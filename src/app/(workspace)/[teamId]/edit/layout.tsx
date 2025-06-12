"use client";

import Header from "@/layouts/Header/Header";
import SimpleLayout from "@/layouts/SimpleLayout";

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
