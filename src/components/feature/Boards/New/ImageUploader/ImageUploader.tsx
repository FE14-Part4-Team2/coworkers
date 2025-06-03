"use client";
import Image from "next/image";
import { useRef, useState } from "react";

export default function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const uploaderBoxStyle = [
    "w-[15rem] h-[15rem]",
    "flex flex-col gap-[0.75rem] items-center justify-center",
    "rounded-xl bg-bg-secondary",
    "border border-card-border",
    "focus-within:border-interaction-focus hover:border-interaction-hover",
    "transition-colors duration-200",
    "cursor-pointer",
  ].join(" ");

  return (
    <div className="flex flex-col gap-[1rem] mt-[2.5rem]">
      <span className="text-lg text-text-primary">이미지</span>
      <div className={uploaderBoxStyle} tabIndex={0} onClick={handleBoxClick}>
        {preview ? (
          <img
            src={preview}
            alt="미리보기"
            className="object-cover rounded-lg"
          />
        ) : (
          <>
            <Image
              src="/icons/icon-plus-gray.svg"
              alt="이미지 추가"
              width={48}
              height={48}
            />
            <span className="text-image-label text-lg">이미지 등록</span>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
