"use client";
import Image from "next/image";
import { useRef, useState, DragEvent } from "react";
import {
  containerStyle,
  inputBorderStyle,
  interactionStyle,
} from "@/components/common/Input/Input";

interface ImageUploaderProps {
  onChange?: (file: File | null) => void;
}

export default function ImageUploader({ onChange }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setPreview(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onChange?.(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
      setImageFile(file);
      onChange?.(file);
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
      setImageFile(file);
      onChange?.(file);
    }
  };

  const uploaderBoxStyle = [
    containerStyle,
    inputBorderStyle(false),
    interactionStyle,
    isDragging ? "border-interaction-focus bg-bg-hover" : "",
    "w-[10rem] h-[10rem] sm:w-[15rem] sm:h-[15rem] flex-col gap-[0.75rem] items-center justify-center cursor-pointer",
  ].join(" ");

  return (
    <div className="flex flex-col gap-[1rem] mb-0 sm:mb-[1rem] mt-[1.5rem] sm:mt-[2rem] md:mt-[2.5rem]">
      <span className="text-md sm:text-lg text-text-primary">이미지</span>
      <div
        className={uploaderBoxStyle}
        tabIndex={0}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBoxClick}
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
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
