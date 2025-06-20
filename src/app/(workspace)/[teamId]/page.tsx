"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
import { useDeleteGroupMember, useGroupQuery } from "@/api/group/group.query";
import { TaskDetailType } from "@/api/task/task.schema";
import { useMyMemberships } from "@/api/user/user.query";
import { useToastStore } from "@/stores/toastStore";
import DeleteModal from "@/components/common/Modal/DeleteModal";
import {
  useCreateTaskList,
  useDeleteTaskList,
  useUpdateTaskList,
} from "@/api/task-list/task-list.query";
import TodoEditModal from "@/components/common/Modal/TodoEditModal";
import { groupService } from "@/api/group/group.service";
import Skeleton from "@/components/common/Skeleton/Skeleton";
import SuccessInviteModal from "@/components/common/Modal/SuccessInviteModal";

export default function DashboardPage() {
  const router = useRouter();
  const { teamId } = useParams() as { teamId: string };
  const { openModal, closeModal, modalType } = useModalStore();
  const { showToast } = useToastStore();

  const [selectedProfile, setSelectedProfile] = useState<{
    name: string;
    email: string;
    profileImageUrl: string;
  } | null>(null);

  const [memberToDelete, setMemberToDelete] = useState<{
    userId: number;
    name: string;
    email: string;
  } | null>(null);

  const [todoTitle, setTodoTitle] = useState("");
  const [editList, setEditList] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [deleteList, setDeleteList] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { data: groupData, isLoading } = useGroupQuery(teamId as string);
  const { data: memberships, isLoading: isMembershipLoading } =
    useMyMemberships();
  const { mutate: createTaskList } = useCreateTaskList(teamId as string);
  const updateMutation = useUpdateTaskList(teamId, editList ? editList.id : "");
  const deleteMutation = useDeleteTaskList(
    teamId,
    deleteList ? deleteList.id : "",
  );
  const deleteGroupMember = useDeleteGroupMember(
    teamId,
    memberToDelete?.userId ?? 0,
  );

  const pointColors = [
    "bg-point-purple",
    "bg-point-blue",
    "bg-point-cyan",
    "bg-point-pink",
    "bg-point-rose",
    "bg-point-orange",
    "bg-point-yellow",
  ];

  const today = useMemo(() => new Date(), []);

  const todayTasks = useMemo(() => {
    if (!groupData) return [];
    return groupData.taskLists
      .flatMap((list) => list.tasks)
      .filter((task: TaskDetailType) => isSameDay(parseISO(task.date), today));
  }, [groupData, today]);

  const todayDoneCount = todayTasks.filter(
    (task) => task.doneAt !== null,
  ).length;
  const todayTotalCount = todayTasks.length;

  useEffect(() => {
    if (modalType !== "delete") {
      setDeleteList(null);
      setMemberToDelete(null);
    }
  }, [modalType, setDeleteList, setMemberToDelete]);

  useEffect(() => {
    if (!isLoading && !isMembershipLoading && memberships && groupData) {
      const myMembership = memberships.find(
        (m) => m.groupId === Number(teamId),
      );

      if (!myMembership) {
        showToast("먼저 팀 참여가 필요합니다.", "error");
        router.replace("/join");
        return;
      }
    }
  }, [
    isLoading,
    isMembershipLoading,
    memberships,
    groupData,
    router,
    showToast,
    teamId,
  ]);

  if (isLoading || isMembershipLoading || !groupData || !memberships) {
    return (
      <div className="w-full flex flex-col gap-12">
        <Skeleton className="h-16 w-full rounded-xl" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="w-full h-[13.5625rem] rounded-xl" />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-24" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-[4.25rem] rounded-xl w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const myMembership = memberships.find((m) => m.groupId === Number(teamId));
  const currentUserEmail = myMembership?.userEmail;
  const isCurrentAdmin = myMembership?.role === "ADMIN";

  const taskListCount = groupData.taskLists.length;
  const memberCount = groupData.members.length;

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editList || !groupData) return;

    const isDuplicate = groupData.taskLists.some(
      (list) =>
        list.name.trim() === editList.name.trim() &&
        list.id.toString() !== editList.id,
    );

    if (isDuplicate) {
      showToast("이미 해당 목록이 존재합니다.", "error");
      return;
    }

    updateMutation.mutate(
      { name: editList.name },
      {
        onSuccess: () => {
          setEditList(null);
          closeModal();
          showToast("수정 완료!", "success");
        },
        onError: () => {
          closeModal();
          showToast("수정 실패", "error");
        },
      },
    );
  };

  const handleListDelete = () => {
    if (!deleteList) return;
    deleteMutation.mutate(undefined, {
      onSuccess: () => {
        setDeleteList(null);
        closeModal();
        showToast("삭제 완료!", "success");
      },
      onError: () => {
        closeModal();
        showToast("삭제 실패", "error");
      },
    });
  };

  const handleMemberDelete = () => {
    if (!memberToDelete) return;

    const isSelf = memberToDelete.email === currentUserEmail;

    deleteGroupMember.mutate(undefined, {
      onSuccess: () => {
        setMemberToDelete(null);
        closeModal();

        if (isSelf) {
          showToast("팀 탈퇴 완료", "success");
          router.replace("/");
        } else {
          showToast("삭제 완료!", "success");
        }
      },
      onError: () => {
        closeModal();
        showToast("삭제 실패", "error");
      },
    });
  };

  const handleCopyInviteLink = () => {
    groupService.getInvitationToken(teamId).then((token) => {
      const inviteUrl = `${window.location.origin}/invite?token=${token}`;
      navigator.clipboard.writeText(inviteUrl);
      closeModal();
      openModal("success-invite");
    });
  };

  return (
    <div className="w-full flex-col flex gap-12">
      <TeamBar teamName={groupData.name} showDropdown={isCurrentAdmin} />
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
          groupData.taskLists.map((list, index) => {
            const doneCount = list.tasks.filter(
              (task: TaskDetailType) => task.doneAt !== null,
            ).length;
            const totalCount = list.tasks.length;
            const colorClass = pointColors[index % pointColors.length];

            return (
              <div
                key={list.id}
                onClick={(e) => {
                  if (modalType) return;
                  const target = e.target as HTMLElement;
                  if (target.closest(".prevent-list-click")) return;
                  router.push(`/${teamId}/task-lists/${list.id}`);
                }}
              >
                <ListBar
                  listName={list.name}
                  done={doneCount}
                  total={totalCount}
                  colorClass={colorClass}
                  onEdit={() => {
                    setEditList({ id: list.id.toString(), name: list.name });
                    openModal("todo-edit");
                  }}
                  onDelete={() => {
                    setDeleteList({ id: list.id.toString(), name: list.name });
                    setMemberToDelete(null);
                    openModal("delete");
                  }}
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
          {groupData.members.map((member) => {
            const isSelf = member.userEmail === currentUserEmail;
            const isAbleButton = isCurrentAdmin ? !isSelf : isSelf;

            return (
              <MemberBox
                key={member.userId + member.userEmail}
                profile={member.userImage || "/icons/icon-profile-default.svg"}
                name={member.userName}
                email={member.userEmail}
                isAdmin={member.role === "ADMIN"}
                isSelf={isSelf}
                isAbleButton={isAbleButton}
                onClickProfile={() => {
                  setSelectedProfile({
                    name: member.userName,
                    email: member.userEmail,
                    profileImageUrl: member.userImage || "",
                  });
                  openModal("profile");
                }}
                onClickDelete={() => {
                  setMemberToDelete({
                    userId: member.userId,
                    name: member.userName,
                    email: member.userEmail,
                  });
                  setDeleteList(null);
                  openModal("delete");
                }}
              />
            );
          })}
        </div>
      </div>
      <TodoEditModal
        value={editList?.name || ""}
        onChange={(e) =>
          setEditList((prev) =>
            prev ? { ...prev, name: e.target.value } : prev,
          )
        }
        onSubmit={handleEditSubmit}
      />
      {modalType === "delete" &&
        (deleteList ? (
          <DeleteModal
            title={`\"${deleteList?.name}"을(를) 삭제하시겠습니까?`}
            description={`해당 할 일 목록에 포함된 할 일 리스트가 \n 모두 삭제됩니다.`}
            onConfirm={handleListDelete}
          />
        ) : memberToDelete ? (
          <DeleteModal
            title={`\"${memberToDelete.name}" 님을 내보내시겠습니까?`}
            description={`해당 멤버에 관한 모든 정보가 팀에서 삭제되며 \n 본인을 팀에서 삭제할 경우 접근이 불가능합니다.`}
            onConfirm={handleMemberDelete}
          />
        ) : null)}
      {selectedProfile && (
        <ProfileModal
          name={selectedProfile.name}
          email={selectedProfile.email}
          profileImageUrl={selectedProfile.profileImageUrl}
          isSelf={selectedProfile.email === currentUserEmail}
          onCopy={() => {
            navigator.clipboard.writeText(selectedProfile.email);
            closeModal();
            setSelectedProfile(null);
            showToast("이메일 복사 완료!", "success");
          }}
          onClickUserSetting={() => {
            closeModal();
            router.push("/user-setting");
          }}
        />
      )}
      <TodoModal
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        onSubmit={(e) => {
          e.preventDefault();
          const trimmedTitle = todoTitle.trim();
          if (!trimmedTitle || !groupData) return;

          const isDuplicate = groupData.taskLists.some(
            (list) => list.name.trim() === trimmedTitle,
          );

          if (isDuplicate) {
            showToast("이미 해당 목록이 존재합니다.", "error");
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
      <InviteModal onCopy={handleCopyInviteLink} />
      <SuccessInviteModal />
    </div>
  );
}
