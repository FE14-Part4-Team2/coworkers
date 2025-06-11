import { useMutation } from "@tanstack/react-query";
import { taskService } from "./task.service";

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

export const useUpdateTaskMutation = () => {
  return useMutation({
    mutationFn: ({ groupId, taskListId, taskId, body }: UpdateTaskArgs) =>
      taskService.updateTask(groupId, taskListId, taskId, body),
  });
};
