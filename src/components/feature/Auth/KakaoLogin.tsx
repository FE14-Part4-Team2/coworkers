import Image from "next/image";
import Link from "next/link";
import React from "react";

interface KaKaoLoginProps {
  message: string;
}

export default function KakaoLogin({ message }: KaKaoLoginProps) {
  return (
    <Link
      href="/"
      className="flex justify-center items-center gap-2 block rounded-xl mt-4 py-3 bg-brand-kakao text-[#331d1e] font-semibold"
    >
      <Image
        src="icons/icon-kakao.svg"
        alt="카카오 로고"
        width={24}
        height={22}
      />
      {message}
    </Link>
  );
}
