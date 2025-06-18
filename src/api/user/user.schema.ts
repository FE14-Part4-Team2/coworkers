import { TaskType } from "../task/task.schema";

export type UserType = {
  id: number;
  nickname: string;
  createdAt: string;
  updatedAt: string;
  image?: string | null;
  teamId: string;
  email: string;
};

export type Group = {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image?: string | null;
  name: string;
  id: number;
};

export type Membership = {
  group: Group;
  role: "ADMIN" | "MEMBER";
  userImage?: string | null;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
};

export type GetMyInfoResponse = UserType & { memberships: Membership[] };

export type UpdateMyInfoRequest = {
  nickname?: string;
  image?: string;
};

export type GetMyGroupsResponse = Group[];

export type GetMyMemberships = Membership[];

export type GetMyHistoryResponse = { tasksDone: TaskType[] };

export type UpdatePasswordRequest = {
  passwordConfirmation: string;
  password: string;
};

export type SendResetPasswordEmailRequest = {
  email: string;
  redirectUrl: string;
};

export type ResetPasswordRequest = UpdatePasswordRequest & { token: string };
