"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAcceptInvitation } from "@/api/group/group.query";
import { useQueryClient } from "@tanstack/react-query";
import { useMyInfoQuery } from "@/api/user/user.query";
import { useToastStore } from "@/stores/toastStore";

export default function InviteAcceptPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();
  const token = searchParams.get("token");

  const { mutateAsync: acceptInvitation } = useAcceptInvitation();
  const { data: myInfo, isLoading: isUserLoading } = useMyInfoQuery(true);

  useEffect(() => {
    if (isUserLoading) return;

    if (!token) {
      showToast("초대 토큰이 없습니다.", "error");
      router.replace("/");
      return;
    }

    if (!myInfo?.email) {
      showToast("로그인이 필요합니다.", "error");
      router.replace("/login");
      return;
    }

    const key = "processedInviteTokens";
    const processed: string[] = JSON.parse(sessionStorage.getItem(key) ?? "[]");
    if (processed.includes(token)) {
      return;
    }
    processed.push(token);
    sessionStorage.setItem(key, JSON.stringify(processed));

    acceptInvitation({ token, userEmail: myInfo.email })
      .then((res) => {
        const groupId = res.groupId;
        if (!groupId) throw new Error("잘못된 초대 링크입니다.");
        queryClient.invalidateQueries({ queryKey: ["group", String(groupId)] });
        queryClient.invalidateQueries({ queryKey: ["myMemberships"] });
        showToast("초대 수락 완료!", "success");
        router.replace(`/${groupId}`);
      })
      .catch((err) => {
        if (
          err instanceof Error &&
          err.message === "이미 그룹에 소속된 유저입니다."
        ) {
          showToast("이미 소속된 팀은 헤더에서 확인해주세요.", "info");
          router.replace("/");
          return;
        } else {
          showToast("잘못된 초대 링크입니다.", "error");
          router.replace("/");
        }
      });
  }, [isUserLoading, myInfo?.email, token]);

  return (
    <div className="w-full h-full flex justify-center pt-32 text-lg text-text-default">
      초대 수락 중...
    </div>
  );
}
