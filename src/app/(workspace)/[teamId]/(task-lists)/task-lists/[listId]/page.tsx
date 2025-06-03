"use client";

import { useParams } from "next/navigation";
import { mockTeamData } from "@/app/(workspace)/mock";
import { useState, useEffect } from "react";
import { format, isToday, addDays, subDays } from "date-fns";
import { ko } from "date-fns/locale/ko";
import CalendarModal from "@/components/common/Modal/CalendarModal";
import Image from "next/image";
import { useModalStore } from "@/stores/modalStore";
import TaskItem from "@/components/feature/TaskList/TaskItem";

export default function TaskListPage() {
  const { teamId, listId } = useParams();
  const numberListId = Number(listId);

  const [activeTabId, setActiveTabId] = useState<number>(numberListId);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { openModal } = useModalStore();

  // 할 일 목록 상태
  const [taskItems, setTaskItems] = useState(
    mockTeamData.taskLists
      .find((list) => list.id === activeTabId)
      ?.tasks.map((task) => ({
        ...task,
        checked: false,
      })) || [],
  );

  console.log(taskItems);
  // 탭이 바뀔 때마다 해당 탭의 할 일 목록으로 업데이트
  useEffect(() => {
    const newActiveList = mockTeamData.taskLists.find(
      (list) => list.id === activeTabId,
    );

    const updatedTasks =
      newActiveList?.tasks.map((task) => ({
        ...task,
        checked: false,
      })) || [];

    setTaskItems(updatedTasks);
  }, [activeTabId]);

  // 체크 상태 토글 함수
  const toggleCheck = (index: number) => {
    setTaskItems((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, checked: !task.checked } : task,
      ),
    );
  };

  const formattedDate = isToday(selectedDate)
    ? "오늘"
    : format(selectedDate, "M월 d일 (EEE)", { locale: ko });

  const handlePrev = () => {
    setSelectedDate((prev) => subDays(prev, 1));
  };

  const handleNext = () => {
    setSelectedDate((prev) => addDays(prev, 1));
  };

  return (
    <main className="w-full">
      <h1 className="text-xl font-bold mb-4">
        할 일 <br /> 팀 아이디 : {teamId} <br /> 팀 리스트 아이디 : {listId}
      </h1>

      {/* 날짜 네비게이션 */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-md font-medium ">{formattedDate}</span>
        <div
          onClick={handlePrev}
          className="cursor-pointer"
          aria-label="이전 날짜"
        >
          <Image
            src="/icons/icon-circle-arrow_left.svg"
            alt="이전 날짜"
            width={20}
            height={20}
          />
        </div>

        <div
          onClick={handleNext}
          className="cursor-pointer"
          aria-label="다음 날짜"
        >
          <Image
            src="/icons/icon-circle-arrow_right.svg"
            alt="다음 날짜"
            width={20}
            height={20}
          />
        </div>
        <div
          onClick={() => openModal("calendar")}
          className="cursor-pointer"
          aria-label="달력 열기"
        >
          <Image
            src="/icons/icon-circle-calender.svg"
            alt="달력 아이콘"
            width={24}
            height={24}
          />
        </div>
      </div>

      {/* 달력 모달 */}
      <CalendarModal
        selectedDate={selectedDate}
        onSelectDate={(date) => setSelectedDate(date)}
      />

      {/* 탭 버튼 영역 */}
      <div className="flex space-x-3 mb-4">
        {mockTeamData.taskLists.map((list) => (
          <div
            key={list.id}
            onClick={() => setActiveTabId(list.id)}
            className={`pb-1 text-lg font-medium border-b-2 cursor-pointer
              ${
                list.id === activeTabId
                  ? "text-text-inverse border-text-inverse"
                  : "text-text-default border-transparent"
              }`}
          >
            {list.name}
          </div>
        ))}
      </div>

      {/* 선택된 탭의 할 일 목록 */}
      {taskItems.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {taskItems.map((task, idx) => (
            <TaskItem key={idx} task={task} onToggle={() => toggleCheck(idx)} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-2">할 일이 없습니다.</p>
      )}
    </main>
  );
}
