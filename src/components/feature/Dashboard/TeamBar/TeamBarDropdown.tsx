"use client";

import { useDeleteGroup } from "@/api/group/group.query";
import DropDownItem from "@/components/common/Dropdown/Item";
import DropDownMenu from "@/components/common/Dropdown/Menu";
import DeleteModal from "@/components/common/Modal/DeleteModal";
import useClickOutside from "@/hooks/useClickOutside";
import { useModalStore } from "@/stores/modalStore";
import { useToastStore } from "@/stores/toastStore";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function TeamBarDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { teamId } = useParams();
  const { openModal, closeModal } = useModalStore();
  const { showToast } = useToastStore();

  const deleteGroupMutation = useDeleteGroup(teamId as string);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleEdit = useCallback(() => {
    router.push(`/${teamId}/edit`);
  }, [router, teamId]);

  const handleDelete = useCallback(() => {
    setIsOpen(false);
    openModal("delete");
  }, [openModal]);

  const handleConfirmDelete = useCallback(() => {
    deleteGroupMutation.mutate(undefined, {
      onSuccess: () => {
        closeModal();
        router.push("/");
      },
      onError: () => {
        closeModal();
        showToast("팀 삭제 중 오류 발생", "error");
      },
    });
  }, [deleteGroupMutation, closeModal, router, showToast]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const dropdownRef = useClickOutside(closeDropdown);

  return (
    <div ref={dropdownRef} className="relative z-10">
      <Image
        src="/icons/icon-setting.svg"
        alt="setting"
        width={24}
        height={24}
        className={`cursor-pointer transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        onClick={toggleOpen}
      />
      <DropDownMenu
        isOpen={isOpen}
        className="absolute mt-2 right-0 text-center w-[7.5rem]"
      >
        <DropDownItem onClick={handleEdit}>수정하기</DropDownItem>
        <DropDownItem onClick={handleDelete}>삭제하기</DropDownItem>
      </DropDownMenu>
      <DeleteModal
        title="팀을 삭제하시겠습니까?"
        description={`해당 팀의 할 일, 멤버 등 모든 정보가 삭제됩니다.`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
