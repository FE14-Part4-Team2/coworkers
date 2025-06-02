export type TaskPathParams = {
  groupId: string;
  taskListId: string;
};

export type FrequencyType = "DAILY" | "WEEKLY" | "MONTHLY" | "ONCE";

interface RecurringBody {
  name: string;
  description?: string;
  startDate?: string;
  frequencyType: FrequencyType;
}

interface MonthlyRecurring extends RecurringBody {
  frequencyType: "MONTHLY";
  monthDay: number;
}

interface WeeklyRecurring extends RecurringBody {
  frequencyType: "WEEKLY";
  weekDays: number[];
}

interface DailyRecurring extends RecurringBody {
  frequencyType: "DAILY";
}

interface OnceRecurring extends RecurringBody {
  frequencyType: "ONCE";
}

// requrring 엔드포인트 논의 후 삭제
// export type TaskRecurringCreateBody =
//   | MonthlyRecurring
//   | WeeklyRecurring
//   | DailyRecurring
//   | OnceRecurring;

export type TaskType = {
  doneBy: {
    user?: {
      image?: string | null;
      nickname?: string;
      id: number;
    };
  };
  writer?: {
    image?: string | null;
    nickname?: string;
    id: number;
  };
  displayIndex: number;
  commentCount: number;
  deletedAt: string;
  recurringId: number;
  frequency: FrequencyType;
  updatedAt: string;
  doneAt: string;
  date: string;
  description: string;
  name: string;
  id: number;
};

export type CreateTaskRequest =
  | MonthlyRecurring
  | WeeklyRecurring
  | DailyRecurring
  | OnceRecurring;

export type CreateTaskResponse = {
  recurring: {
    writerId: number;
    groupId: number;
    taskListId: number;
    monthDay: number;
    weekDays: number[];
    frequencyType: FrequencyType;
    startDate: string;
    updatedAt: string;
    createdAt: string;
    description: string;
    name: string;
    id: number;
  };
};

export type GetTasksResponse = TaskType[];

export type GetTaskResponse = TaskType;

export type UpdateTaskRequest = {
  name?: string;
  description?: string;
  done?: boolean;
};

export type UpdateTaskResponse = {
  displayIndex: number;
  writerId: number;
  userId: number;
  deletedAt: string;
  frequency: FrequencyType;
  description: string;
  name: string;
  recurringId: number;
  doneAt: string;
  date: string;
  updatedAt: string;
  id: number;
};

export type UpdateTaskOrder = {
  displayIndex: number;
};
