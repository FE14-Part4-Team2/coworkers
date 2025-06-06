"use client";

import DividerWithText from "@/components/feature/Auth/DividerWithText";
import KakaoLogin from "@/components/feature/Auth/KakaoLogin";
import SignupForm from "@/components/feature/Auth/SignupForm/SignupForm";
import { useAuthStore } from "@/stores/authStroe";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="w-full mt-5 sm:mt-0">
      <h2 className="text-center text-text-primary text-2xl md:text-4xl font-medium">
        회원가입
      </h2>
      <div className="mt-6 sm:mt-20">
        <SignupForm />
      </div>
      <DividerWithText />
      <KakaoLogin message="카카오로 간편 회원가입" />
    </div>
  );
}
