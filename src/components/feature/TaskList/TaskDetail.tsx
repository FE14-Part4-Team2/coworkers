import { TaskDetailType } from "@/api/task/task.schema";
import clsx from "clsx";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import {
  useGetComments,
  useCreateComment,
  useUpdateComment,
  useDeleteComment,
} from "@/api/comment/comment.query";
import Button from "@/components/common/Button";
import TaskCommentDropdown from "./TaskCommentDropdown";
import { CommentType } from "@/api/comment/comment.schema";
import { useModalStore } from "@/stores/modalStore";
import DeleteModal from "@/components/common/Modal/DeleteModal";
import { useToastStore } from "@/stores/toastStore";
import TaskDetailDropdown from "./TaskDetailDropdown";
import Textarea from "@/components/common/TextArea/TextArea";
import Input from "@/components/common/Input/Input";

dayjs.extend(relativeTime);
dayjs.locale("ko");

interface TaskDetailProps {
  task: TaskDetailType;
  onClose: () => void;
  onCommentChange: () => void;
  onToggle: () => void;
  onUpdate: (task: { id: number; name: string; description: string }) => void;
  onDeleteTask: (taskId: number) => void;
}

export default function TaskDetail({
  task,
  onClose,
  onCommentChange,
  onToggle,
  onUpdate,
  onDeleteTask,
}: TaskDetailProps) {
  const [comment, setComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedName, setEditedName] = useState(task.name);
  const [editedDescription, setEditedDescription] = useState(
    task.description || "",
  );
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "task" | "comment";
    id: number | string;
  } | null>(null);

  useEffect(() => {
    if (deleteTarget) {
      openModal("delete");
    }
  }, [deleteTarget]);

  // 저장 버튼 클릭
  const handleTaskSave = () => {
    onUpdate({
      id: task.id,
      name: editedName,
      description: editedDescription,
    });
    setIsEditMode(false);
  };

  // 취소 버튼
  const handleTaskCancel = () => {
    setEditedName(task.name);
    setEditedDescription(task.description || "");
    setIsEditMode(false);
  };

  const handleTaskDelete = (taskId: number) => {
    if (!onDeleteTask) return; // 혹시 함수가 안넘어왔을 때 대비

    onDeleteTask(taskId); // 부모에서 넘긴 삭제 함수 호출
  };

  const { openModal, closeModal, modalType } = useModalStore();
  const { showToast } = useToastStore();

  const handleToggle = () => {
    onToggle();
  };

  const { data: comments } = useGetComments(String(task.id));
  const createCommentMutation = useCreateComment(String(task.id));
  const updateCommentMutation = useUpdateComment(String(task.id));
  const deleteCommentMutation = useDeleteComment(String(task.id));

  const handleAddComment = () => {
    if (!comment.trim()) return;

    createCommentMutation.mutate(
      { content: comment },
      {
        onSuccess: () => {
          setComment("");
          onCommentChange();
        },
      },
    );
  };

  const handleEdit = (comment: CommentType) => {
    setEditingCommentId(comment.id);
    setEditedContent(comment.content);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedContent("");
  };

  const handleSaveEdit = (commentId: string) => {
    if (!editedContent.trim()) return;
    updateCommentMutation.mutate(
      { commentId, body: { content: editedContent } },
      {
        onSuccess: () => {
          setEditingCommentId(null);
          setEditedContent("");
          showToast("수정 완료", "success");
        },
      },
    );
  };

  const handleDelete = (commentId: string) => {
    deleteCommentMutation.mutate(commentId, {
      onSuccess: () => {
        onCommentChange();
        closeModal();
        showToast("삭제 완료", "info");
      },
    });
  };

  const openDeleteModal = (type: "task" | "comment", id: number | string) => {
    console.log("openDeleteModal 호출", type, id);
    setDeleteTarget({ type, id });
    openModal("delete");
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === "task") {
      handleTaskDelete(Number(deleteTarget.id));
    } else if (deleteTarget.type === "comment") {
      handleDelete(String(deleteTarget.id));
    }

    closeModal();
    setDeleteTarget(null);
  };

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />

      <div
        className={clsx(
          "fixed top-0 right-0 z-50 h-full bg-bg-secondary shadow-lg p-8",
          "w-full",
          "md:w-[435px]",
          "lg:w-[779px]",
        )}
      >
        <div
          onClick={onClose}
          aria-label="닫기"
          className="cursor-pointer inline-block"
        >
          <Image
            src="/icons/icon-close.svg"
            alt="닫기"
            width={24}
            height={24}
          />
        </div>

        <div className="h-[calc(100vh-72px)] overflow-y-auto pr-4 pb-8 scroll-custom">
          <div className="flex items-center justify-between mt-4">
            <h2
              className={`text-xl ${task.doneAt ? "line-through text-gray-400" : ""}`}
            >
              {isEditMode ? (
                <Input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="border px-2 py-1 rounded w-full text-black"
                />
              ) : (
                task?.name
              )}
            </h2>

            <TaskDetailDropdown
              onEdit={() => {
                console.log("디테일 클릭한 task 정보:", task);
                setIsEditMode(true);
              }}
              onDelete={() => {
                console.log("삭제하려는 task 정보:", task);
                openDeleteModal("task", task.id);
                openModal("delete");
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              {task.writer?.image ? (
                <Image
                  src={task.writer.image}
                  alt="프로필 이미지"
                  width={32}
                  height={32}
                />
              ) : (
                <Image
                  src="/icons/icon-profile-default.svg"
                  alt="기본 프로필 이미지"
                  width={32}
                  height={32}
                />
              )}
              <span className="ml-2 text-md font-regular">
                {task.writer?.nickname}
              </span>
            </div>
            <div className="text-text-secondary text-md">
              {format(new Date(task.date), "yyyy년 M월 d일", {
                locale: ko,
              })}
            </div>
          </div>
          <div className="flex items-center text-xs font-regular text-text-default mt-3">
            <div className="flex items-center">
              <Image
                src="/icons/icon-calender.svg"
                alt="달력"
                width={16}
                height={16}
              />
              <span className=" ml-1">
                {format(new Date(task.date), "yyyy년 M월 d일", {
                  locale: ko,
                })}
              </span>
            </div>
            <span className="ml-2 mr-2">|</span>
            <div className="flex items-center">
              <Image
                src="/icons/icon-repeat.svg"
                alt="반복"
                width={16}
                height={16}
              />
              <span className="ml-2">
                {task.frequency === "ONCE" && "한 번"}
                {task.frequency === "DAILY" && "매일 반복"}
                {task.frequency === "WEEKLY" && "주 반복"}
                {task.frequency === "MONTHLY" && "월 반복"}
              </span>
            </div>
          </div>
          <div className="mt-4 overflow-wrap-anywhere whitespace-normal h-[200px] break-words ">
            {isEditMode ? (
              <Textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full h-full border px-2 py-1 rounded text-white resize-none "
              />
            ) : (
              task.description
            )}
          </div>

          {isEditMode && (
            <div className="mt-[50px] flex justify-end space-x-2">
              <Button
                type="button"
                label="저장"
                variant="primary"
                size="sm"
                className="w-[6.5rem]"
                onClick={handleTaskSave}
              />
              <Button
                type="button"
                label="취소"
                variant="secondary"
                size="sm"
                className="w-[6.5rem]"
                onClick={handleTaskCancel}
              />
            </div>
          )}
          <div className="relative mt-2">
            <textarea
              className="w-full border-t border-b border-x-0 border-border-primary resize-none text-14-400 p-2 pr-10 h-16 focus:outline-none bg-transparent"
              rows={2}
              placeholder="댓글을 달아주세요."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <style jsx>{`
              textarea::-webkit-scrollbar {
                display: none;
              }
              textarea {
                scrollbar-width: none; /* Firefox */
              }
            `}</style>
            <div
              className={`absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer ${
                comment ? "pointer-events-auto" : "pointer-events-none"
              }`}
              onClick={comment ? handleAddComment : undefined}
            >
              <Image
                src={
                  comment
                    ? "/icons/icon-submit.svg"
                    : "/icons/icon-submit-disable.svg"
                }
                alt="Submit button"
                width={24}
                height={24}
                className={comment ? "opacity-100" : "opacity-50"}
              />
            </div>
          </div>

          <div>
            {comments
              ?.slice()
              .reverse()
              .map((comment) => {
                const isEditing = editingCommentId === comment.id;

                return (
                  <div
                    key={comment.id}
                    className="border-b border-x-0 border-border-primary pt-4 pb-4"
                  >
                    <div className="flex items-start justify-between">
                      {isEditing ? (
                        <input
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                          className="border-none outline-none bg-transparent rounded px-2 py-1 w-full mr-4"
                        />
                      ) : (
                        <span className="text-md whitespace-pre-line">
                          {comment.content}
                        </span>
                      )}

                      {!isEditing && (
                        <TaskCommentDropdown
                          onEdit={() => handleEdit(comment)}
                          onDelete={() =>
                            openDeleteModal("comment", comment.id)
                          }
                        />
                      )}
                    </div>
                    {modalType === "delete" && deleteTarget && (
                      <DeleteModal
                        title={
                          deleteTarget.type === "task"
                            ? "할 일 삭제"
                            : "댓글 삭제"
                        }
                        description={
                          deleteTarget.type === "task"
                            ? "할 일을 정말 삭제하시겠습니까?"
                            : "댓글을 정말 삭제하시겠습니까?"
                        }
                        onConfirm={handleConfirmDelete}
                      />
                    )}

                    {isEditing && (
                      <div className="flex gap-2 mt-2">
                        <Button
                          type="button"
                          label="저장"
                          variant="primary"
                          size="sm"
                          className="w-[3rem]"
                          onClick={() => handleSaveEdit(String(comment.id))}
                        />
                        <Button
                          type="button"
                          label="취소"
                          variant="secondary"
                          size="sm"
                          className="w-[3rem]"
                          onClick={handleCancelEdit}
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center">
                        {task.writer?.image ? (
                          <Image
                            src={task.writer.image}
                            alt="프로필 이미지"
                            width={32}
                            height={32}
                          />
                        ) : (
                          <Image
                            src="/icons/icon-profile-default.svg"
                            alt="기본 프로필 이미지"
                            width={32}
                            height={32}
                          />
                        )}
                        <span className="ml-2 text-md font-regular">
                          {comment.user.nickname}
                        </span>
                      </div>
                      <div className="text-md font-regular text-gray-500">
                        {dayjs().diff(comment.createdAt, "minute") < 1
                          ? "방금 전"
                          : dayjs(comment.createdAt).fromNow()}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              type="button"
              label={task.doneAt ? "완료 취소하기" : "완료 하기"}
              variant={task.doneAt ? "secondary" : "primary"}
              size="floating-md"
              className="w-[9rem]"
              onClick={handleToggle}
              icon={
                task.doneAt ? (
                  <Image
                    src="/icons/icon-check-green.svg"
                    alt="plus"
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                ) : (
                  ""
                )
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
