import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateArticleCommentRequest } from "./article-comment.schema";
import { CreateArticleCommentResponse } from "./article-comment.schema";
import { articleCommentService } from "./article-comment.service";

// 게시글 댓글 작성
export const useCreateArticleComment = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CreateArticleCommentResponse,
    Error,
    { articleId: string; body: CreateArticleCommentRequest }
  >({
    mutationFn: ({ articleId, body }) =>
      articleCommentService.createArticleComment(articleId, body),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["article"] });
    },
  });
};

// 게시글 댓글 불러오기
export const useGetArticleComment = (
  articleId: string,
  params: {
    limit: number;
    cursor?: number;
  },
) => {
  return useQuery({
    queryKey: ["articleComment", articleId, params],
    queryFn: () => articleCommentService.getArticleComment(articleId, params),
    enabled: !!articleId,
  });
};
