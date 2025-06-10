"use client";
import TeamFormLayout from "@/components/team/TeamFormLayout";
import ProfileUploader from "@/components/team/ProfileUploader";
import { TEAM_FORM_LABELS } from "@/constants/team";

const handleCreate = () => {};

export default function TeamCreatePage() {
  return (
    <>
      <TeamFormLayout
        title="팀 생성하기"
        buttonLabel="생성하기"
        onSubmit={handleCreate}
        tip="팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요."
      >
        <span className="inline-block font-medium text-lg pb-[0.75rem]">
          {TEAM_FORM_LABELS.PROFILE}
        </span>
        <ProfileUploader />
        <span className="inline-block font-medium text-lg pt-[1.5rem] pb-[0.75rem]">
          {TEAM_FORM_LABELS.NAME}
        </span>
      </TeamFormLayout>
    </>
  );
}
