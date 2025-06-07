import { DragEvent } from "react";

export const processImageFile = (
  file: File | null,
  currentPreview: string | null,
  onUpdate: (preview: string | null, file: File | null) => void,
) => {
  if (file && file.type.startsWith("image/")) {
    if (currentPreview) {
      URL.revokeObjectURL(currentPreview);
    }

    const newPreview = URL.createObjectURL(file);
    onUpdate(newPreview, file);
  }
};

export const removeImage = (
  currentPreview: string | null,
  fileInputRef: React.RefObject<HTMLInputElement | null>,
  onUpdate: (preview: string | null, file: File | null) => void,
) => {
  if (currentPreview) {
    URL.revokeObjectURL(currentPreview);
  }

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }

  onUpdate(null, null);
};

export const handleDragEvents = {
  onDragOver: (
    e: DragEvent<HTMLDivElement>,
    setIsDragging: (value: boolean) => void,
  ) => {
    e.preventDefault();
    setIsDragging(true);
  },

  onDragLeave: (
    e: DragEvent<HTMLDivElement>,
    setIsDragging: (value: boolean) => void,
  ) => {
    e.preventDefault();
    setIsDragging(false);
  },

  onDrop: (
    e: DragEvent<HTMLDivElement>,
    setIsDragging: (value: boolean) => void,
    processFile: (file: File | null) => void,
  ) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] || null;
    processFile(file);
  },
};
