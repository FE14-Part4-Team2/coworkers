"use client";
import ArticleDetail from "@/components/feature/Boards/Article/ArticleDetail";
import CommentList from "@/components/feature/Boards/Comment/CommentList";
import CommentForm from "@/components/feature/Boards/Comment/CommentForm";
import { useArticleDetail } from "@/api/article/article.query";
import { useParams } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import NoAuthModal from "@/components/common/Modal/NoAuthModal";
import { useState, useEffect, useRef } from "react";
import {
  useCreateArticleComment,
  useDeleteArticleComment,
  useEditArticleComment,
  useInfiniteArticleComments,
} from "@/api/article-comment/article-comment.query";

export default function ArticlePage() {
  const { articleId } = useParams();
  const { isAuthenticated } = useAuthStore();
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [comment, setComment] = useState("");
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data: article } = useArticleDetail(articleId as string);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteArticleComments(articleId as string, {
      limit: 10,
    });
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
      createComment({ articleId: articleId.toString(), body: { content } });
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
    <article className="w-full">
      {article && <ArticleDetail data={article} />}
      <CommentForm
        articleId={articleId as string}
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
    </article>
  );
}
