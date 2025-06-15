import { TaskListType } from "../task-list/task-list.schema";
import { TaskDetailType } from "../task/task.schema";

export type GroupType = {
  teamId?: string;
  updatedAt: string;
  createdAt: string;
  image: string | null;
  name: string;
  id: number;
};

export type MemberType = {
  role: "ADMIN" | "MEMBER";
  userImage: string | null;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
};

export type GetGroupResponse = GroupType & {
  members: MemberType[];
  taskLists: (TaskListType & { tasks: TaskDetailType[] })[];
};

export type UpdateGroupRequest = {
  image?: string;
  name?: string;
};

export type UpdateGroupResponse = GroupType;

export type CreateGroupRequest = {
  image?: string;
  name: string;
};

export type CreateGroupResponse = GroupType;

export type GetGroupMemberResponse = MemberType;

export type AcceptInvitationRequest = {
  userEmail: string;
  token: string;
};

export type AcceptInvitationResponse = {
  groupId: number;
};

export type AddGroupMemberRequest = {
  userEmail: string;
};
