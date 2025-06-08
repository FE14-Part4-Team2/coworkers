"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { articleService } from "./article.service";
import { CreateArticleRequest, CreateArticleResponse } from "./article.schema";

export const useCreateArticle = () => {
  //게시글 작성
  const queryClient = useQueryClient();

  return useMutation<CreateArticleResponse, Error, CreateArticleRequest>({
    mutationFn: (body) => articleService.createArticle(body),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articleList"] });
    },
  });
};

export const useBestArticles = () => {
  //베스트 게시글 목록 불러오기
  const query = useArticleList({ orderBy: "like", pageSize: 3, page: 1 });
  return {
    ...query,
    data: query.data?.list ?? [],
  };
};

export const useArticleList = (params?: {
  //전체 게시글 목록 불러오기
  page?: number;
  pageSize?: number;
  orderBy?: string;
  keyword?: string;
}) => {
  return useQuery({
    queryKey: ["articles", "list", params],
    queryFn: () => articleService.getArticleList(params),
  });
};
