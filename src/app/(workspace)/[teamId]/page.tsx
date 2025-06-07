"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { mockTeamData } from "../mock";
import TeamBar from "@/components/feature/Dashboard/TeamBar/TeamBar";
import ListBar from "@/components/feature/Dashboard/ListGroup/ListBar";

export default function DashboardPage() {
  const router = useRouter();
  const { teamId } = useParams();

  const pointColors = [
    "bg-point-purple",
    "bg-point-blue",
    "bg-point-cyan",
    "bg-point-pink",
    "bg-point-rose",
    "bg-point-orange",
    "bg-point-yellow",
  ];

  useEffect(() => {
    if (Number(teamId) !== mockTeamData.id) {
      router.push("/");
    }
  }, [teamId, router]);

  const handleListClick = (listId: number) => {
    router.push(`/${teamId}/task-lists/${listId}`);
  };

  return (
    <div className="w-full flex-col flex gap-12">
      <TeamBar teamName={mockTeamData.name} />
      <div className="flex flex-col gap-4">
        {mockTeamData.taskLists.map((list, index) => {
          const doneCount = list.tasks.filter(
            (task) => task.doneAt !== null,
          ).length;
          const totalCount = list.tasks.length;
          const colorClass = pointColors[index % pointColors.length];

          return (
            <div key={list.id} onClick={() => handleListClick(list.id)}>
              <ListBar
                listName={list.name}
                done={doneCount}
                total={totalCount}
                colorClass={colorClass}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
