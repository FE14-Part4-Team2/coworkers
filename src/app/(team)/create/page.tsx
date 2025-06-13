"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useTeamStore } from "@/stores/\buseTeamStore";
import { useToastStore } from "@/stores/toastStore";
import { useCreateGroup } from "@/api/group/group.query";
import { TEAM_FORM_LABELS, TEAM_ERROR_MESSAGES } from "@/constants/team";

import TeamFormLayout from "@/components/feature/Team/TeamFormLayout";
import ProfileImageUploader from "@/components/feature/Team/ProfileImageUploader";

export default function TeamCreatePage() {
  const router = useRouter();
  const createGroupMutation = useCreateGroup();

  const { showToast } = useToastStore();
  const { teamName, setTeamName } = useTeamStore();

  const [teamNameError, setTeamNameError] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const validateTeamName = (teamName: string) =>
    teamName.trim() === "" ? TEAM_ERROR_MESSAGES.MESSAGE : "";

  useEffect(() => {
    const trimmed = teamName.trim();
    setIsButtonDisabled(trimmed.length === 0);

    if (isTouched) setTeamNameError(validateTeamName(trimmed));
  }, [teamName, isTouched]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const teamNameValue = e.target.value;
    setTeamName(teamNameValue);

    if (isTouched) setTeamNameError(validateTeamName(teamNameValue));
  };

  const handleInputBlur = () => {
    setIsTouched(true);
    setTeamNameError(validateTeamName(teamName));
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { teamName, teamProfileUrl } = useTeamStore.getState();
    const trimmed = teamName.trim();
    const errorMessage = validateTeamName(trimmed);

    if (errorMessage) {
      setTeamNameError(errorMessage);
      return;
    }

    setIsLoading(true);
    setIsButtonDisabled(true);

    try {
      const trimmed = teamName.trim();
      const hasProfileImage = teamProfileUrl?.trim() !== "";
      const payload = {
        name: trimmed,
        image: hasProfileImage ? teamProfileUrl : undefined,
      };

      const { id } = await createGroupMutation.mutateAsync(payload);

      showToast("팀 생성이 완료되었습니다.", "success");

      router.push(`/${id}`);
    } catch {
      showToast("팀 생성에 실패했습니다.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TeamFormLayout
        title="팀 생성하기"
        buttonLabel={isLoading ? "생성중..." : "생성하기"}
        placeholder="팀 이름을 입력해주세요."
        tip="팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요."
        inputValue={teamName}
        onSubmit={handleCreate}
        onInputChange={handleInputChange}
        onInputBlur={handleInputBlur}
        isInputError={!teamNameError}
        isButtonDisabled={isButtonDisabled || isLoading}
        errorMessage={isTouched && teamName.trim() === "" ? teamNameError : ""}
      >
        <span className="inline-block font-medium text-lg pb-[0.75rem]">
          {TEAM_FORM_LABELS.PROFILE}
        </span>
        <ProfileImageUploader />
        <span className="inline-block font-medium text-lg pt-[1.5rem] pb-[0.75rem]">
          {TEAM_FORM_LABELS.NAME}
        </span>
      </TeamFormLayout>
    </>
  );
}
