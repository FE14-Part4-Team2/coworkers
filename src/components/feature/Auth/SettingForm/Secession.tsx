"use client";

import { useDeleteMyInfoMutation } from "@/api/user/user.query";
import DeleteAccountModal from "@/components/common/Modal/DeleteAccountModal";
import { useModalStore } from "@/stores/modalStore";
import Image from "next/image";
import React from "react";

function Secession() {
  const { openModal } = useModalStore();
  const deleteMyInfoMutation = useDeleteMyInfoMutation();

  const openDeleteAccountModal = () => {
    openModal("delete-account");
  };

  const handleDeleteAccount = () => {
    deleteMyInfoMutation.mutate();
  };

  return (
    <>
      <button
        type="button"
        className="flex items-center gap-2 mt-6 text-lg text-status-danger"
        onClick={openDeleteAccountModal}
      >
        <Image
          src="icons/icon-secession.svg"
          width={24}
          height={24}
          alt="탈퇴하기 아이콘"
        />
        회원 탈퇴하기
      </button>
      <DeleteAccountModal onConfirm={handleDeleteAccount} />
    </>
  );
}

export default Secession;
