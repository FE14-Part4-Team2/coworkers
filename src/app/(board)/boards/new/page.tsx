"use client";
import BoardsForm, {
  FormValues,
} from "@/components/feature/Boards/New/BoardsForm";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useCreateArticle } from "@/api/article/article.query";
import { useImageUploadHandler } from "@/hooks/useImageUploadHandler";

export default function BoardsNewPage() {
  const router = useRouter();
  const createArticleMutation = useCreateArticle();
  const { imageUrl, setImageUrl, isImageUploading, handleImageUpload } =
    useImageUploadHandler();

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
      });
    },
    [createArticleMutation, imageUrl, router, setImageUrl],
  );

  const isSubmitting = createArticleMutation.isPending || isImageUploading;

  return (
    <BoardsForm
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      imageUrl={imageUrl}
      onImageUpload={handleImageUpload}
      isImageUploading={isImageUploading}
      mode="create"
    />
  );
}
