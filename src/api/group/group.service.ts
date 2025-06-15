import { api } from "../fetcher";
import { GetTasksResponse } from "../task/task.schema";
import {
  AcceptInvitationRequest,
  AcceptInvitationResponse,
  AddGroupMemberRequest,
  CreateGroupRequest,
  CreateGroupResponse,
  GetGroupMemberResponse,
  GetGroupResponse,
  UpdateGroupRequest,
  UpdateGroupResponse,
} from "./group.schema";

const PATH = "/groups";

class GroupService {
  getGroup(id: string) {
    return api.get<GetGroupResponse>(`${PATH}/${id}`);
  }
  updateGroup(id: string, body: UpdateGroupRequest) {
    return api.patch<UpdateGroupResponse>(`${PATH}/${id}`, body);
  }
  deleteGroup(id: string) {
    return api.delete(`${PATH}/${id}`);
  }
  createGroup(body: CreateGroupRequest) {
    return api.post<CreateGroupResponse>(`${PATH}`, body);
  }
  getMemberInfo(id: string, memberUserId: string) {
    return api.get<GetGroupMemberResponse>(
      `${PATH}/${id}/member/${memberUserId}`,
    );
  }
  deleteMember(id: string, memberUserId: string) {
    return api.delete(`${PATH}/${id}/member/${memberUserId}`);
  }
  getInvitationToken(id: string) {
    return api.get<string>(`${PATH}/${id}/invitation`);
  }
  acceptInvitation(body: AcceptInvitationRequest) {
    return api.post<AcceptInvitationResponse>(
      `${PATH}/accept-invitation`,
      body,
    );
  }
  addGroupMember(id: string, body: AddGroupMemberRequest) {
    return api.post(`${PATH}/${id}/member`, body);
  }
  getTasks(id: string, params?: { date?: string }) {
    return api.get<GetTasksResponse>(`${PATH}/${id}/tasks`, { params });
  }
}

export const groupService = new GroupService();
