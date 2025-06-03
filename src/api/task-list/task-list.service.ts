import { api } from "../fetcher";
import {
  CreateTaskListRequest,
  CreateTaskListResponse,
  GetTaskListResponse,
  UpdateTaskListOrderRequest,
  UpdateTaskListRequest,
  UpdateTaskListResponse,
} from "./task-list.schema";

class TaskListService {
  private getBasePath(groupId: string, id?: string) {
    return id != null
      ? `/groups/${groupId}/task-lists/${id}`
      : `/groups/${groupId}/task-lists`;
  }

  getTaskList(groupId: string, id: string, params?: { date?: string }) {
    return api.get<GetTaskListResponse>(this.getBasePath(groupId, id), {
      params,
    });
  }
  updateTaskList(groupId: string, id: string, body: UpdateTaskListRequest) {
    return api.patch<UpdateTaskListResponse>(
      this.getBasePath(groupId, id),
      body,
    );
  }
  deleteTaskList(groupId: string, id: string) {
    return api.delete(this.getBasePath(groupId, id));
  }
  createTaskList(groupId: string, body: CreateTaskListRequest) {
    return api.post<CreateTaskListResponse>(this.getBasePath(groupId), body);
  }
  updateTaskListOrder(
    groupId: string,
    id: string,
    body: UpdateTaskListOrderRequest,
  ) {
    return api.patch(`${this.getBasePath(groupId, id)}/order`, body);
  }
}

export const taskListService = new TaskListService();
