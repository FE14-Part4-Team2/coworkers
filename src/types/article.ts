export interface Article {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: { nickname: string; id: number };
  image: string;
  title: string;
  id: number;
  commentCount: number;
  isLiked: boolean;
  content: string;
}

export interface ArticleComment {
  id: number;
  writer: {
    image: string | null;
    nickname: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  content: string;
}
