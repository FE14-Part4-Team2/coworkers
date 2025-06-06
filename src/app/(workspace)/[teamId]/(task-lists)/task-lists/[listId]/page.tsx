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
import clsx from "clsx";

export default function TaskListPage() {
  const { teamId, listId } = useParams();
  const numberListId = Number(listId);

  const [activeTabId, setActiveTabId] = useState<number>(numberListId);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [detail, setDetail] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [comment, setComment] = useState("");
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

  // 리스트 디테일
  const listDetail = ({ ...task }) => {
    setSelectedTask(task);
    setDetail((prev) => !prev);
  };

  useEffect(() => {
    console.log(selectedTask);
  }, []);

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
            <TaskItem
              key={idx}
              task={task}
              onToggle={() => toggleCheck(idx)}
              onDetail={() => listDetail({ ...task })}
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-2">할 일이 없습니다.</p>
      )}

      {detail && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setDetail(false)}
          />

          <div
            className={clsx(
              "fixed top-0 right-0 z-50 h-full bg-bg-secondary shadow-lg p-8",
              "w-full",
              "md:w-[435px]",
              "lg:w-[779px]",
            )}
          >
            <div className="">
              <div onClick={() => setDetail(false)} aria-label="닫기">
                <Image
                  src="/icons/icon-close.svg"
                  alt="닫기"
                  width={24}
                  height={24}
                />
              </div>
            </div>

            <div className="">
              <div className="flex items-center justify-between mt-4">
                <h2 className="text-xl">{selectedTask?.name}</h2>
                <Image
                  src="/icons/icon-kebabs.svg"
                  alt="kebabs"
                  width={4}
                  height={4}
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <Image
                    src="/icons/icon-profile-default.svg"
                    alt="프로필이미지"
                    width={32}
                    height={32}
                  />
                  <span className="ml-2 text-md font-regular">김성빈</span>
                </div>
                <div className="text-text-secondary text-md">
                  {format(new Date(selectedTask.date), "yyyy년 M월 d일", {
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
                    {format(new Date(selectedTask.date), "yyyy년 M월 d일", {
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
                  <span className="ml-2">반복없음</span>
                </div>
              </div>
              <div className="mt-4 overflow-wrap-anywhere h-[200px] whitespace-normal break-words text-14-400 overflow-y-auto overflow-x-hidden">
                컨텐츠
              </div>
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
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
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

              <div className="mt-2">
                <div className="border-b border-x-0 border-border-primary pt-4 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-md">안녕하세요</span>
                    <Image
                      src="/icons/icon-kebabs.svg"
                      alt="kebabs"
                      width={3}
                      height={3}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <Image
                        src="/icons/icon-profile-default.svg"
                        alt="프로필이미지"
                        width={32}
                        height={32}
                      />
                      <span className="ml-2 text-md font-regular">김성빈</span>
                    </div>
                    <div className="text-md font-regular">16분전</div>
                  </div>
                </div>
                <div className="border-b border-x-0 border-border-primary pt-4 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-md">안녕하세요</span>
                    <Image
                      src="/icons/icon-kebabs.svg"
                      alt="kebabs"
                      width={3}
                      height={3}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <Image
                        src="/icons/icon-profile-default.svg"
                        alt="프로필이미지"
                        width={32}
                        height={32}
                      />
                      <span className="ml-2 text-md font-regular">김성빈</span>
                    </div>
                    <div className="text-md font-regular">16분전</div>
                  </div>
                </div>
                <div className="border-b border-x-0 border-border-primary pt-4 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-md">안녕하세요</span>
                    <Image
                      src="/icons/icon-kebabs.svg"
                      alt="kebabs"
                      width={3}
                      height={3}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <Image
                        src="/icons/icon-profile-default.svg"
                        alt="프로필이미지"
                        width={32}
                        height={32}
                      />
                      <span className="ml-2 text-md font-regular">김성빈</span>
                    </div>
                    <div className="text-md font-regular">16분전</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
