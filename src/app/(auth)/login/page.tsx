"use client";

import DividerWithText from "@/components/feature/Auth/DividerWithText";
import KakaoLogin from "@/components/feature/Auth/KakaoLogin";
import LoginForm from "@/components/feature/Auth/LoginForm/LoginForm";
import { useToastStore } from "@/stores/toastStore";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const { showToast } = useToastStore();

  useEffect(() => {
    const from = searchParams.get("from");

    if (from === "auth-only") {
      showToast("로그인이 필요한 페이지입니다.", "error");
    }
  }, [searchParams, showToast]);

  return (
    <div className="w-full relative mt-5 sm:mt-0">
      <h2 className="md:text-4xl text-2xl font-medium text-center">로그인</h2>
      <div className="mt-6 sm:mt-20">
        <LoginForm />
        <p className="text-center text-md sm:text-lg mt-6 font-medium text-primary">
          아직 계정이 없으신가요?
          <Link href="/sign-up" className="text-brand-primary underline pl-3">
            가입하기
          </Link>
        </p>
      </div>
      <DividerWithText />
      <KakaoLogin message="카카오로 간편 로그인" />
    </div>
  );
}
