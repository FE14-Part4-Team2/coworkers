import { useAuthStore } from "@/stores/authStroe";
import { useMutation } from "@tanstack/react-query";
import { authService } from "./auth.service";

//회원가입 뮤테이션
export const useSignUp = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: authService.signUp,
    onSuccess: (data) => {
      setAuth(data.user);
    },
  });
};

//로그인 뮤테이션
export const useSignIn = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: authService.signIn,
    onSuccess: (data) => {
      setAuth(data.user);
    },
  });
};

//로그아웃 뮤테이션
export const useSignOut = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: authService.signOut,
    onSuccess: () => {
      clearAuth();
    },
  });
};

// 카카오 로그인 추후 추가
