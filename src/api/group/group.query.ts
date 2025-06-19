import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AcceptInvitationRequest,
  AddGroupMemberRequest,
  CreateGroupRequest,
  GetGroupResponse,
  UpdateGroupRequest,
} from "./group.schema";
import { groupService } from "./group.service";
import { useTeamStore } from "@/stores/teamStore";

// 그룹 정보 조회
export const useGroupQuery = (groupId: string) => {
  return useQuery<GetGroupResponse>({
    queryKey: ["group", groupId],
    queryFn: () => groupService.getGroup(groupId),
  });
};

// 그룹 생성
export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  const { setCurrentTeam } = useTeamStore();

  return useMutation({
    mutationFn: (body: CreateGroupRequest) => groupService.createGroup(body),
    onSuccess: (data) => {
      setCurrentTeam(data);
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};

// 그룹 수정
export const useUpdateGroup = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateGroupRequest) =>
      groupService.updateGroup(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group", id] });
    },
  });
};

// 그룹 삭제
export const useDeleteGroup = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => groupService.deleteGroup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group"] });
    },
  });
};

// 초대 수락
export const useAcceptInvitation = () => {
  const { setCurrentTeam } = useTeamStore();

  return useMutation({
    mutationFn: (body: AcceptInvitationRequest) =>
      groupService.acceptInvitation(body),
    onSuccess: async (data) => {
      const groupId = String(data.groupId);
      const group = await groupService.getGroup(groupId);
      setCurrentTeam({
        name: group.name,
        image: group.image ?? null,
        id: group.id,
      });
    },
  });
};

// 멤버 추가
export const useAddGroupMember = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddGroupMemberRequest) =>
      groupService.addGroupMember(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group", id] });
    },
  });
};

// 멤버 삭제
export const useDeleteGroupMember = (id: string, userId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => groupService.deleteMember(id, userId.toString()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group", id] });
    },
  });
};
