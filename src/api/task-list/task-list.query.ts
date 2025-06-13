import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { taskListService } from "./task-list.service";
import {
  CreateTaskListRequest,
  UpdateTaskListRequest,
} from "./task-list.schema";

// 할 일 목록 정보 조회
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

// 할 일 목록 생성
export const useCreateTaskList = (groupId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateTaskListRequest) =>
      taskListService.createTaskList(groupId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group", groupId] });
    },
  });
};

// 할 일 목록 수정
export const useUpdateTaskList = (groupId: string, id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateTaskListRequest) =>
      taskListService.updateTaskList(groupId, id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group", groupId] });
      queryClient.invalidateQueries({ queryKey: ["taskList", groupId, id] });
    },
  });
};

// 할 일 목록 삭제
export const useDeleteTaskList = (groupId: string, id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => taskListService.deleteTaskList(groupId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group", groupId] });
      queryClient.invalidateQueries({ queryKey: ["taskList"] });
    },
  });
};
