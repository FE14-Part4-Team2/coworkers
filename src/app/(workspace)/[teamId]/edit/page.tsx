"use client";

import TeamFormLayout from "@/components/feature/Team/TeamFormLayout";
import ProfileUploader from "@/components/feature/Team/ProfileImageUploader";

import { TEAM_FORM_LABELS, TEAM_ERROR_MESSAGES } from "@/constants/team";

import { useUpdateGroup } from "@/api/group/group.query";
import { useGroupQuery } from "@/api/group/group.query";

import { useRouter, useParams } from "next/navigation";

import { useToastStore } from "@/stores/toastStore";
import { useTeamStore } from "@/stores/useTeamStore";
import { useAuthStore } from "@/stores/authStore";

import { useState, useEffect, useMemo } from "react";

export default function TeamEditPage() {
  const { showToast } = useToastStore();
  const { user } = useAuthStore();
  const { teamId } = useParams() as { teamId: string };
  const { data: groupData } = useGroupQuery(teamId);
  const { teamName, setTeamName, teamProfileUrl, setTeamProfileUrl } =
    useTeamStore();

  const DEFAULT_TEAM_PROFILE_IMAGE = "/icons/icon-img.svg";

  const isMember = groupData?.members?.some(
    (member) => member.userName === user?.nickname,
  );

  const router = useRouter();
  const groupId = groupData?.id;

  const [editedTeamName, setEditedTeamName] = useState(teamName);
  const [isTouched, setIsTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isMember) {
      router.replace(`/${teamId}`);
    }

    if (groupData) {
      setTeamName(groupData.name);
      setEditedTeamName(groupData.name);
      setTeamProfileUrl(groupData.image ?? DEFAULT_TEAM_PROFILE_IMAGE);
      setIsTouched(false);
    }
  }, [
    groupData,
    setTeamName,
    setTeamProfileUrl,
    isMember,
    router,
    showToast,
    teamId,
  ]);

  const isInputError = isTouched && editedTeamName.trim() === "";

  const isButtonDisabled = useMemo(() => {
    if (!groupData) return true;
    return editedTeamName.trim() === "";
  }, [editedTeamName, groupData]);

  const updateGroupMutation = useUpdateGroup(String(groupId));

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!groupId) return;
    setIsLoading(true);

    try {
      await updateGroupMutation.mutateAsync({
        name: editedTeamName,
        image: teamProfileUrl?.trim() ? teamProfileUrl : undefined,
      });

      showToast("팀 정보가 성공적으로 수정되었습니다.", "success");
      router.push(`/${teamId}`);
    } catch {
      showToast("팀 수정에 실패했습니다.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TeamFormLayout
      title="팀 수정하기"
      buttonLabel={isLoading ? "수정중..." : "수정하기"}
      onSubmit={handleEdit}
      tip="팀 이름은 직장명이나 오피셜 이름 등으로 설정하면 좋아요."
      inputValue={editedTeamName}
      onInputChange={(e) => {
        setEditedTeamName(e.target.value);
        setIsTouched(true);
      }}
      onInputBlur={() => {
        if (editedTeamName.trim() === "") {
          setIsTouched(true);
        }
      }}
      isInputError={isInputError}
      isButtonDisabled={isButtonDisabled || isLoading}
      errorMessage={
        isTouched && editedTeamName.trim() === ""
          ? TEAM_ERROR_MESSAGES.MESSAGE
          : ""
      }
    >
      <span className="inline-block font-medium text-lg pb-[0.75rem]">
        {TEAM_FORM_LABELS.PROFILE}
      </span>
      <ProfileUploader />
      <span className="inline-block font-medium text-lg pt-[1.5rem] pb-[0.75rem]">
        {TEAM_FORM_LABELS.NAME}
      </span>
    </TeamFormLayout>
  );
}
