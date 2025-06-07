import { useRef, useState, useCallback } from "react";
import {
  processImageFile,
  removeImage,
  handleDragEvents,
} from "@/utils/imageUploadHelpers";

export const useImageUploader = (
  onChange?: (file: File | null) => void,
  disabled = false,
) => {
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

  const handleBoxClick = useCallback(() => {
    if (disabled) return;
    fileInputRef.current?.click();
  }, [disabled]);

  const handleRemove = useCallback(() => {
    if (disabled) return;
    removeImage(preview, fileInputRef, updateImage);
  }, [disabled, preview, updateImage]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      handleFileProcess(file);
    },
    [handleFileProcess],
  );

  const handleRemoveClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      handleRemove();
    },
    [handleRemove],
  );

  const dragHandlers = {
    onDragOver: (e: React.DragEvent<HTMLDivElement>) =>
      !disabled && handleDragEvents.onDragOver(e, setIsDragging),
    onDragLeave: (e: React.DragEvent<HTMLDivElement>) =>
      !disabled && handleDragEvents.onDragLeave(e, setIsDragging),
    onDrop: (e: React.DragEvent<HTMLDivElement>) =>
      !disabled && handleDragEvents.onDrop(e, setIsDragging, handleFileProcess),
  };

  return {
    fileInputRef,
    preview,
    isDragging,
    handleBoxClick,
    handleFileChange,
    handleRemoveClick,
    dragHandlers,
  };
};
