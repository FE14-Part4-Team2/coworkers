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
import Label from "@/components/feature/Dashboard/Label/Label";
import TodoModal from "@/components/common/Modal/TodoModal";
import InviteModal from "@/components/common/Modal/InviteModal";

export default function DashboardPage() {
  const router = useRouter();
  const { teamId } = useParams();
  const { openModal } = useModalStore();

  const isCurrentAdmin =
    mockTeamData.members.find((m) => m.userEmail === currentUser.userEmail)
      ?.role === "ADMIN";

  const taskListCount = mockTeamData.taskLists.length;
  const memberCount = mockTeamData.members.length;

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

  const [todoTitle, setTodoTitle] = useState("");

  return (
    <div className="w-full flex-col flex gap-12">
      <TeamBar teamName={mockTeamData.name} />
      <div className="flex flex-col gap-4">
        <Label
          title="할 일 목록"
          count={`(${taskListCount}개)`}
          modalButton="+ 목록 추가하기"
          onClickModalButton={() => openModal("todo")}
        />
        {taskListCount === 0 ? (
          <div className="w-full h-32 flex items-center justify-center">
            <div className="text-text-default text-md">
              아직 할 일 목록이 없습니다.
            </div>
          </div>
        ) : (
          // TODO: API 연결
          mockTeamData.taskLists.map((list, index) => {
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
          })
        )}
      </div>

      <div className="flex flex-col gap-4">
        <Label title="리포트" />
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
      </div>
      <div className="flex flex-col gap-4">
        <Label
          title="멤버"
          count={`(${memberCount}명)`}
          modalButton="+ 새로운 멤버 초대하기"
          showModalButton={isCurrentAdmin}
          onClickModalButton={() => openModal("invite")}
        />
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {/* TODO: API 연결 */}
          {mockTeamData.members.map((member) => {
            const isSelf = member.userEmail === currentUser.userEmail;
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
      </div>
      {selectedProfile && (
        <ProfileModal
          name={selectedProfile.name}
          email={selectedProfile.email}
          profileImageUrl={selectedProfile.profileImageUrl}
          onCopy={() => {
            navigator.clipboard.writeText(selectedProfile.email);
            alert("이메일이 복사되었습니다!"); // TODO: 토스트 연결
          }}
        />
      )}
      <TodoModal
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        onSubmit={(e) => {
          e.preventDefault();
          // TODO: API 연결
          setTodoTitle("");
        }}
      />
      <InviteModal
        onCopy={() => {
          navigator.clipboard.writeText("https://coworkers/invite"); // TODO: 실제 링크 연결
          alert("초대 링크가 복사되었습니다!"); // TODO: 토스트 연결
        }}
      />
    </div>
  );
}
