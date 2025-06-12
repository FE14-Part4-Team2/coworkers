"use client";
import Image from "next/image";
import {
  containerStyle,
  inputBorderStyle,
  interactionStyle,
} from "@/components/common/Input/Input";
import { useImageUploader } from "@/hooks/useImageUploader";
import { useEffect } from "react";

interface ImageUploaderProps {
  onChange?: (file: File | null) => void;
  disabled?: boolean;
  imageUrl?: string;
}

export default function ImageUploader({
  onChange,
  disabled = false,
  imageUrl,
}: ImageUploaderProps) {
  const {
    fileInputRef,
    preview,
    setPreview,
    isDragging,
    handleBoxClick,
    handleFileChange,
    handleRemoveClick,
    dragHandlers,
  } = useImageUploader(onChange, disabled);

  useEffect(() => {
    if (imageUrl && !preview) {
      setPreview(imageUrl);
    }
  }, [imageUrl]);

  const uploaderBoxStyle = [
    containerStyle,
    inputBorderStyle(false),
    interactionStyle,
    isDragging ? "border-interaction-focus bg-bg-hover" : "",
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
    "w-[10rem] h-[10rem] sm:w-[15rem] sm:h-[15rem] flex-col gap-[0.75rem] items-center justify-center cursor-pointer",
  ].join(" ");

  return (
    <div className="flex flex-col gap-[1rem] mb-0 sm:mb-[1rem] mt-[1.5rem] sm:mt-[2rem] md:mt-[2.5rem]">
      <span className="text-md sm:text-lg text-text-primary">이미지</span>
      <div
        className={uploaderBoxStyle}
        tabIndex={0}
        onDragOver={dragHandlers.onDragOver}
        onDragLeave={dragHandlers.onDragLeave}
        onDrop={dragHandlers.onDrop}
        onClick={handleBoxClick}
        role="button"
        aria-label={preview ? "이미지 변경" : "이미지 업로드"}
      >
        {preview && (
          <button
            type="button"
            onClick={handleRemoveClick}
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
            className="w-full h-full object-cover rounded-lg"
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
          disabled={disabled}
          aria-label="이미지 파일 선택"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
