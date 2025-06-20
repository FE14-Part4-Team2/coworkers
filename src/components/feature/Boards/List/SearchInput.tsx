"use client";
import Image from "next/image";

interface SearchInputProps {
  value?: string;
  onChange?: (query: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <>
      <div className="flex items-center gap-6 sm:gap-10 mb-[2.5rem]">
        <span className="sm:text-2xl text-2lg text-text-primary">
          모집게시판
        </span>
        <span className="text-sm sm:text-md text-text-secondary">
          팀원을 모집하고, 일정을 함께 관리해보세요.
        </span>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full p-[1rem] h-[3rem] sm:h-[3.5rem] gap-[0.75rem] bg-bg-secondary border border-card-border rounded-xl flex"
      >
        <Image
          src="/icons/icon-search-gray.svg"
          alt="돋보기"
          width={24}
          height={24}
        />
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="검색어를 입력하세요"
          className="bg-bg-secondary w-full outline-none"
        />
      </form>
    </>
  );
}
