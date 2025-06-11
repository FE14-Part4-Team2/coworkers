import { useQuery } from "@tanstack/react-query";
import { taskListService } from "./task-list.service";

export const useTaskListQuery = (params: {
  groupId: string;
  taskListId: string;
  date: string;
}) => {
  const { groupId, taskListId, ...queryParams } = params;
  return useQuery({
    queryKey: ["taskList", params],
    queryFn: () =>
      taskListService.getTaskList(groupId, taskListId, queryParams),
  });
};
