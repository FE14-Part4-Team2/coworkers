"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { mockTeamData } from "../mock";

export default function TestTeamPage() {
  const router = useRouter();
  const { teamId } = useParams();

  useEffect(() => {
    if (Number(teamId) !== mockTeamData.id) {
      router.push("/");
    }
  }, [teamId, router]);

  const handleListClick = (listId: number) => {
    router.push(`/${teamId}/task-lists/${listId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{mockTeamData.name}</h1>

      <h2 className="text-lg font-semibold mb-2">할 일 목록</h2>
      <ul className="space-y-3">
        {mockTeamData.taskLists.map((list) => (
          <li
            key={list.id}
            className="border p-4 rounded cursor-pointer hover:bg-gray-50"
            onClick={() => handleListClick(list.id)}
          >
            <p className="font-bold text-blue-600">{list.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
