import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactQueryProvider } from "@/lib/reactQueryProvider";
import LandingHeader from "@/layouts/Header/LandingHeader";
import Toast from "@/components/common/Toast/Toast";

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
        <ReactQueryProvider>
          <LandingHeader />
          {children}
          <div
            id="toast-root"
            className="fixed bottom-0 left-1/2 transform -translate-x-1/2"
          ></div>
          <Toast />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
