"use client";
import Image from "next/image";

export default function Header() {
  return (
    <header
      className="flex w-full h-[60px] bg-bg-secondary py-[14px] px-[360px] items-center max-w-full md:px-5 md:my-6
  "
    >
      <Image
        src="/icons/icon-logo-lg.svg"
        width={158}
        height={32}
        alt="메인 로고"
      />
    </header>
  );
}
