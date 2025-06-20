"use client";

import TeamFormLayout from "@/components/feature/Team/TeamFormLayout";

import { TEAM_FORM_LABELS } from "@/constants/team";
import { TEAM_ERROR_MESSAGES } from "@/constants/team";

import { useToastStore } from "@/stores/toastStore";

import { useAcceptInvitation } from "@/api/group/group.query";
import { useMyInfoQuery } from "@/api/user/user.query";

import { useEffect, useState } from "react";

export default function TeamJoinPage() {
  const { showToast } = useToastStore();
  const { mutateAsync } = useAcceptInvitation();
  const { data: myInfo } = useMyInfoQuery(true);

  const [teamLink, setTeamLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const isInputError = isTouched && !!teamLink;

  const validateTeamLink = (teamLink: string) =>
    teamLink.trim() === "" ? TEAM_ERROR_MESSAGES.JOIN_REQUIRED : "";

  useEffect(() => {
    const trimmed = teamLink.trim();
    setIsButtonDisabled(trimmed.length === 0);

    if (isTouched) setErrorMessage(validateTeamLink(trimmed));
  }, [teamLink, isTouched]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTeamLink(value);
    if (isTouched) {
      setErrorMessage(validateTeamLink(value));
    }
  };

  const handleInputBlur = () => {
    setIsTouched(true);
    setErrorMessage(validateTeamLink(teamLink));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleJoin();
    }
  };

  const handleJoin = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setIsTouched(true);

    const trimmed = teamLink.trim();
    const validationError = validateTeamLink(trimmed);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      setIsLoading(true);
      setIsButtonDisabled(true);

      const url = new URL(trimmed);
      const token = url.searchParams.get("token");

      if (!token) {
        setErrorMessage(TEAM_ERROR_MESSAGES.JOIN_INVALID);
        return;
      }

      const res = await mutateAsync({
        token,
        userEmail: myInfo?.email || "",
      });

      window.location.href = `/${res.groupId}`;
    } catch (e: unknown) {
      let errorMessage = "";

      if (e instanceof Error) {
        errorMessage = e.message;
      }

      if (errorMessage === "이미 그룹에 소속된 유저입니다.") {
        showToast("이미 이 팀에 참여하고 있습니다.", "error");
      } else {
        showToast("유효하지 않은 팀 링크입니다.", "error");
      }
    } finally {
      setIsLoading(false);
      setIsButtonDisabled(false);
    }
  };

  return (
    <>
      <TeamFormLayout
        title="팀 참여하기"
        buttonLabel={isLoading ? "참여중..." : "참여하기"}
        placeholder="팀 링크를 입력해주세요."
        tip="공유받은 팀 링크를 입력해 참여할 수 있어요."
        onSubmit={handleJoin}
        inputValue={teamLink}
        onInputChange={handleInputChange}
        onInputBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        isInputError={isInputError}
        isButtonDisabled={isButtonDisabled || isLoading}
        errorMessage={isTouched && errorMessage !== "" ? errorMessage : ""}
      >
        <span className="inline-block font-medium text-lg pb-[0.75rem]">
          {TEAM_FORM_LABELS.LINK}
        </span>
      </TeamFormLayout>
    </>
  );
}
