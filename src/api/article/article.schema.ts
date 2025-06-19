export type ArticleType = {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: {
    nickname: string;
    id: number;
  };
  image: string | null;
  title: string;
  id: number;
};

export type ArticleDetailType = ArticleType & {
  commentCount: number;
  isLiked: boolean;
  content: string;
};

export type CreateArticleRequest = {
  image?: string | null;
  content: string;
  title: string;
};

export type CreateArticleResponse = ArticleType;

export type GetArticleListResponse = {
  totalCount: number;
  list: ArticleType[];
};

export type GetArticleDetailResponse = ArticleDetailType;

export type UpdateArticleRequest = CreateArticleRequest;

export type UpdateArticleResponse = ArticleDetailType;

export type LikeArticleResponse = ArticleDetailType;
