"use client";
import BoardsForm, {
  FormValues,
} from "@/components/feature/Boards/New/BoardsForm";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useCreateArticle } from "@/api/article/article.query";
import { useImageUploadHandler } from "@/hooks/useImageUploadHandler";
import { useToastStore } from "@/stores/toastStore";
import NoTokenModal from "@/components/common/Modal/NoTokenModal";
import { useModalStore } from "@/stores/modalStore";
import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";

export default function BoardsNewPage() {
  const router = useRouter();
  const createArticleMutation = useCreateArticle();
  const { showToast } = useToastStore();
  const { imageUrl, setImageUrl, isImageUploading, handleImageUpload } =
    useImageUploadHandler();
  const { openModal } = useModalStore();
  const [pendingFormData, setPendingFormData] = useState<FormValues | null>(
    null,
  );
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated === false || user === undefined) {
      router.replace("/login");
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = useCallback(
    (data: FormValues) => {
      if (isImageUploading) {
        showToast("이미지 업로드 중입니다.", "info");
        return;
      }

      if (!data.token) {
        setPendingFormData(data);
        openModal("no-token");
        return;
      }

      submitForm(data);
    },
    [isImageUploading, openModal, imageUrl],
  );

  if (user === undefined) return null;

  const submitForm = (data: FormValues) => {
    const payload = {
      title: data.title,
      content: JSON.stringify({
        content: data.content,
        token: data.token,
      }),
      ...(imageUrl && { image: imageUrl }),
    };

    createArticleMutation.mutate(payload, {
      onSuccess: () => {
        setImageUrl(undefined);
        showToast("게시글 등록 완료!", "success");
        router.push("/boards");
      },
    });
  };

  const isSubmitting = createArticleMutation.isPending || isImageUploading;

  return (
    <>
      <BoardsForm
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        imageUrl={imageUrl}
        onImageUpload={handleImageUpload}
        isImageUploading={isImageUploading}
        mode="create"
      />
      <NoTokenModal
        onConfirm={() => {
          if (pendingFormData) {
            submitForm(pendingFormData);
          }
        }}
      />
    </>
  );
}
