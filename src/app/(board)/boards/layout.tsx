import MainLayout from "@/layouts/MainLayout";
import Header from "@/layouts/Header/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    title: "Coworkers | 모집 게시판",
    description: "모집 게시판에서 팀을 구하고 팀에 참여해보세요.",
    url: "https://coworkers.site/boards",
    images: [{ url: "/metadata.png", width: 1200, height: 630 }],
  },
};

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <MainLayout>{children}</MainLayout>
    </>
  );
}
