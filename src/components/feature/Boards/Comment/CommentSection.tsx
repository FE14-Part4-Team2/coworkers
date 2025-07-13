"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/authStore";
import CommentList from "@/components/feature/Boards/Comment/CommentList";
import CommentForm from "@/components/feature/Boards/Comment/CommentForm";
import NoAuthModal from "@/components/common/Modal/NoAuthModal";
import {
  useCreateArticleComment,
  useDeleteArticleComment,
  useEditArticleComment,
  useInfiniteArticleComments,
} from "@/api/article-comment/article-comment.query";

interface CommentSectionProps {
  articleId: string;
}

export default function CommentSection({ articleId }: CommentSectionProps) {
  const { isAuthenticated } = useAuthStore();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteArticleComments(articleId, {
      limit: 10,
    });

  console.log("Comments", data);

  const { mutate: createComment } = useCreateArticleComment();
  const { mutate: editComment } = useEditArticleComment();
  const { mutate: deleteComment } = useDeleteArticleComment();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleCreateComment = (content: string) => {
    if (articleId) {
      createComment({ articleId, body: { content } });
    }
  };

  const handleEditComment = (commentId: number, content: string) => {
    editComment({ commentId: commentId.toString(), body: { content } });
  };

  const handleDeleteComment = (commentId: number) => {
    deleteComment(commentId.toString());
  };

  const comments = data?.pages.flatMap((page) => page.list) ?? [];

  return (
    <>
      <CommentForm
        articleId={articleId}
        disabled={!isAuthenticated}
        createComment={handleCreateComment}
      />
      <CommentList
        comments={comments}
        editComment={handleEditComment}
        deleteComment={handleDeleteComment}
      />

      <div ref={observerRef} className="h-4" />
      {isFetchingNextPage && (
        <div className="text-center py-4">
          <p>댓글을 불러오는 중...</p>
        </div>
      )}

      <NoAuthModal />
    </>
  );
}
