import { useMutation } from "@tanstack/react-query";
import { taskService } from "./task.service";
import { CreateTaskRequest } from "./task.schema";

type UpdateTaskArgs = {
  groupId: string;
  taskListId: string;
  taskId: string;
  body: {
    name?: string;
    description?: string;
    done?: boolean;
  };
};

type CreateTaskArgs = {
  groupId: string;
  taskListId: string;
  body: CreateTaskRequest;
};

export const useUpdateTaskMutation = () => {
  return useMutation({
    mutationFn: ({ groupId, taskListId, taskId, body }: UpdateTaskArgs) =>
      taskService.updateTask(groupId, taskListId, taskId, body),
  });
};

export const useCreateTaskMutation = () => {
  return useMutation({
    mutationFn: ({ groupId, taskListId, body }: CreateTaskArgs) =>
      taskService.createTask(groupId, taskListId, body),
  });
};
