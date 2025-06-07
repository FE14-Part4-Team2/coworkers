"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { mockTeamData } from "../mock";
import TeamBar from "@/components/feature/Dashboard/TeamBar/TeamBar";
import ListBar from "@/components/feature/Dashboard/ListGroup/ListBar";
import ReportChart from "@/components/feature/Dashboard/ReportGroup/ReportChart";
import ReportBox from "@/components/feature/Dashboard/ReportGroup/ReportBox";
import { isSameDay, parseISO } from "date-fns";

export default function DashboardPage() {
  const router = useRouter();
  const params = useParams();
  const teamId = Number(params.teamId);

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
    if (teamId !== mockTeamData.teamId) {
      router.push("/");
    }
  }, [teamId, router]);

  const handleListClick = (listId: number) => {
    router.push(`/${teamId}/task-lists/${listId}`);
  };

  const today = new Date();

  const todayTasks = mockTeamData.taskLists
    .flatMap((list) => list.tasks)
    .filter((task) => isSameDay(parseISO(task.date), today));

  const todayDoneCount = todayTasks.filter(
    (task) => task.doneAt !== null,
  ).length;
  const todayTotalCount = todayTasks.length;

  return (
    <div className="w-full flex-col flex gap-12">
      <TeamBar teamName={mockTeamData.name} />
      <div className="flex flex-col gap-4">
        {/* TODO: API 연결 */}
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
      <div className="w-full flex bg-bg-secondary h-[13.5625rem] p-6 pl-6 sm:pl-8 rounded-xl items-center justify-between">
        <ReportChart done={todayDoneCount} total={todayTotalCount} />
        <div className="flex flex-col">
          <ReportBox />
          <ReportBox />
        </div>
      </div>
    </div>
  );
}
