"use client";
import ArticleDetail from "@/components/feature/Boards/Article/ArticleDetail";
import CommentList from "@/components/feature/Boards/Comment/CommentList";
import CommentForm from "@/components/feature/Boards/Comment/CommentForm";
import {
  useArticleDetail,
  useDeleteArticle,
} from "@/api/article/article.query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useArticleComments from "@/hooks/useArticleComments";

export default function ArticlePage() {
  const { articleId } = useParams();
  const { data: article } = useArticleDetail(articleId as string);
  const deleteArticleMutation = useDeleteArticle();
  const router = useRouter();
  const {
    comments,
    comment,
    setComment,
    createComment,
    editComment,
    deleteComment,
  } = useArticleComments(articleId as string);

  // 게시글 수정 -> 수정 페이지로 이동
  const handleEditArticle = () => router.push(`/boards/${articleId}/edit`);

  // 게시글 삭제 -> 성공 시 게시글 목록 페이지로 이동
  const handleDeleteArticle = (articleId: number) => {
    deleteArticleMutation.mutate(articleId.toString(), {
      onSuccess: () => router.push("/boards"),
    });
  };

  // LATER: 삭제 모달 및 토스트 팝업 추가
  const handleDeleteComment = (commentId: number) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      deleteComment(commentId);
    }
  };

  if (!article) return null;

  return (
    <article className="w-full">
      <ArticleDetail
        data={article}
        onEdit={handleEditArticle}
        onDelete={() => handleDeleteArticle(article.id)}
      />
      <CommentForm
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onSubmit={() => createComment(comment)}
      />
      <CommentList
        articleId={article.id}
        comments={comments}
        onEdit={editComment}
        onDelete={handleDeleteComment}
      />
    </article>
  );
}
