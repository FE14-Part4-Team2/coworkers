import { useMutation, useQueryClient } from "@tanstack/react-query";
import { articleService } from "./article.service";
import { CreateArticleRequest, CreateArticleResponse } from "./article.schema";

export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateArticleResponse, Error, CreateArticleRequest>({
    mutationFn: (body) => articleService.createArticle(body),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articleList"] });
    },
  });
};
