import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateArticleCommentRequest,
  UpdateArticleCommentRequest,
} from "./article-comment.schema";
import { CreateArticleCommentResponse } from "./article-comment.schema";
import { articleCommentService } from "./article-comment.service";
import { UpdateArticleCommentResponse } from "./article-comment.schema";

type GetArticleCommentParams = {
  limit: number;
  cursor?: number;
};

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

    onSuccess: (_, { articleId }) => {
      queryClient.invalidateQueries({ queryKey: ["article"] });
      queryClient.invalidateQueries({
        queryKey: ["articleComment", articleId],
      });
    },
  });
};

// 게시글 댓글 불러오기
export const useGetArticleComment = (
  articleId: string,
  params: GetArticleCommentParams,
) => {
  return useQuery({
    queryKey: ["articleComment", articleId, params],
    queryFn: () => articleCommentService.getArticleComment(articleId, params),
    enabled: !!articleId,
  });
};

// 댓글 수정하기
export const useEditArticleComment = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateArticleCommentResponse,
    Error,
    { commentId: string; body: UpdateArticleCommentRequest }
  >({
    mutationFn: ({ commentId, body }) =>
      articleCommentService.updateArticleComment(commentId, body),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articleComment"] });
    },
  });
};

// 댓글 삭제하기
export const useDeleteArticleComment = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, string>({
    mutationFn: (commentId) =>
      articleCommentService.deleteArticleComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articleComment"] });
      queryClient.invalidateQueries({ queryKey: ["article"] });
    },
  });
};
