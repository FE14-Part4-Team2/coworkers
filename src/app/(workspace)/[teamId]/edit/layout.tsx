"use client";

import Header from "@/layouts/Header/Header";
import InnerLayout from "@/layouts/InnerLayout";

export default function TeamEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <InnerLayout>{children}</InnerLayout>
    </>
  );
}
