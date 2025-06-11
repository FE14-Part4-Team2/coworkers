"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useGroupQuery } from "@/api/group/group.query";

import Image from "next/image";
import { format, isToday, addDays, subDays } from "date-fns";
import { ko } from "date-fns/locale/ko";
import CalendarModal from "@/components/common/Modal/CalendarModal";
import { useModalStore } from "@/stores/modalStore";
import TaskItem from "@/components/feature/TaskList/TaskItem";
import { useUpdateTaskMutation } from "@/api/task/task.query";
import { TaskType } from "@/api/task/task.schema";
import { useQueryClient } from "@tanstack/react-query";
import { useTaskListQuery } from "@/api/task-list/task-list.query";

export default function TaskListPage() {
  const params = useParams();
  const groupId = String(params.teamId);
  const listId = Number(params.listId);
  const queryClient = useQueryClient();
  const { openModal } = useModalStore();
  const { mutate } = useUpdateTaskMutation();
  const { data: group, isLoading, isError } = useGroupQuery(groupId);

  const [activeTab, setActiveTab] = useState(listId);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = isToday(selectedDate)
    ? "오늘"
    : format(selectedDate, "M월 d일 (EEE)", { locale: ko });

  const formattedDateForQuery = format(selectedDate, "yyyy-MM-dd");

  const {
    data: taskListData,
    isLoading: taskLoading,
    isError: taskError,
  } = useTaskListQuery({
    groupId,
    taskListId: String(activeTab),
    date: formattedDateForQuery,
  });

  const handlePrev = () => {
    const newDate = subDays(selectedDate, 1);
    setSelectedDate(newDate);
  };

  const handleNext = () => {
    const newDate = addDays(selectedDate, 1);
    setSelectedDate(newDate);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError || !group) {
    return <div>에러 발생!</div>;
  }

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const handleCheckToggle = (task: TaskType) => {
    const isDone = task.doneAt !== null;
    mutate(
      {
        groupId,
        taskListId: String(activeTab),
        taskId: String(task.id),
        body: {
          done: !isDone,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [
              "taskList",
              groupId,
              String(activeTab),
              formattedDateForQuery,
            ],
          });
        },
      },
    );
  };

  return (
    <div className="w-full">
      <h1 className="text-xl font-bold mb-4">할 일</h1>
      {/* 날짜 네비게이션 */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-md font-medium ">{formattedDate}</span>
        <div
          onClick={handlePrev}
          className="cursor-pointer"
          aria-label="이전 날짜"
        >
          <Image
            src="/icons/icon-circle-arrow_left.svg"
            alt="이전 날짜"
            width={20}
            height={20}
          />
        </div>

        <div
          onClick={handleNext}
          className="cursor-pointer"
          aria-label="다음 날짜"
        >
          <Image
            src="/icons/icon-circle-arrow_right.svg"
            alt="다음 날짜"
            width={20}
            height={20}
          />
        </div>
        <div
          onClick={() => openModal("calendar")}
          className="cursor-pointer"
          aria-label="달력 열기"
        >
          <Image
            src="/icons/icon-circle-calender.svg"
            alt="달력 아이콘"
            width={24}
            height={24}
          />
        </div>
      </div>

      {/* 달력 모달 */}
      <CalendarModal
        selectedDate={selectedDate}
        onSelectDate={(date) => setSelectedDate(date)}
      />

      {/* 탭 영역 */}
      <div className="flex space-x-3 mb-4">
        {group.taskLists.map((taskList) => (
          <div
            key={taskList.id}
            onClick={() => handleTabClick(taskList.id)}
            className={`pb-1 text-lg font-medium border-b-2 cursor-pointer ${
              taskList.id === activeTab
                ? "text-text-inverse border-text-inverse"
                : "text-text-default border-transparent"
            }`}
          >
            {taskList.name}
          </div>
        ))}
      </div>

      {/* 선택된 탭의 tasks 보여주기 */}
      <div className="mt-4 space-y-3">
        {taskLoading ? (
          <p>할 일 불러오는 중...</p>
        ) : taskError || !taskListData ? (
          <p className="text-red-500">할 일을 불러오지 못했습니다.</p>
        ) : taskListData.tasks.length === 0 ? (
          <p className="text-gray-500 mt-2">할 일이 없습니다.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {taskListData.tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={() => handleCheckToggle(task)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
