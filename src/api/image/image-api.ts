import { useMutation } from "@tanstack/react-query";
import { api } from "../fetcher";

const uploadImageService = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await api.post<{ url: string }>("/images/upload", formData);
  return res.url;
};

export const useUploadImage = () => {
  return useMutation<string, Error, File>({
    mutationFn: uploadImageService,
  });
};
