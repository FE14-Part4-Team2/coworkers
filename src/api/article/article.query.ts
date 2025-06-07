import { useMutation, useQueryClient } from "@tanstack/react-query";
import { articleService } from "./article.service";
import {
  CreateArticleRequest, // 생성 요청 타입
  CreateArticleResponse, // 생성 응답 타입
} from "./article.schema";

// 게시글 생성 커스텀 훅
export const useCreateArticle = () => {
  const queryClient = useQueryClient(); // React Query의 전역 캐시 객체

  // useMutation (post, put, delete)
  return useMutation<
    CreateArticleResponse, // 성공시 받을 데이터 타입
    Error, // 실패 시 에러 타입
    CreateArticleRequest // mutationFn에 넘길 파라미터 타입
  >({
    // 실제 서버 요청을 처리할 함수
    mutationFn: (body) => articleService.createArticle(body),
    // 요청 성공 시 콜백
    onSuccess: () => {
      // 게시글 목록 관련 캐시를 무효화시켜서, 다음에 새로고침하면 최신 데이터로 갱신
      queryClient.invalidateQueries({ queryKey: ["articleList"] });
    },
  });
};
