"use client";
import Image from "next/image";
import { useRef, useState, DragEvent } from "react";

export default function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const uploaderBoxStyle = [
    "relative",
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
      <div
        className={uploaderBoxStyle}
        tabIndex={0}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-black/50 rounded-full w-7 h-7 flex items-center justify-center z-10"
            tabIndex={-1}
            aria-label="이미지 삭제"
          >
            <span className="text-white text-lg">&times;</span>
          </button>
        )}
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
              onClick={handleBoxClick}
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
