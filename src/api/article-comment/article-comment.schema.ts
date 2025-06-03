import { CommentBody } from "../comment/comment.schema";

export type ArticleCommentType = {
  writer: {
    image: string | null;
    nickname: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
};

export type CreateArticleCommentRequest = CommentBody;

export type CreateArticleCommentResponse = ArticleCommentType;

export type GetArticleCommentResponse = {
  nextCursor: number;
  list: ArticleCommentType[];
};

export type UpdateArticleCommentRequest = CommentBody;

export type UpdateArticleCommentResponse = ArticleCommentType;
