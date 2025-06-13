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
  const { comments, comment, setComment, createComment, editComment } =
    useArticleComments(articleId as string);

  // 게시글 수정 -> 수정 페이지로 이동
  const handleEditArticle = () => router.push(`/boards/${articleId}/edit`);

  // 게시글 삭제 -> 성공 시 게시글 목록 페이지로 이동
  const handleDeleteArticle = (articleId: number) => {
    deleteArticleMutation.mutate(articleId.toString(), {
      onSuccess: () => router.push("/boards"),
    });
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
      />
    </article>
  );
}
