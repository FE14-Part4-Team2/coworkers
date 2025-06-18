"use client";

import { useKakaoOauth } from "@/api/auth/auth.query";
import LoadingSpinner from "@/components/common/AsyncBoundary/LoadingSpinner";
import { useToastStore } from "@/stores/toastStore";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function KakaoCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const kakaoMutation = useKakaoOauth();
  const { showToast } = useToastStore();

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (code) {
      const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

      if (!redirectUri) {
        showToast("로그인 실패", "error");
        return;
      }

      kakaoMutation.mutate(
        {
          state: state || "",
          redirectUri: redirectUri,
          token: code,
        },
        {
          onSuccess: () => {
            showToast("로그인 성공", "success");
          },
          onError: () => {
            showToast("로그인 실패", "error");
            router.push("/login");
          },
        },
      );
    } else {
      showToast("카카오 로그인 취소 또는 실패", "error");
      router.replace("/login");
    }
  }, []);

  return <LoadingSpinner title="로그인 처리 중..." />;
}
