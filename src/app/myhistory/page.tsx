"use client";

import { useMyHistory } from "@/api/user/user.query";
import { TaskType } from "@/api/task/task.schema";
import Image from "next/image";

// 히스토리를 날짜별로 그룹화하고, 최신 날짜 순으로 정렬
const groupHistoriesByDate = (rawHistories: TaskType[]) => {
  const groups: Record<string, TaskType[]> = {};

  rawHistories.forEach((task) => {
    const date = task.date.split("T")[0];
    if (!groups[date]) groups[date] = [];
    groups[date].push(task);
  });

  return Object.entries(groups)
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([date, histories]) => ({ date, histories }));
};

export default function MyHistoryPage() {
  const { data, isLoading } = useMyHistory();

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center h-[61.5vh] mt-12">
        <div className="h-10 w-10 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin" />
      </div>
    );
  }

  const histories = data?.taskDone ?? [];
  const grouped = groupHistoriesByDate(histories);

  return (
    <div className="w-full text-text-primary">
      <h2 className="text-2lg sm:text-xl font-bold mb-6">마이 히스토리</h2>
      {grouped.length === 0 ? (
        <div className="flex items-center justify-center h-[61.5vh]">
          <p className="text-center text-text-default text-md">
            아직 히스토리가 없습니다.
          </p>
        </div>
      ) : (
        grouped.map((group) => (
          <section key={group.date} className="mb-10">
            <h3 className="text-lg font-medium mb-4">
              {new Date(group.date).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h3>
            <ul>
              {group.histories.map((history) => (
                <li
                  key={history.id}
                  className="flex items-center bg-bg-secondary p-2.5 mb-4 rounded-lg"
                >
                  <span className="mr-3">
                    <Image
                      src="/icons/icon-checkbox-checked.svg"
                      alt="checkbox"
                      width={16}
                      height={16}
                    />
                  </span>
                  <span className="font-regular text-md line-through">
                    {history.description}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
