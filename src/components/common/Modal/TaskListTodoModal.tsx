import { useModalStore } from "@/stores/modalStore";
import Modal from "./Modal";
import Input from "../Input/Input";

interface TodoModalProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function TaskListTodoModal({
  value,
  onChange,
  onSubmit,
}: TodoModalProps) {
  const { isOpen, modalType } = useModalStore();

  if (!isOpen || modalType !== "taskListTodo") return null;

  return (
    <Modal
      title="새로운 목록 추가"
      description={`할 일에 대한 목록을 추가하고\n목록별 할 일을 만들 수 있습니다.`}
      buttonType="single-green"
      confirmText="만들기"
      confirmButtonType="submit"
      onSubmit={onSubmit}
    >
      <div className="mt-4 mb-6">
        <Input
          id="list"
          placeholder="목록 명을 입력해주세요."
          value={value}
          label="목록 이름"
          onChange={onChange}
          required
        />
      </div>
    </Modal>
  );
}
