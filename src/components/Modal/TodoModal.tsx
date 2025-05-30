import { useModalStore } from "@/stores/modalStore";
import Modal from "./Modal";

interface TodoModalProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function TodoModal({
  value,
  onChange,
  onSubmit,
}: TodoModalProps) {
  const { isOpen, modalType } = useModalStore();

  if (!isOpen || modalType !== "todo") return null;

  return (
    <Modal
      title="할 일 목록"
      buttonType="single-green"
      confirmText="만들기"
      confirmButtonType="submit"
      onSubmit={onSubmit}
    >
      <input
        type="text"
        placeholder="목록 명을 입력해주세요."
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        value={value}
        onChange={onChange}
      />
    </Modal>
  );
}
