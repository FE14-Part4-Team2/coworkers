import Image from "next/image";

interface EmptyCardProps {
  keyword?: string;
}

export default function EmptyCard({ keyword }: EmptyCardProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-75 sm:h-[25rem] gap-5 sm:gap-6 bg-gradient-to-br from-bg-primary to-emerald-50/20 rounded-xl border border-card-border shadow-sm">
      <div className="relative w-[6rem] h-[6rem] sm:w-[10rem] sm:h-[10rem] mt-4 sm:mt-0">
        <Image
          src="/icons/icon-search-empty.svg"
          alt="검색 결과 없음"
          fill
          className="object-contain opacity-80"
        />
      </div>

      <p className="text-lg sm:text-xl font-semibold text-text-primary text-center">
        {keyword ? (
          <>
            <span className="text-brand-primary font-bold">"{keyword}" </span>에
            대한 검색결과가 없어요
          </>
        ) : (
          <>아직 등록된 게시글이 없어요</>
        )}
      </p>

      <p className="text-sm sm:text-lg text-text-secondary text-center">
        {keyword
          ? "다른 키워드로 다시 검색해보세요!"
          : "가장 먼저 게시글을 등록해보는 건 어때요?"}
      </p>

      <div className="flex gap-1 mb-3">
        <div className="w-2 h-2 bg-brand-primary/30 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-brand-secondary/30 rounded-full animate-pulse delay-150"></div>
        <div className="w-2 h-2 bg-brand-tertiary/30 rounded-full animate-pulse delay-300"></div>
      </div>
    </div>
  );
}
