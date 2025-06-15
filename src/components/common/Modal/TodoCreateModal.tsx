"use client";

import { useModalStore } from "@/stores/modalStore";
import Modal from "./Modal";
import Input from "../Input/Input";

interface TodoCreateModalProps {
  formData: {
    title: string;
    memo: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function TodoCreateModal({
  formData,
  onChange,
  onSubmit,
}: TodoCreateModalProps) {
  const { isOpen, modalType } = useModalStore();

  if (!isOpen || modalType !== "todo-create") return null;

  return (
    <Modal
      title="새로운 목록 추가"
      description={`할 일에 대한 목록을 추가하고\n목록별 할 일을 만들 수 있습니다.`}
      buttonType="single-green"
      confirmText="만들기"
      confirmButtonType="submit"
      onSubmit={onSubmit}
    >
      <div className="my-4">
        <Input
          id="todo-title"
          name="title"
          type="text"
          label="할 일 제목"
          placeholder="할 일 제목을 입력해주세요."
          value={formData.title}
          onChange={onChange}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-lg font-medium text-text-primary mb-2">
          할 일 메모
        </label>
        <textarea
          name="memo"
          placeholder="메모를 입력해주세요."
          className="w-full border border-border-primary/10 rounded-xl px-4 py-3 bg-bg-secondary text-text-primary text-lg placeholder:text-text-default placeholder:text-lg placeholder:font-normal"
          value={formData.memo}
          onChange={onChange}
        />
      </div>
    </Modal>
  );
}
