import { TaskType } from "../task/task.schema";

export type TaskListType = {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
};

export type GetTaskListResponse = TaskListType & { tasks: TaskType[] };

export type UpdateTaskListRequest = { name: string };

export type UpdateTaskListResponse = TaskListType;

export type CreateTaskListRequest = { name: string };

export type CreateTaskListResponse = TaskListType;

export type UpdateTaskListOrderRequest = { displayIndex: number };
