"use client";
import Image from "next/image";
import Link from "next/link";

export default function LandingHeader() {
  return (
    <header className="fixed top-0 left-0 w-full bg-bg-secondary z-50 h-15">
      <div className="w-full max-w-[78rem] mx-auto flex items-center justify-between px-4 py-5 sm:px-6 sm:py-3.5 md:px-7 md:py-[0.88rem]">
        <div className="sm:flex items-center sm:gap-8 md:gap-10">
          <Link href="/">
            <Image
              src="/icons/icon-logo-sm.svg"
              alt="작은 로고"
              width={102}
              height={20}
              className="block md:hidden"
              priority
            />
            <Image
              src="/icons/icon-logo-lg.svg"
              alt="큰 로고"
              width={158}
              height={32}
              className="hidden md:block"
              priority
            />
          </Link>
          <Link href="/boards" className="hidden sm:block text-text-primary">
            모집게시판
          </Link>
        </div>

        <Link
          href="/login"
          className="text-text-primary text-md md:text-lg font-medium"
        >
          로그인
        </Link>
      </div>
    </header>
  );
}
