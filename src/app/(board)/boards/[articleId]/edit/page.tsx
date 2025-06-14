"use client";
import BoardsForm, {
  FormValues,
} from "@/components/feature/Boards/New/BoardsForm";
import { useArticleDetail, useEditArticle } from "@/api/article/article.query";
import { useRouter, useParams } from "next/navigation";
import { useMemo } from "react";
import { useImageUploadHandler } from "@/hooks/useImageUploadHandler";
import { useToastStore } from "@/stores/toastStore";

export default function BoardsEditPage() {
  const { articleId } = useParams();
  const router = useRouter();
  const { showToast } = useToastStore();
  const { data: article, isLoading } = useArticleDetail(articleId as string);
  const { mutate: editArticle, isPending: isSubmitting } = useEditArticle(
    articleId as string,
  );
  const { imageUrl, isImageUploading, handleImageUpload } =
    useImageUploadHandler();

  const defaultFormValues = useMemo(
    () => ({
      title: article?.title ?? "",
      content: article?.content ?? "",
    }),
    [article?.title, article?.content],
  );

  if (isLoading || !article) return null;

  function handleSubmit(data: FormValues) {
    const payload = {
      ...data,
      image: imageUrl ?? article?.image ?? undefined,
    };
    editArticle(payload, {
      onSuccess: () => {
        router.push(`/boards/${articleId}`);
      },
      onError: () => {
        showToast("수정 중 오류가 발생했습니다.", "error");
      },
    });
  }

  return (
    <BoardsForm
      mode="edit"
      articleId={articleId as string}
      isSubmitting={isSubmitting || isImageUploading}
      onSubmit={handleSubmit}
      imageUrl={imageUrl ?? article.image ?? ""}
      onImageUpload={handleImageUpload}
      isImageUploading={isImageUploading}
      defaultValues={defaultFormValues}
    />
  );
}
