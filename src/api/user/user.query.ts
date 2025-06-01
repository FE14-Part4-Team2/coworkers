import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { userService } from "./user.service";
import { useAuthStore } from "@/stores/authStroe";
import { authService } from "../auth/auth.service";
import { useRouter } from "next/navigation";

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

//내 정보 조회 쿼리
export const useMyInfoQuery = () => {
  return useQuery({ ...userQuery.myInfo() });
};

// 회원 탈퇴 뮤테이션
export const useDeleteMyInfoMutation = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await userService.deleteMyInfo();
      await authService.signOut();
      clearAuth();
    },
    onSuccess: () => {
      router.push("/");
    },
  });
};
