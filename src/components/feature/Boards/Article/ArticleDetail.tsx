"use client";
import { ArticleDetailType } from "@/api/article/article.schema";
import { useDeleteArticle } from "@/api/article/article.query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LikeButton from "./LikeButton";
import CommentDropdown from "../Comment/CommentDropdown";
import { useAuthStore } from "@/stores/authStore";
import { useModalStore } from "@/stores/modalStore";
import { useToastStore } from "@/stores/toastStore";
import DeleteModal from "@/components/common/Modal/DeleteModal";

interface ArticleDetailProps {
  data: ArticleDetailType;
}

export default function ArticleDetail({ data }: ArticleDetailProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { openModal, closeModal } = useModalStore();
  const { showToast } = useToastStore();
  const deleteArticleMutation = useDeleteArticle();

  const isMyArticle = user?.id === data.writer.id;

  const handleEdit = () => {
    router.push(`/boards/${data.id}/edit`);
  };

  const handleDeleteClick = () => {
    openModal("delete-article");
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteArticleMutation.mutateAsync(data.id.toString());
      closeModal();
      showToast("게시글 삭제 완료!", "success");

      setTimeout(() => {
        router.push("/boards");
      }, 500);
    } catch {
      closeModal();
      showToast("삭제 중 오류가 발생하였습니다.", "error");
    }
  };

  return (
    <>
      <DeleteModal
        title="게시글을 삭제하시겠습니까?"
        description="삭제된 게시글은 복구할 수 없습니다."
        onConfirm={handleDeleteConfirm}
        modalType="delete-article"
      />

      <div className="flex justify-between items-center mb-5">
        <h1 className="text-lg sm:text-2lg text-text-secondary font-medium">
          {data.title}
        </h1>
        {isMyArticle && (
          <CommentDropdown
            isEditing={false}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        )}
      </div>

      <hr className="w-full border-t border-border-primary opacity-10" />

      <div className="flex justify-between items-center mt-5">
        <div className="flex items-center gap-4 sm:gap-8 md:gap-20">
          <span className="text-text-primary text-sm sm:text-md">
            {data.writer.nickname}
          </span>
          <span className="text-interaction-inactive text-sm sm:text-md">
            {data.updatedAt.slice(0, 10).replace(/-/g, ".")}
          </span>
        </div>
      </div>

      {data.image && (
        <div className="mt-6">
          <Image
            src={data.image}
            alt={data.title || "게시글 이미지"}
            width={400}
            height={400}
            className="rounded-lg object-cover"
            priority={false}
          />
        </div>
      )}

      <section className="text-text-secondary text-md sm:text-lg py-12 sm:py-16 whitespace-pre-line !leading-6">
        {data.content}
      </section>

      <div className="flex items-center gap-4 border-b pb-6 mb-12">
        <div className="flex items-center gap-3">
          <Image
            src="/icons/icon-comment.svg"
            alt="댓글"
            width={28}
            height={28}
          />
          <span className="text-text-primary text-base">
            {data.commentCount}개의 댓글
          </span>
        </div>
        <LikeButton
          isLiked={data.isLiked}
          articleId={data.id}
          likeCount={data.likeCount}
        />
      </div>
    </>
  );
}
