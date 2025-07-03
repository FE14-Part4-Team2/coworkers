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
import { useMemo } from "react";

export default function BoardsNewPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const { showToast } = useToastStore();
  const { openModal } = useModalStore();
  const [pendingFormData, setPendingFormData] = useState<FormValues | null>(
    null,
  );
  const { imageUrl, setImageUrl, isImageUploading, handleImageUpload } =
    useImageUploadHandler();

  const { mutate: createArticle, isPending: isCreatingArticle } =
    useCreateArticle({
      onSuccess: () => {
        // reset();
        setImageUrl(undefined);
      },
    });

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

  const submitForm = useCallback(
    (data: FormValues) => {
      const payload = {
        title: data.title,
        content: JSON.stringify({
          content: data.content,
          token: data.token,
        }),
        ...(imageUrl && { image: imageUrl }),
      };

      createArticle(payload);
    },
    [createArticle, imageUrl],
  );

  const isSubmitting = useMemo(
    () => isCreatingArticle || isImageUploading,
    [isCreatingArticle, isImageUploading],
  );

  if (user === undefined) return null;

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
