import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { commentService } from "./comment.service";
import { CreateCommentRequest, UpdateCommentRequest } from "./comment.schema";

// 댓글 조회
export const useGetComments = (taskId: string) => {
  return useQuery({
    queryKey: ["comments", taskId],
    queryFn: () => commentService.getComments(taskId),
  });
};

// 댓글 생성
export const useCreateComment = (taskId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateCommentRequest) =>
      commentService.createComment(taskId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", taskId] });
    },
  });
};

// 댓글 수정
export const useUpdateComment = (taskId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      commentId,
      body,
    }: {
      commentId: string;
      body: UpdateCommentRequest;
    }) => commentService.updateComment(taskId, commentId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", taskId] });
    },
  });
};

// 댓글 삭제
export const useDeleteComment = (taskId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: string) =>
      commentService.deleteComment(taskId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", taskId] });
    },
  });
};
