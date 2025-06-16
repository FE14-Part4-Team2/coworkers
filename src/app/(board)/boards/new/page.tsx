"use client";
import BoardsForm, {
  FormValues,
} from "@/components/feature/Boards/New/BoardsForm";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useCreateArticle } from "@/api/article/article.query";
import { useImageUploadHandler } from "@/hooks/useImageUploadHandler";
import { useToastStore } from "@/stores/toastStore";

export default function BoardsNewPage() {
  const router = useRouter();
  const createArticleMutation = useCreateArticle();
  const { showToast } = useToastStore();
  const { imageUrl, setImageUrl, isImageUploading, handleImageUpload } =
    useImageUploadHandler();

  const handleSubmit = useCallback(
    (data: FormValues) => {
      const contentPayload: { content: string; token?: string } = {
        content: data.content,
      };

      if (data.token?.trim()) {
        contentPayload.token = data.token;
      }

      const payload = {
        title: data.title,
        content: JSON.stringify(contentPayload),
        ...(imageUrl && { image: imageUrl }),
      };

      createArticleMutation.mutate(payload, {
        onSuccess: () => {
          setImageUrl(undefined);
          showToast("게시글 등록 완료!", "success");
          router.push("/boards");
        },
      });
    },
    [createArticleMutation, imageUrl, router, setImageUrl, showToast],
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
