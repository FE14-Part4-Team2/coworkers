"use client";
import { useState } from "react";

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchInput({
  placeholder = "검색어를 입력하세요",
  onSearch,
}): SearchInputProps {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(value);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full p-[1rem] h-[3.5rem] bg-bg-secondary border border-card-border rounded-xl"
      >
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </form>
    </>
  );
}
