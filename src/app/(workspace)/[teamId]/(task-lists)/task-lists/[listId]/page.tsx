"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
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
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "@/api/task/task.query";
import {
  TaskType,
  CreateTaskRequest,
  TaskDetailType,
} from "@/api/task/task.schema";
import { useQueryClient } from "@tanstack/react-query";
import {
  useTaskListQuery,
  useCreateTaskList,
} from "@/api/task-list/task-list.query";
import Button from "@/components/common/Button";
import TodoCreateModal from "@/components/common/Modal/TodoCreateModal";
import TaskDetail from "@/components/feature/TaskList/TaskDetail";
import { useToastStore } from "@/stores/toastStore";
import TaskListTodoModal from "@/components/common/Modal/TaskListTodoModal";
import Skeleton from "@/components/common/Skeleton/Skeleton";

export default function TaskListPage() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");

  const initialDate = dateParam ? new Date(dateParam) : new Date();
  const params = useParams();
  const groupId = String(params.teamId);
  const listId = Number(params.listId);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { openModal, closeModal } = useModalStore();
  const { showToast } = useToastStore();
  const { mutate: updateTask } = useUpdateTaskMutation();
  const { mutate: deleteTask } = useDeleteTaskMutation();
  const { mutate: createTask } = useCreateTaskMutation();
  const { mutate: createTaskList } = useCreateTaskList(groupId);
  const { data: group, isLoading, isError } = useGroupQuery(groupId);

  const [activeTab, setActiveTab] = useState(listId);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const formattedDate = isToday(selectedDate)
    ? "오늘"
    : format(selectedDate, "M월 d일 (EEE)", { locale: ko });

  const formattedDateForQuery = format(selectedDate, "yyyy-MM-dd");

  const [selectedTask, setSelectedTask] = useState<TaskDetailType | null>(null);
  const [detail, setDetail] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");

  const handleTaskClick = (task: TaskType) => {
    setSelectedTask(task as unknown as TaskDetailType);
    setDetail(true);
  };

  interface FormData {
    name: string;
    description?: string;
    startDate: string;
    frequencyType: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
    monthDay?: number;
    weekDays?: number[];
  }
  const getInitialFormData = (): FormData => ({
    name: "",
    description: "",
    startDate: getTodayKoreaISOString(),
    frequencyType: "ONCE",
    monthDay: undefined,
    weekDays: [],
  });
  const getTodayKoreaISOString = () => {
    const now = new Date();
    const koreaNow = new Date(now.getTime());

    return koreaNow.toISOString();
  };
  const [formData, setFormData] = useState<FormData>(getInitialFormData());

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

  const handleMonthDayChange = (value: number | undefined) => {
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

    const now = new Date();
    const selectedStartDate = new Date(formData.startDate);

    if (selectedStartDate < now) {
      showToast("시작 날짜는 오늘 이후여야 합니다.", "error");
      return;
    }

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
          });
          showToast("할일 추가 완료!", "success");
        },
        onError: (error) => {
          console.error("할 일 생성 실패", error);
          showToast("시작 날짜는 현재 날짜 이후여야 합니다.", "error");
        },
      },
    );
  };

  const {
    data: taskListData,
    isLoading: taskLoading,
    refetch: refetchTaskList,
  } = useTaskListQuery({
    groupId,
    taskListId: String(activeTab),
    date: formattedDateForQuery,
  });

  const handleCommentChange = () => {
    refetchTaskList();
  };

  useEffect(() => {
    if (!selectedTask) return;

    const updatedTask = taskListData?.tasks.find(
      (t) => t.id === selectedTask.id,
    );
    if (updatedTask) {
      setSelectedTask(updatedTask as unknown as TaskDetailType);
    }
  }, [taskListData, selectedTask?.id, selectedTask]);

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

  const handleEditToggle = (task: TaskType | TaskDetailType) => {
    const isDone = task.doneAt !== null;
    updateTask(
      {
        groupId,
        taskListId: String(activeTab),
        taskId: String(task.id),
        body: {
          done: !isDone,
          name: task.name,
          description: task.description || "",
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
          if (isDone) {
            showToast("할 일 미완료", "info");
          } else {
            showToast("할 일 완료", "success");
          }
        },
      },
    );
  };

  const handleTaskUpdate = (updatedTask: {
    id: number;
    name: string;
    description: string;
  }) => {
    updateTask(
      {
        groupId,
        taskListId: String(activeTab),
        taskId: String(updatedTask.id),
        body: {
          name: updatedTask.name,
          description: updatedTask.description,
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
  const handleTaskDelete = (taskId: number) => {
    deleteTask(
      {
        groupId,
        taskListId: String(activeTab),
        taskId: String(taskId),
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
          setDetail(false);
        },
      },
    );
  };

  return (
    <div className="w-full">
      <h1 className="text-xl font-bold mb-4 mx-4 sm:mx-0">할 일</h1>
      {/* 날짜 네비게이션 */}
      <div className="flex items-center gap-3 mb-6 mx-4 sm:mx-0">
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
        <div
          className="flex items-center cursor-pointer ml-auto"
          onClick={() => openModal("taskListTodo")}
        >
          <Image
            src="/icons/icon-plus-green.svg"
            width={15}
            height={15}
            alt="plus"
            className="mr-1"
          />
          <span className="text-md font-medium text-brand-primary">
            새로운 목록 추가하기
          </span>
        </div>
      </div>

      {/* 달력 모달 */}
      <CalendarModal
        selectedDate={selectedDate}
        onSelectDate={(date) => {
          setSelectedDate(date);
          router.push(
            `/${groupId}/task-lists/${activeTab}?date=${format(date, "yyyy-MM-dd")}`,
          );
        }}
      />

      {/* 탭 영역 */}
      <div className="w-full overflow-x-auto px-4 sm:px-0 max-w-full scrollbar-hidden">
        <div className="flex items-center space-x-3 mb-4 whitespace-nowrap min-w-max">
          {isLoading || !group
            ? Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-7 w-20 rounded-md" />
              ))
            : group.taskLists.map((taskList) => (
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
      </div>

      <TaskListTodoModal
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        onSubmit={(e) => {
          e.preventDefault();
          const trimmedTitle = todoTitle.trim();
          if (!trimmedTitle) return;

          const isDuplicate = group?.taskLists.some(
            (list) => list.name === trimmedTitle,
          );
          if (isDuplicate) {
            showToast("이미 존재하는 목록입니다", "error");
            return;
          }
          createTaskList(
            { name: todoTitle.trim() },
            {
              onSuccess: () => {
                setTodoTitle("");
                closeModal();
                showToast("목록 추가 완료!", "success");
              },
              onError: () => {
                closeModal();
                showToast("목록 추가 실패", "error");
              },
            },
          );
        }}
      />

      {/* 선택된 탭의 tasks 보여주기 */}
      <div className="mt-4 space-y-3 mx-4 sm:mx-0">
        {taskLoading || !taskListData ? (
          <ul className="flex flex-col gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-[68px] w-full rounded-xl" />
            ))}
          </ul>
        ) : isError || !group ? (
          <div className="flex justify-center items-center h-[50vh]"></div>
        ) : taskListData?.tasks.length === 0 ? (
          <div className="flex justify-center items-center h-[50vh]">
            <p className="text-text-default">
              아직 할 일 목록이 없습니다.
              <br /> 새로운 목록을 추가해주세요.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {taskListData?.tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={() => handleEditToggle(task)}
                onClick={() => handleTaskClick(task)}
              />
            ))}
          </ul>
        )}
      </div>

      {detail && selectedTask && (
        <TaskDetail
          task={selectedTask}
          onClose={() => setDetail(false)}
          onCommentChange={handleCommentChange}
          onToggle={() => handleEditToggle(selectedTask)}
          onUpdate={handleTaskUpdate}
          onDeleteTask={handleTaskDelete}
        />
      )}
      <div className="mt-4 flex justify-end">
        {!detail && (
          <Button
            type="button"
            label="할 일 추가"
            variant="primary"
            size="floating-md"
            className="w-[6.5rem] fixed bottom-6 right-6 z-50"
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
        )}

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
