"use client";

import { useModalStore } from "@/stores/modalStore";
import { useState } from "react";
import InviteModal from "@/components/Modal/InviteModal";
import TodoModal from "@/components/Modal/TodoModal";
import TodoCreateModal from "@/components/Modal/TodoCreateModal";
import PasswordResetModal from "@/components/Modal/PasswordResetModal";
import ProfileModal from "@/components/Modal/ProfileModal";
import DeleteAccountModal from "@/components/Modal/DeleteAccountModal";
import LogoutModal from "@/components/Modal/LogoutModal";
import PasswordChangeModal from "@/components/Modal/PasswordChangeModal";

const users = [
  {
    id: 1,
    name: "김성빈",
    email: "seongbin@naver.com",
    image: "/icons/icon-profile-default.svg",
  },
  {
    id: 2,
    name: "홍길동",
    email: "hong@naver.com",
    image: "/icons/icon-profile-default.svg",
  },
];

export default function ExamplePage() {
  const { openModal, closeModal } = useModalStore();
  const [selectedUser, setSelectedUser] = useState<null | (typeof users)[0]>(
    null,
  );
  const [task, setTask] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    memo: "",
  });
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [email, setEmail] = useState("");

  const handleCopyLink = () => {
    console.log("링크 복사");
  };

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!task.trim()) {
      alert("할 일을 입력하세요!");
      return;
    }

    console.log("할 일 만들기:", task);
    setTask("");
    closeModal();
  };

  const handleCreateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("할 일 생성됨!", formData);
  };

  const handlEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("링크를 보냈습니다.", email);
  };
  const handleUserClick = (user: (typeof users)[0]) => {
    setSelectedUser(user);
    openModal("profile");
  };

  const handleCopyEmail = () => {
    if (selectedUser) {
      navigator.clipboard.writeText(selectedUser.email);
      console.log(selectedUser.email);
    }
  };

  const handleDeleteAccount = () => console.log("회원 탈퇴");
  const handleLogout = () => console.log("로그아웃");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.newPassword !== password.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    console.log("비밀번호 변경 요청:", password);
  };

  const buttonClass =
    "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition";

  return (
    <>
      <div className="flex justify-center space-x-4">
        <button className={buttonClass} onClick={() => openModal("invite")}>
          초대 모달 열기
        </button>

        <button className={buttonClass} onClick={() => openModal("todo")}>
          할일 모달 열기
        </button>

        <button
          className={buttonClass}
          onClick={() => openModal("todo-create")}
        >
          새로운 목록 추가 모달 열기
        </button>

        <button
          className={buttonClass}
          onClick={() => openModal("password-reset")}
        >
          비밀번호 재설정 모달 열기
        </button>

        <button
          className={buttonClass}
          onClick={() => openModal("delete-account")}
        >
          회원 탈퇴하기 모달 열기
        </button>
        <button className={buttonClass} onClick={() => openModal("logout")}>
          로그아웃 모달 열기
        </button>

        <button
          className={buttonClass}
          onClick={() => openModal("password-change")}
        >
          비밀번호 변경 모달
        </button>
      </div>
      <ul className="flex justify-center space-x-4 mt-4">
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => handleUserClick(user)}
            className="w-[400px] h-[100px] bg-blue-500 text-white rounded-lg shadow-md flex items-center justify-center cursor-pointer"
          >
            {`${user.name} 프로필 카드`}
          </li>
        ))}
      </ul>

      <InviteModal onCopy={handleCopyLink} />
      <TodoModal
        value={task}
        onChange={handleTaskChange}
        onSubmit={handleTaskSubmit}
      />
      <TodoCreateModal
        formData={formData}
        onChange={handleCreateChange}
        onSubmit={handleCreateSubmit}
      />
      <PasswordResetModal
        value={email}
        onChange={handlEmailChange}
        onSubmit={handleEmailSubmit}
      />
      <DeleteAccountModal onConfirm={handleDeleteAccount} />
      <LogoutModal onConfirm={handleLogout} />
      <PasswordChangeModal
        formData={password}
        onChange={handlePasswordChange}
        onSubmit={handlePasswordSubmit}
      />
      {selectedUser && (
        <ProfileModal
          name={selectedUser.name}
          email={selectedUser.email}
          profileImageUrl={selectedUser.image}
          onCopy={handleCopyEmail}
        />
      )}
    </>
  );
}
