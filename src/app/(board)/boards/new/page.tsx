"use client";
import BoardsForm, {
  FormValues,
} from "@/components/feature/Boards/New/BoardsForm";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useCreateArticle } from "@/api/article/article.query";
import { useUploadImage } from "@/api/image/image-api";

export default function BoardsNewPage() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const createArticleMutation = useCreateArticle();
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
        setImageUrl(undefined);
      }
    },
    [uploadImageMutation],
  );

  const handleSubmit = useCallback(
    (data: FormValues) => {
      const payload = {
        ...data,
        ...(imageUrl && { image: imageUrl }),
      };

      createArticleMutation.mutate(payload, {
        onSuccess: () => {
          setImageUrl(undefined);
          router.push("/boards");
        },
        onError: (error) => {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "게시글 등록에 실패했습니다.";
          alert(errorMessage);
        },
      });
    },
    [createArticleMutation, imageUrl, router],
  );

  const isSubmitting = createArticleMutation.isPending || isImageUploading;

  return (
    <BoardsForm
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      imageUrl={imageUrl}
      onImageUpload={handleImageUpload}
      isImageUploading={isImageUploading}
    />
  );
}
