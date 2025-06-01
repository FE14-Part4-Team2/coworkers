"use client";
import { useState, useCallback } from "react";
import Image from "next/image";

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchInput({
  placeholder = "검색어를 입력하세요",
  onSearch,
}: SearchInputProps) {
  const [value, setValue] = useState("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (onSearch) onSearch(value);
    },
    [onSearch, value],
  );

  return (
    <>
      <span className="text-2xl text-text-primary mb-[2.5rem]">자유게시판</span>
      <form
        onSubmit={handleSubmit}
        className="w-full p-[1rem] h-[3.5rem] gap-[0.75rem] bg-bg-secondary border border-card-border rounded-xl flex"
      >
        <Image
          src="/icons/icon-search-gray.svg"
          alt="돋보기"
          width={24}
          height={24}
        />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className="bg-bg-secondary w-full outline-none"
        />
      </form>
    </>
  );
}
