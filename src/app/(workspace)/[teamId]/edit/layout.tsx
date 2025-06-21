"use client";

import Header from "@/layouts/Header/Header";
import InnerLayout from "@/layouts/InnerLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    title: "Coworkers | 팀 수정",
    description: "관리자는 팀 정보를 수정할 수 있습니다.",
    url: "https://coworkers.site/[teamId]/edit",
    images: [{ url: "/metadata.png", width: 1200, height: 630 }],
  },
};

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
