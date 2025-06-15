"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAcceptInvitation } from "@/api/group/group.query";
import { useMyInfoQuery } from "@/api/user/user.query";
import { useToastStore } from "@/stores/toastStore";

export default function InviteAcceptPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showToast } = useToastStore();
  const token = searchParams.get("token");

  const { mutate: acceptInvitation } = useAcceptInvitation();
  const { data: myInfo, refetch } = useMyInfoQuery(true);

  useEffect(() => {
    if (!token) {
      showToast("초대 토큰이 없습니다.", "error");
      router.push("/");
      return;
    }

    const accept = async () => {
      acceptInvitation(
        { token, userEmail: myInfo?.email || "" },
        {
          onSuccess: async () => {
            const { data: updatedUser } = await refetch();
            const memberships = updatedUser?.memberships ?? [];

            if (memberships.length > 0) {
              const lastGroup = memberships[memberships.length - 1].group;
              showToast("초대 수락 완료!", "success");
              router.push(`/${lastGroup.id}`);
            } else {
              showToast("접근 가능한 그룹이 없습니다.", "error");
              router.push("/");
            }
          },
          onError: () => {
            showToast("초대 수락에 실패했습니다.", "error");
            router.push("/");
          },
        },
      );
    };

    accept();
  }, [acceptInvitation, myInfo?.email, refetch, router, showToast, token]);

  return (
    <div className="w-full h-full flex justify-center pt-32 text-lg text-text-default">
      초대 수락 중...
    </div>
  );
}
