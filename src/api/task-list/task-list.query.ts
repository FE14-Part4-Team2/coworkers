import { useQuery } from "@tanstack/react-query";
import { taskListService } from "./task-list.service";
import { GetTaskListResponse } from "./task-list.schema";

export const useTaskListQuery = ({
  groupId,
  taskListId,
  date,
}: {
  groupId: string;
  taskListId: string;
  date: string;
}) => {
  return useQuery<GetTaskListResponse>({
    queryKey: ["taskList", groupId, taskListId, date],
    queryFn: () => taskListService.getTaskList(groupId, taskListId, { date }),
  });
};
