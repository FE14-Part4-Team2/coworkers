"use client";

import { useToastStore } from "@/stores/toastStore";
import Image from "next/image";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface KaKaoLoginProps {
  message: string;
}

const KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth/authorize";

export default function KakaoLogin({ message }: KaKaoLoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToastStore();

  const handleKakaoLogin = () => {
    setIsLoading(true);

    const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

    if (!REST_API_KEY || !REDIRECT_URI) {
      setIsLoading(false);
      showToast("환경 변수가 설정되지 않았습니다.");
      return;
    }

    const state = uuidv4();

    const kakaoAuthUrl = `${KAKAO_AUTH_URL}?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${state}`;

    window.location.href = kakaoAuthUrl;
  };

  return (
    <button
      type="button"
      className="flex justify-center items-center gap-2 block rounded-xl mt-4 py-3 bg-brand-kakao text-[#331d1e] font-semibold w-full"
      onClick={handleKakaoLogin}
    >
      <Image
        src="icons/icon-kakao.svg"
        alt="카카오 로고"
        width={24}
        height={22}
      />
      {isLoading ? "카카오 로그인 중.." : message}
    </button>
  );
}
