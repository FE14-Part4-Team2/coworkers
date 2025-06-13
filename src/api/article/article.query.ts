"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { articleService } from "./article.service";
import {
  CreateArticleRequest,
  CreateArticleResponse,
  GetArticleDetailResponse,
} from "./article.schema";

const STALE_TIME_5_MIN = 1000 * 60 * 5;
const GC_TIME_10_MIN = 1000 * 60 * 10;
type LikeAction = "add" | "delete";

// 게시글 작성
export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateArticleResponse, Error, CreateArticleRequest>({
    mutationFn: (body) => articleService.createArticle(body),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

// 게시글 좋아요 / 취소 공통 훅
export const useLikeArticle = (action: LikeAction) => {
  const queryClient = useQueryClient();

  return useMutation<GetArticleDetailResponse, Error, string>({
    mutationFn: (articleId) =>
      action === "add"
        ? articleService.addLikeArticle(articleId)
        : articleService.deleteLikeArticle(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["article"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

//베스트 게시글 목록 불러오기
export const useBestArticles = () => {
  return useArticleList({
    orderBy: "like",
    pageSize: 3,
    page: 1,
  });
};

//전체 게시글 목록 불러오기
export const useArticleList = (params?: {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  keyword?: string;
}) => {
  const query = useQuery({
    queryKey: ["articles", params],
    queryFn: () => articleService.getArticleList(params),
    staleTime: STALE_TIME_5_MIN,
    gcTime: GC_TIME_10_MIN,
  });

  return {
    ...query,
    data: query.data?.list ?? [],
    totalCount: query.data?.totalCount ?? 0,
  };
};

// 게시글 상세 내용 불러오기
export const useArticleDetail = (articleId: string) => {
  return useQuery({
    queryKey: ["article", articleId],
    queryFn: () => articleService.getArticleDetail(articleId),
    enabled: !!articleId,
  });
};
