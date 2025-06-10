import { useMutation, useQueryClient } from "@tanstack/react-query";
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
