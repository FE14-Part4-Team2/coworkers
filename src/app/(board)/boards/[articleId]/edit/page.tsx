"use client";
import BoardsForm, {
  FormValues,
} from "@/components/feature/Boards/New/BoardsForm";
import { useArticleDetail, useEditArticle } from "@/api/article/article.query";
import { useRouter, useParams } from "next/navigation";
import { useMemo } from "react";
import { useImageUploadHandler } from "@/hooks/useImageUploadHandler";
import { useToastStore } from "@/stores/toastStore";
import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";

export default function BoardsEditPage() {
  const { user, isAuthenticated } = useAuthStore();
  const { articleId } = useParams();
  const router = useRouter();
  const { showToast } = useToastStore();
  const { data: article } = useArticleDetail(articleId as string);
  const { mutate: editArticle, isPending: isSubmitting } = useEditArticle(
    articleId as string,
  );

  useEffect(() => {
    if (isAuthenticated === false || user === undefined) {
      router.replace("/login");
    }
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    if (user && article && article.writer.id != user.id) {
      router.replace(`/boards/${articleId}`);
    }
  }, [user, article, articleId, router]);

  const { imageUrl, isImageUploading, handleImageUpload } =
    useImageUploadHandler();

  const defaultFormValues = useMemo(() => {
    let parsed = { content: "", token: "" };
    try {
      parsed = JSON.parse(article?.content ?? "");
    } catch {
      parsed = { content: article?.content ?? "", token: "" };
    }

    return {
      title: article?.title ?? "",
      content: parsed.content,
      token: parsed.token,
    };
  }, [article]);

  if (!article) return null;

  function handleSubmit(data: FormValues) {
    const contentPayload: { content: string; token?: string } = {
      content: data.content,
    };

    if (data.token?.trim()) {
      contentPayload.token = data.token;
    }

    const payload = {
      title: data.title,
      content: JSON.stringify(contentPayload),
      image: imageUrl === null ? null : (imageUrl ?? article?.image),
    };

    editArticle(payload, {
      onSuccess: () => {
        showToast("게시글 수정 완료!", "success");
        router.push(`/boards/${articleId}`);
      },
      onError: () => {
        showToast("게시글 수정 오류", "error");
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
