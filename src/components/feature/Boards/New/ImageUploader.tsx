"use client";
import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import {
  processImageFile,
  removeImage,
  handleDragEvents,
} from "@/utils/imageUploadHelpers";
import {
  containerStyle,
  inputBorderStyle,
  interactionStyle,
} from "@/components/common/Input/Input";

interface ImageUploaderProps {
  onChange?: (file: File | null) => void;
  disabled?: boolean;
}

export default function ImageUploader({
  onChange,
  disabled = false,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const updateImage = useCallback(
    (newPreview: string | null, file: File | null) => {
      setPreview(newPreview);
      onChange?.(file);
    },
    [onChange],
  );

  const handleFileProcess = useCallback(
    (file: File | null) => {
      if (disabled) return;
      processImageFile(file, preview, updateImage);
    },
    [disabled, preview, updateImage],
  );

  const handleBoxClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const handleRemove = useCallback(() => {
    if (disabled) return;
    removeImage(preview, fileInputRef, updateImage);
  }, [disabled, preview, updateImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileProcess(file);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleRemove();
  };

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
        onDragOver={(e) =>
          !disabled && handleDragEvents.onDragOver(e, setIsDragging)
        }
        onDragLeave={(e) =>
          !disabled && handleDragEvents.onDragLeave(e, setIsDragging)
        }
        onDrop={(e) =>
          !disabled &&
          handleDragEvents.onDrop(e, setIsDragging, handleFileProcess)
        }
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
