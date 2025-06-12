"use client";
import BoardsForm, {
  FormValues,
} from "@/components/feature/Boards/New/BoardsForm";
import { useArticleDetail, useEditArticle } from "@/api/article/article.query";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useUploadImage } from "@/api/image/image-api";
import { useMemo } from "react";
import { useParams } from "next/navigation";

export default function BoardsEditPage() {
  const { articleId } = useParams();
  const router = useRouter();

  const { data: article, isLoading } = useArticleDetail(articleId as string);

  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const uploadImageMutation = useUploadImage();

  const { mutate: editArticle, isPending: isSubmitting } = useEditArticle(
    articleId as string,
  );

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
        image: imageUrl ?? article?.image ?? undefined,
      };

      editArticle(payload, {
        onSuccess: () => {
          router.push(`/boards/${articleId}`);
        },
        onError: (error) => {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "게시글 수정에 실패했습니다.";
          alert(errorMessage);
        },
      });
    },
    [editArticle, imageUrl, article, router, articleId],
  );

  const defaultFormValues = useMemo(
    () => ({
      title: article?.title ?? "",
      content: article?.content ?? "",
    }),
    [article?.title, article?.content],
  );

  if (isLoading || !article) return <div>로딩 중...</div>;

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
