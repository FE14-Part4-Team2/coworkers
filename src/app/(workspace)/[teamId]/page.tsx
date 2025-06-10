"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { mockTeamData, currentUser } from "../mock";
import TeamBar from "@/components/feature/Dashboard/TeamBar/TeamBar";
import ListBar from "@/components/feature/Dashboard/ListGroup/ListBar";
import ReportChart from "@/components/feature/Dashboard/ReportGroup/ReportChart";
import ReportBox from "@/components/feature/Dashboard/ReportGroup/ReportBox";
import { isSameDay, parseISO } from "date-fns";
import MemberBox from "@/components/feature/Dashboard/MemberGroup/MemberBox";
import { useModalStore } from "@/stores/modalStore";
import ProfileModal from "@/components/common/Modal/ProfileModal";

export default function DashboardPage() {
  const router = useRouter();
  const { teamId } = useParams();
  const { openModal } = useModalStore();

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

  {
    /* TODO: API 연결 */
  }
  const handleListClick = (listId: number) => {
    router.push(`/${teamId}/task-lists/${listId}`);
  };

  const today = new Date();

  {
    /* TODO: API 연결 */
  }
  const todayTasks = mockTeamData.taskLists
    .flatMap((list) => list.tasks)
    .filter((task) => isSameDay(parseISO(task.date), today));

  const todayDoneCount = todayTasks.filter(
    (task) => task.doneAt !== null,
  ).length;
  const todayTotalCount = todayTasks.length;

  const [selectedProfile, setSelectedProfile] = useState<{
    name: string;
    email: string;
    profileImageUrl: string;
  } | null>(null);

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
      <div className="w-full flex bg-bg-secondary h-[13.5625rem] p-6 pl-6 sm:pl-8 rounded-xl items-center justify-between gap-6 sm:gap-14">
        <ReportChart done={todayDoneCount} total={todayTotalCount} />
        <div className="flex flex-col w-full gap-4 items-end">
          <ReportBox
            content="오늘의 할 일"
            count={todayTotalCount}
            image="/icons/icon-avatar.svg"
          />
          <ReportBox
            content="한 일"
            count={todayDoneCount}
            image="/icons/icon-done.svg"
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
        {/* TODO: API 연결 */}
        {mockTeamData.members.map((member) => {
          const isSelf = member.userEmail === currentUser.userEmail;
          const isCurrentAdmin =
            mockTeamData.members.find(
              (m) => m.userEmail === currentUser.userEmail,
            )?.role === "ADMIN";

          const isAbleButton = isCurrentAdmin ? !isSelf : isSelf;

          return (
            <MemberBox
              key={member.userId + member.userEmail}
              profile={member.userImage}
              name={member.userName}
              email={member.userEmail}
              isAdmin={member.role === "ADMIN"}
              isSelf={isSelf}
              isAbleButton={isAbleButton}
              onClickProfile={() => {
                setSelectedProfile({
                  name: member.userName,
                  email: member.userEmail,
                  profileImageUrl: member.userImage,
                });
                openModal("profile");
              }}
            />
          );
        })}
      </div>
      {selectedProfile && (
        <ProfileModal
          name={selectedProfile.name}
          email={selectedProfile.email}
          profileImageUrl={selectedProfile.profileImageUrl}
          onCopy={() => {
            navigator.clipboard.writeText(selectedProfile.email);
            alert("이메일이 복사되었습니다!"); // TODO: 모달 연결
          }}
        />
      )}
    </div>
  );
}
