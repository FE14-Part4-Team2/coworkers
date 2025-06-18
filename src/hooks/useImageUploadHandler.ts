import { useState, useCallback } from "react";
import { useUploadImage } from "@/api/image/image-api";

// 이미지 업로드 공통 훅
export function useImageUploadHandler() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const uploadImageMutation = useUploadImage();

  const handleImageUpload = useCallback(
    (file: File | null) => {
      if (file) {
        setIsImageUploading(true);
        uploadImageMutation.mutate(file, {
          onSuccess: (url: string) => {
            setImageUrl(url);
            setIsImageUploading(false);
          },
          onError: () => {
            setIsImageUploading(false);
            alert("이미지 업로드에 실패했습니다.");
          },
        });
      } else {
        setImageUrl(null);
      }
    },
    [uploadImageMutation],
  );

  return { imageUrl, setImageUrl, isImageUploading, handleImageUpload };
}
