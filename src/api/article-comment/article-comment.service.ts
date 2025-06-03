import { api } from "../fetcher";
import {
  CreateArticleCommentRequest,
  CreateArticleCommentResponse,
  GetArticleCommentResponse,
  UpdateArticleCommentRequest,
  UpdateArticleCommentResponse,
} from "./article-comment.schema";

class ArticleCommentService {
  private getArticlePath(articleId: string) {
    return `/articles/${articleId}/comments`;
  }
  private getCommentPath(commentId: string) {
    return `/comments/${commentId}`;
  }

  createArticleComment(articleId: string, body: CreateArticleCommentRequest) {
    return api.post<CreateArticleCommentResponse>(
      this.getArticlePath(articleId),
      body,
    );
  }
  getArticleComment(
    articleId: string,
    params: { limit: number; cursor?: number },
  ) {
    return api.get<GetArticleCommentResponse>(this.getArticlePath(articleId), {
      params,
    });
  }
  updateArticleComment(commentId: string, body: UpdateArticleCommentRequest) {
    return api.patch<UpdateArticleCommentResponse>(
      this.getCommentPath(commentId),
      body,
    );
  }
  deleteArticleComment(commentId: string) {
    return api.delete(this.getCommentPath(commentId));
  }
}

export const articleCommentService = new ArticleCommentService();
