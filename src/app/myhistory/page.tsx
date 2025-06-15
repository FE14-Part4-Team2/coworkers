"use client";

import { historyMockData, HistoryItem } from "@/app/myhistory/historyMock";
import Image from "next/image";

interface HistoryByDate {
  date: string;
  histories: HistoryItem[];
}

const groupHistoriesByDate = (rawHistories: HistoryItem[]): HistoryByDate[] => {
  const groups: Record<string, HistoryItem[]> = {};
  rawHistories.forEach((history) => {
    const date = history.createdAt.split("T")[0];
    if (!groups[date]) groups[date] = [];
    groups[date].push(history);
  });

  return Object.entries(groups)
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([date, histories]) => ({ date, histories }));
};

export default function MyHistoryPage() {
  const grouped = groupHistoriesByDate(historyMockData);

  return (
    <div className="w-full text-text-primary">
      <h2 className="text-2lg sm:text-xl font-bold mb-6">마이 히스토리</h2>
      {grouped.map((group) => (
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
                    src={"/icons/icon-checkbox-checked.svg"}
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
      ))}
    </div>
  );
}
