import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LandingHeader from "@/layouts/Header/LandingHeader";

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Coworkers",
  description: "업무 배정 및 현황 공유 서비스 코워커스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} font-pretendard`}>
      <body className="bg-bg-primary text-white">
        <LandingHeader />
        {children}
      </body>
    </html>
  );
}
