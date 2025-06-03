import { api } from "../fetcher";
import {
  CreateCommentRequest,
  CreateCommentResponse,
  GetCommentsResponse,
  UpdateCommentRequest,
  UpdateCommentResponse,
} from "./comment.schema";

class CommentService {
  private getBasePath(taskId: string, commentId?: string) {
    return commentId != null
      ? `/tasks/${taskId}/comments/${commentId}`
      : `/tasks/${taskId}/comments`;
  }

  getComments(taskId: string) {
    return api.get<GetCommentsResponse>(this.getBasePath(taskId));
  }
  createComment(taskId: string, body: CreateCommentRequest) {
    return api.post<CreateCommentResponse>(this.getBasePath(taskId), body);
  }
  updateComment(taskId: string, commentId: string, body: UpdateCommentRequest) {
    return api.patch<UpdateCommentResponse>(
      this.getBasePath(taskId, commentId),
      body,
    );
  }
  deleteComment(taskId: string, commentId: string) {
    return api.delete(this.getBasePath(taskId, commentId));
  }
}

export const commentService = new CommentService();
