"use client";
import Image from "next/image";
import Link from "next/link";

export default function AuthHeader() {
  return (
    <header className="fixed top-0 left-0 w-full bg-bg-secondary z-50 h-15">
      <div className="w-full max-w-[78rem] mx-auto flex items-center justify-between px-4 py-5 sm:px-6 sm:py-3.5 md:px-7 md:py-[0.88rem]">
        <Link href="/">
          <Image
            src="/icons/icon-logo-lg.svg"
            alt="로고"
            width={158}
            height={32}
            priority
          />
        </Link>
      </div>
    </header>
  );
}
