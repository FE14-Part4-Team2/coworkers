"use client";
import TeamFormLayout from "@/components/team/TeamFormLayout";
import { TEAM_FORM_LABELS } from "@/constants/team";

const handleJoin = () => {};

export default function TeamJoinPage() {
  return (
    <>
      <TeamFormLayout
        title="팀 참여하기"
        buttonLabel="참여하기"
        placeholder="팀 링크를 입력해주세요."
        tip="공유받은 팀 링크를 입력해 참여할 수 있어요."
        onSubmit={handleJoin}
      >
        <span className="inline-block font-medium text-lg pb-[0.75rem]">
          {TEAM_FORM_LABELS.LINK}
        </span>
      </TeamFormLayout>
    </>
  );
}
