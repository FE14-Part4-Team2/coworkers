import { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    title: "Coworkers | 할 일 리스트",
    description: "팀의 할 일 리스트를 확인하고 관리합니다.",
    url: "https://coworkers.site/[teamId]/task-lists/[listId]",
    images: [{ url: "/metadata.png", width: 1200, height: 630 }],
  },
};

export default function TasklistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
