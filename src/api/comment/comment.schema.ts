export type CommentType = {
  content: string;
  updatedAt: string;
  createdAt: string;
  id: number;
  user: {
    image: string | null;
    nickname: string;
    id: number;
  };
};

export type CommentBody = { content: string };

export type GetCommentsResponse = (CommentType & {
  userId: number;
  taskId: number;
})[];

export type CreateCommentRequest = CommentBody;

export type CreateCommentResponse = CommentType;

export type UpdateCommentRequest = CommentBody;

export type UpdateCommentResponse = CommentType;
