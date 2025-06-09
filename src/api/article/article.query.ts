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

// 추후 isLoading, error등 추가 예정
export const useBestArticles = () => {
  //베스트 게시글 목록 불러오기
  return useArticleList({
    orderBy: "like",
    pageSize: 3,
    page: 1,
  });
};

export const useArticleList = (params?: {
  //전체 게시글 목록 불러오기
  page?: number;
  pageSize?: number;
  orderBy?: string;
  keyword?: string;
}) => {
  const query = useQuery({
    queryKey: ["articles", params],
    queryFn: () => articleService.getArticleList(params),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  return {
    ...query,
    data: query.data?.list ?? [],
  };
};
