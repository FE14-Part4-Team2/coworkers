import Image from "next/image";
import { useAuthStore } from "@/stores/authStore";
import NoAuthModal from "@/components/common/Modal/NoAuthModal";
import { useModalStore } from "@/stores/modalStore";

interface WriteButtonProps {
  onClick: () => void;
}

export default function WriteButton({ onClick }: WriteButtonProps) {
  const { isAuthenticated } = useAuthStore();
  const { openModal } = useModalStore();

  const handleClick = () => {
    if (!isAuthenticated) {
      openModal("no-auth");
    } else {
      onClick();
    }
  };
  return (
    <>
      <button
        onClick={handleClick}
        className="flex fixed bottom-6 right-6 items-center gap-[0.25rem] whitespace-nowrap bg-brand-primary h-[3rem] w-[6.5rem] px-[1.3rem] py-[0.8rem] border border-none rounded-full z-10"
      >
        <Image src="/icons/icon-plus.svg" alt="플러스" width={16} height={16} />
        <span className="text-lg">글쓰기</span>
      </button>

      <NoAuthModal />
    </>
  );
}
