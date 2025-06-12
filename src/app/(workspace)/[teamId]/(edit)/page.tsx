"use client";
import TeamFormLayout from "@/components/feature/Team/TeamFormLayout";
import ProfileUploader from "@/components/feature/Team/ProfileUploader";
import { TEAM_FORM_LABELS } from "@/constants/team";

const handleEdit = () => {};

export default function TeamEditPage() {
  return (
    <>
      <TeamFormLayout
        title="팀 수정하기"
        buttonLabel="수정하기"
        onSubmit={handleEdit}
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
