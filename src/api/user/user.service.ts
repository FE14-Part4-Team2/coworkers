import { api } from "../api";
import {
  GetMyGroupsResponse,
  GetMyHistoryResponse,
  GetMyInfoResponse,
  GetMyMemberships,
  ResetPasswordRequest,
  SendResetPasswordEmailRequest,
  UpdateMyInfoRequest,
  UpdatePasswordRequest,
} from "./user.schema";

const PATH = "/user";

class UserService {
  getMyInfo() {
    return api.get<GetMyInfoResponse>(PATH);
  }
  updateMyInfo(body: UpdateMyInfoRequest) {
    return api.patch(PATH, body);
  }
  deleteMyInfo() {
    return api.delete(PATH);
  }
  getMyGroups() {
    return api.get<GetMyGroupsResponse>(`${PATH}/groups`);
  }
  getMyMemberships() {
    return api.get<GetMyMemberships>(`${PATH}/memberships`);
  }
  getMyHistory() {
    return api.get<GetMyHistoryResponse>(`${PATH}/history`);
  }
  sendResetPasswordEmail(body: SendResetPasswordEmailRequest) {
    return api.post(`${PATH}/send-reset-password-email`, body);
  }
  resetPassword(body: ResetPasswordRequest) {
    return api.patch(`${PATH}/reset-password`, body);
  }
  updatePassword(body: UpdatePasswordRequest) {
    return api.patch(`${PATH}/password`, body);
  }
}

export const userService = new UserService();
