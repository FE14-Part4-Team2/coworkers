import { api } from "../fetcher";
import {
  CreateArticleRequest,
  CreateArticleResponse,
  GetArticleDetailResponse,
  GetArticleListResponse,
  LikeArticleResponse,
  UpdateArticleRequest,
  UpdateArticleResponse,
} from "./article.schema";

class ArticleService {
  private getBasePath(articleId?: string) {
    return articleId != null ? `/articles/${articleId}` : "/articles";
  }

  createArticle(body: CreateArticleRequest) {
    return api.post<CreateArticleResponse>(this.getBasePath(), body);
  }
  getArticleList(params?: {
    page?: number;
    pageSize?: number;
    orderBy?: string;
    keyword?: string;
  }) {
    return api.get<GetArticleListResponse>(this.getBasePath(), {
      params,
      headers: {
        "Accept-Encoding": "identity",
      },
    });
  }
  getArticleDetail(articleId: string) {
    return api.get<GetArticleDetailResponse>(this.getBasePath(articleId));
  }
  updateArticle(articleId: string, body: UpdateArticleRequest) {
    return api.post<UpdateArticleResponse>(this.getBasePath(articleId), body);
  }
  deleteArticle(articleId: string) {
    return api.delete(this.getBasePath(articleId));
  }
  addLikeArticle(articleId: string) {
    return api.post<LikeArticleResponse>(
      `${this.getBasePath(articleId)}/like`,
      null,
    );
  }
  deleteLikeArticle(articleId: string) {
    return api.delete<LikeArticleResponse>(
      `${this.getBasePath(articleId)}/like`,
    );
  }
}

export const articleService = new ArticleService();
