import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { userService } from "./user.service";
import { useAuthStore } from "@/stores/authStore";
import { authService } from "../auth/auth.service";
import { useRouter } from "next/navigation";
import { UpdateMyInfoRequest } from "./user.schema";
import { Message } from "../auth/auth.schema";
import { useToastStore } from "@/stores/toastStore";

const userQuery = {
  all: ["user"],
  myInfoKey: () => [...userQuery.all, "myInfo"],
  myInfo: () =>
    queryOptions({
      queryKey: userQuery.myInfoKey(),
      queryFn: () => userService.getMyInfo(),
    }),
  myGroupsKey: () => [...userQuery.all, "myGroups"],
  myGroups: () =>
    queryOptions({
      queryKey: userQuery.myGroupsKey(),
      queryFn: () => userService.getMyGroups(),
    }),
  myMembershipsKey: () => [...userQuery.all, "myMemberships"],
  myMemberships: () =>
    queryOptions({
      queryKey: userQuery.myMembershipsKey(),
      queryFn: () => userService.getMyMemberships(),
    }),
  myHistoryKey: () => [...userQuery.all, "myHistory"],
  MyHistory: () =>
    queryOptions({
      queryKey: userQuery.myHistoryKey(),
      queryFn: () => userService.getMyHistory(),
    }),
};

// 내 정보 조회 쿼리
export const useMyInfoQuery = (enabled: boolean) => {
  return useQuery({ ...userQuery.myInfo(), enabled });
};

// 내 정보 수정 뮤테이션
export const useUpdateMyInfoMutation = () => {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<Message, Error, UpdateMyInfoRequest>({
    mutationFn: (body) => userService.updateMyInfo(body),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: userQuery.all });

      const newUser = await userService.getMyInfo();
      setAuth(newUser);
    },
  });
};

// 회원 탈퇴 뮤테이션
export const useDeleteMyInfoMutation = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const router = useRouter();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: async () => {
      await userService.deleteMyInfo();
      await authService.signOut();
      clearAuth();
    },
    onSuccess: () => {
      router.push("/");
      showToast("탈퇴되었습니다.");
    },
  });
};

// 그룹 조회 쿼리
export const useMyGroups = () => {
  return useQuery({ ...userQuery.myGroups() });
};

// 멤버십 조회 쿼리
export const useMyMemberships = () => {
  return useQuery({ ...userQuery.myMemberships() });
};

// 히스토리 조회 쿼리
export const useMyHistory = () => {
  return useQuery({ ...userQuery.MyHistory() });
};

// 비밀번호 초기화 메일 전송 뮤테이션
export const useSendResetPasswordMutation = () => {
  return useMutation({
    mutationFn: userService.sendResetPasswordEmail,
  });
};

// 비밀번호 초기화 뮤테이션
export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: userService.resetPassword,
    onSuccess: () => {
      router.push("/login");
    },
  });
};

// 비밀번호 재설정 뮤테이션
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: userService.updatePassword,
  });
};
