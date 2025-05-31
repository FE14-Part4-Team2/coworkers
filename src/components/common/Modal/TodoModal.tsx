import { useModalStore } from "@/stores/modalStore";
import Modal from "./Modal";
import Input from "../Input/Input";

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
      <Input
        id="list"
        placeholder="목록 명을 입력해주세요."
        value={value}
        onChange={onChange}
        required
      />
    </Modal>
  );
}
