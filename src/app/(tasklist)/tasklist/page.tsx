"use client";

import { useModalStore } from "@/stores/modalStore";
import Modal from "@/components/common/Modal";
import Image from "next/image";

export default function Page() {
  const { isOpen, openModal, closeModal } = useModalStore();

  return (
    <div>
      <button onClick={openModal}>모달 열기</button>

      {isOpen && (
        <Modal>
          <div>
            <h2>모달 제목</h2>
            <p>모달 내용</p>

            <button onClick={closeModal} className="absolute top-3 right-3">
              <Image
                src="/icons/icon-close.svg"
                width={24}
                height={24}
                alt="close"
                priority
              />
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
