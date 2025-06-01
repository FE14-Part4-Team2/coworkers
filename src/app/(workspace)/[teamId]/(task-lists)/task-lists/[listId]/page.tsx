"use client";

import { useParams } from "next/navigation";
import { mockTeamData } from "@/app/(workspace)/mock";

export default function TaskListPage() {
  const { teamId, listId } = useParams();
  console.log(listId);

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">{teamId} 할 일 리스트</h1>

      <div className="space-y-4">
        {mockTeamData.taskLists.map((list) => (
          <div key={list.id} className="border p-4 rounded shadow">
            <h2 className="text-blue-600 font-semibold">{list.name}</h2>
            <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
              {list.tasks.map((task, idx) => (
                <li key={idx}>{task}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
