import { api } from "../fetcher";
import {
  CreateTaskRequest,
  CreateTaskResponse,
  GetTaskResponse,
  GetTasksResponse,
  UpdateTaskOrder,
  UpdateTaskRequest,
  UpdateTaskResponse,
} from "./task.schema";

class TaskService {
  private getBasePath(groupId: string, taskListId: string) {
    return `/groups/${groupId}/task-lists/${taskListId}/tasks`;
  }

  createTask(groupId: string, taskListId: string, body: CreateTaskRequest) {
    return api.post<CreateTaskResponse>(
      this.getBasePath(groupId, taskListId),
      body,
    );
  }
  getTasks(groupId: string, taskListId: string, params?: { date?: string }) {
    return api.get<GetTasksResponse>(this.getBasePath(groupId, taskListId), {
      params,
    });
  }
  getTaskInfo(groupId: string, taskListId: string, taskId: string) {
    const path = `${this.getBasePath(groupId, taskListId)}/${taskId}`;

    return api.get<GetTaskResponse>(path);
  }
  updateTask(
    groupId: string,
    taskListId: string,
    taskId: string,
    body: UpdateTaskRequest,
  ) {
    const path = `${this.getBasePath(groupId, taskListId)}/${taskId}`;

    return api.patch<UpdateTaskResponse>(path, body);
  }
  deleteTask(groupId: string, taskListId: string, taskId: string) {
    const path = `${this.getBasePath(groupId, taskListId)}/${taskId}`;

    return api.delete(path);
  }
  updateTaskOrder(
    groupId: string,
    taskListId: string,
    id: string,
    body: UpdateTaskOrder,
  ) {
    const path = `${this.getBasePath(groupId, taskListId)}/${id}/order`;

    return api.patch(path, body);
  }
  deleteRecurring(
    groupId: string,
    taskListId: string,
    taskId: string,
    recurringId: string,
  ) {
    const path = `${this.getBasePath(groupId, taskListId)}/${taskId}/recurring/${recurringId}`;

    return api.delete(path);
  }
}

export const taskService = new TaskService();
