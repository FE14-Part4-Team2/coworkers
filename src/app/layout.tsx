import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactQueryProvider } from "@/lib/reactQueryProvider";
import LandingHeader from "@/layouts/Header/LandingHeader";
import Toast from "@/components/common/Toast/Toast";
import AuthProvider from "@/components/feature/Auth/AuthProvider/AuthProvider";
import { cookies } from "next/headers";

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Coworkers",
  description: "업무 배정 및 현황 공유 서비스 코워커스",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  return (
    <html lang="ko" className={`${pretendard.variable} font-pretendard`}>
      <body className="bg-bg-primary text-white">
        <ReactQueryProvider>
          <AuthProvider hasToken={!!token}>
            <LandingHeader />
            {children}
            <div
              id="toast-root"
              className="fixed bottom-0 left-1/2 transform -translate-x-1/2"
            ></div>
            <Toast />
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
