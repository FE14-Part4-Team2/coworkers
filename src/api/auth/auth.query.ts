import { useAuthStore } from "@/stores/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "./auth.service";
import { useRouter } from "next/navigation";
import { userQuery } from "../user/user.query";
import { userService } from "../user/user.service";
import { useToastStore } from "@/stores/toastStore";
import { useTeamStore } from "@/stores/teamStore";

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
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();
  const router = useRouter();
  const { setCurrentTeam } = useTeamStore();

  return useMutation({
    mutationFn: authService.signIn,
    onSuccess: async (data) => {
      setAuth(data.user);
      try {
        await queryClient.invalidateQueries({
          queryKey: userQuery.myGroupsKey(),
        });

        const groups = await queryClient.fetchQuery({
          queryKey: userQuery.myGroupsKey(),
          queryFn: () => userService.getMyGroups(),
        });
        if (groups.length > 0) {
          setCurrentTeam(groups[0]);
          router.push(`/${groups[0].id}`);
        } else {
          router.push("/select");
        }
        showToast("로그인 성공", "success");
      } catch (error) {
        console.log(error);
        showToast("그룹 정보를 불러오는 데 실패했습니다.", "error");
        router.push("/select");
      }
    },
    onError: () => {
      showToast("이메일 혹은 비밀번호를 확인해주세요.", "error");
    },
  });
};

//로그아웃 뮤테이션
export const useSignOut = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const { setCurrentTeam } = useTeamStore();

  return useMutation({
    mutationFn: authService.signOut,
    onSuccess: () => {
      clearAuth();
      setCurrentTeam(null);
    },
  });
};

// 카카오 로그인 뮤테이션
export const useKakaoOauth = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();
  const router = useRouter();
  const { setCurrentTeam } = useTeamStore();

  return useMutation({
    mutationFn: authService.kakaoSignIn,
    onSuccess: async (data) => {
      setAuth(data.user);
      try {
        await queryClient.invalidateQueries({
          queryKey: userQuery.myGroupsKey(),
        });

        const groups = await queryClient.fetchQuery({
          queryKey: userQuery.myGroupsKey(),
          queryFn: () => userService.getMyGroups(),
        });

        if (groups.length > 0) {
          setCurrentTeam(groups[0]);
          router.push(`/${groups[0].id}`);
        } else {
          router.push("/select");
        }
        showToast("로그인 성공", "success");
      } catch (error) {
        console.log(error);
        showToast("그룹 정보를 불러오는 데 실패했습니다.", "error");
        router.push("/select");
      }
    },
  });
};
