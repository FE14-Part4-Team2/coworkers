"use client";
import ArticleDetail from "@/components/feature/Boards/Article/ArticleDetail";
import CommentList from "@/components/feature/Boards/Comment/CommentList";
import CommentForm from "@/components/feature/Boards/Comment/CommentForm";
import { useArticleDetail } from "@/api/article/article.query";
import { useParams } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import NoAuthModal from "@/components/common/Modal/NoAuthModal";
import { useState } from "react";
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

  const { data: article } = useArticleDetail(articleId as string);
  const { data } = useInfiniteArticleComments(articleId as string, {
    limit: 10,
  });
  const { mutate: createComment } = useCreateArticleComment();
  const { mutate: editComment } = useEditArticleComment();
  const { mutate: deleteComment } = useDeleteArticleComment();

  if (!article) return null;

  const comments = data?.pages.flatMap((page) => page.list) ?? [];

  return (
    <article className="w-full">
      <ArticleDetail data={article} />
      <CommentForm
        articleId={articleId as string}
        disabled={!isAuthenticated}
        createComment={(content) => {
          if (articleId) {
            createComment({
              articleId: articleId.toString(),
              body: { content },
            });
          }
          setComment("");
        }}
      />
      <CommentList
        comments={comments}
        editComment={(commentId, content) =>
          editComment({ commentId: commentId.toString(), body: { content } })
        }
        deleteComment={(commentId) => deleteComment(commentId.toString())}
      />

      <NoAuthModal />
    </article>
  );
}
