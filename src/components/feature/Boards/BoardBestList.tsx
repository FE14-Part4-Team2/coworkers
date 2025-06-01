import ShortCard from "./ShortCard";
import Image from "next/image";

export default function BoardBestList() {
  return (
    <>
      <div className="flex items-center mt-[2.5rem] justify-between mb-[3.5rem]">
        <span className="text-xl text-text-primary">베스트 게시글</span>
        <div className="flex gap-[0.1rem]">
          <span className="text-text-disabled">더보기</span>
          <Image
            src="/icons/icon-arrow_right.svg"
            alt="오른쪽 화살표"
            width={16}
            height={16}
          />
        </div>
      </div>
      <div className="flex gap-[1.5rem]">
        <ShortCard
          date="2025.06.17"
          title="6월에 같이 팀하면서 일정 관리하고 공유하실 분!"
          writer="이나경"
          likes={10}
        />
      </div>
    </>
  );
}
