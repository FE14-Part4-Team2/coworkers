import Image from "next/image";

interface WriteButtonProps {
  onClick: () => void;
}

export default function WriteButton({ onClick }: WriteButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex fixed bottom-6 right-6 items-center gap-[0.25rem] whitespace-nowrap bg-brand-primary h-[3rem] w-[6.5rem] px-[1.3rem] py-[0.8rem] border border-none rounded-full z-10"
    >
      <Image src="/icons/icon-plus.svg" alt="플러스" width={16} height={16} />
      <span className="text-lg">글쓰기</span>
    </button>
  );
}
