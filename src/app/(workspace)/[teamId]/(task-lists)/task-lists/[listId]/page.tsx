"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useGroupQuery } from "@/api/group/group.query";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { format, isToday, addDays, subDays } from "date-fns";
import { ko } from "date-fns/locale/ko";
import CalendarModal from "@/components/common/Modal/CalendarModal";
import { useModalStore } from "@/stores/modalStore";
import TaskItem from "@/components/feature/TaskList/TaskItem";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "@/api/task/task.query";
import { TaskType, CreateTaskRequest } from "@/api/task/task.schema";
import { useQueryClient } from "@tanstack/react-query";
import { useTaskListQuery } from "@/api/task-list/task-list.query";
import Button from "@/components/common/Button";
import TodoCreateModal from "@/components/common/Modal/TodoCreateModal";

export default function TaskListPage() {
  const params = useParams();
  const groupId = String(params.teamId);
  const listId = Number(params.listId);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { openModal, closeModal } = useModalStore();
  const { mutate: updateTask } = useUpdateTaskMutation();
  const { mutate: createTask } = useCreateTaskMutation();
  const { data: group, isLoading, isError } = useGroupQuery(groupId);

  const [activeTab, setActiveTab] = useState(listId);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = isToday(selectedDate)
    ? "오늘"
    : format(selectedDate, "M월 d일 (EEE)", { locale: ko });

  const formattedDateForQuery = format(selectedDate, "yyyy-MM-dd");

  interface FormData {
    name: string;
    description?: string;
    startDate: string;
    frequencyType: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
    monthDay?: number;
    weekDays?: number[];
  }
  const getTodayKoreaISOString = () => {
    const now = new Date();
    const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    koreaTime.setUTCHours(0, 0, 0, 0);
    return koreaTime.toISOString();
  };
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    startDate: getTodayKoreaISOString(),
    frequencyType: "ONCE",
    monthDay: undefined,
    weekDays: [],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date: string) => {
    setFormData((prev) => ({
      ...prev,
      startDate: date,
    }));
  };

  const handleFrequencyChange = (value: string) => {
    setFormData((prev) => {
      if (value === "MONTHLY" && !prev.monthDay) {
        return {
          ...prev,
          frequencyType: value,
          monthDay: new Date().getDate(),
        } as FormData;
      }
      return {
        ...prev,
        frequencyType: value,
      } as FormData;
    });
  };

  const handleMonthDayChange = (value: number) => {
    setFormData((prev) => ({
      ...prev,
      monthDay: value,
    }));
  };

  const handleWeekDaysChange = (days: number[]) => {
    setFormData((prev) => ({
      ...prev,
      weekDays: days,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // frequencyType에 따라 body 타입이 달라짐
    let body: CreateTaskRequest;

    switch (formData.frequencyType) {
      case "ONCE":
        body = {
          name: formData.name,
          description: formData.description,
          startDate: formData.startDate,
          frequencyType: "ONCE",
        };
        break;

      case "DAILY":
        body = {
          name: formData.name,
          description: formData.description,
          startDate: formData.startDate,
          frequencyType: "DAILY",
        };
        break;

      case "WEEKLY":
        if (!formData.weekDays || formData.weekDays.length === 0) {
          alert("요일을 최소 한 개 이상 선택해주세요.");
          return;
        }
        body = {
          name: formData.name,
          description: formData.description,
          startDate: formData.startDate,
          frequencyType: "WEEKLY",
          weekDays: formData.weekDays,
        };
        break;

      case "MONTHLY":
        if (
          formData.monthDay === undefined ||
          formData.monthDay < 1 ||
          formData.monthDay > 31
        ) {
          alert("유효한 월 일(day)을 입력해주세요.");
          return;
        }
        body = {
          name: formData.name,
          description: formData.description,
          startDate: formData.startDate,
          frequencyType: "MONTHLY",
          monthDay: formData.monthDay,
        };
        break;

      default:
        alert("잘못된 반복 유형입니다.");
        return;
    }

    createTask(
      { groupId, taskListId: String(activeTab), body },
      {
        onSuccess: () => {
          closeModal();
          queryClient.invalidateQueries({
            queryKey: [
              "taskList",
              groupId,
              String(activeTab),
              formattedDateForQuery,
            ],
          });
          setFormData({
            name: "",
            description: "",
            startDate: new Date().toISOString(),
            frequencyType: "ONCE",
            // monthDay, weekDays 초기화도 필요하면 여기에 추가
          });
        },
        onError: (error) => {
          console.error("할 일 생성 실패", error);
        },
      },
    );
  };

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
    router.push(
      `/${groupId}/task-lists/${activeTab}?date=${format(newDate, "yyyy-MM-dd")}`,
    );
  };

  const handleNext = () => {
    const newDate = addDays(selectedDate, 1);
    setSelectedDate(newDate);
    router.push(
      `/${groupId}/task-lists/${activeTab}?date=${format(newDate, "yyyy-MM-dd")}`,
    );
  };

  useEffect(() => {
    setActiveTab(listId);
  }, [listId]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    router.push(
      `/${groupId}/task-lists/${index}?date=${formattedDateForQuery}`,
    );
  };

  const handleCheckToggle = (task: TaskType) => {
    const isDone = task.doneAt !== null;
    updateTask(
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

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError || !group) {
    return <div>에러 발생!</div>;
  }

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
      <div className="mt-4 flex justify-end">
        <Button
          type="button"
          label="할 일 추가"
          variant="primary"
          size="floating-md"
          icon={
            <Image
              src="/icons/icon-plus.svg"
              alt="plus"
              width={16}
              height={16}
            />
          }
          iconPosition="left"
          onClick={() => openModal("todo-create")}
        />

        <TodoCreateModal
          formData={formData}
          onChange={handleChange}
          onDateChange={handleDateChange}
          onSubmit={handleSubmit}
          onFrequencyChange={handleFrequencyChange}
          onMonthDayChange={handleMonthDayChange}
          onWeekDaysChange={handleWeekDaysChange}
        />
      </div>
    </div>
  );
}
