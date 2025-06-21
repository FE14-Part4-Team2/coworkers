"use client";

import { useModalStore } from "@/stores/modalStore";
import Modal from "./Modal";
import Input from "../Input/Input";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@/styles/calendar.css";
import { FrequencyType } from "@/api/task/task.schema";
import Textarea from "../TextArea/TextArea";
import RepeatDropdown from "../Dropdown/RepeatDropdown";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

interface TodoCreateModalProps {
  formData: {
    name: string;
    description?: string;
    startDate: string;
    frequencyType: FrequencyType;
    monthDay?: number;
    weekDays?: number[];
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onDateChange: (date: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onFrequencyChange: (value: FrequencyType) => void;
  onWeekDaysChange: (days: number[]) => void;
  onMonthDayChange: (day: number | undefined) => void;
}

dayjs.extend(utc);
dayjs.extend(timezone);

const formatDateToKSTString = (date: Date) => {
  return dayjs(date).tz("Asia/Seoul").format("YYYY-MM-DDTHH:mm:ssZ");
};

const handleMonthDayChange = (
  value: string,
  onMonthDayChange: (day: number | undefined) => void,
  onDateChange: (date: string) => void,
) => {
  if (value === "") {
    onMonthDayChange(undefined);
    return;
  }

  // 숫자가 아닌 경우 무시
  if (!/^\d+$/.test(value)) return;

  const day = Number(value);

  if (day < 1 || day > 31) return;

  onMonthDayChange(day);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  let targetYear = year;
  let targetMonth = month;

  if (day < today) {
    if (month === 11) {
      targetYear += 1;
      targetMonth = 0;
    } else {
      targetMonth += 1;
    }
  }

  const targetDate = new Date(targetYear, targetMonth, day);
  targetDate.setHours(0, 0, 0, 0);

  onDateChange(formatDateToKSTString(targetDate));
};

// 달력에서 날짜 선택 시 처리 함수
const handleCalendarChange = (
  date: Date,
  onDateChange: (date: string) => void,
) => {
  const dateKST = dayjs(date).tz("Asia/Seoul");

  const fixedDateKST = dayjs.tz(
    `${dateKST.format("YYYY-MM-DD")}T21:00:00`,
    "Asia/Seoul",
  );

  onDateChange(fixedDateKST.format());
};

export default function TodoCreateModal({
  formData,
  onChange,
  onSubmit,
  onDateChange,
  onFrequencyChange,
  onWeekDaysChange,
  onMonthDayChange,
}: TodoCreateModalProps) {
  const { isOpen, modalType } = useModalStore();

  const toggleWeekDay = (day: number) => {
    const updated = formData.weekDays?.includes(day)
      ? formData.weekDays.filter((d) => d !== day)
      : [...(formData.weekDays || []), day];
    onWeekDaysChange(updated);
  };

  if (!isOpen || modalType !== "todo-create") return null;

  const calendarValue = formData.startDate
    ? new Date(formData.startDate)
    : new Date();

  return (
    <Modal
      title="새로운 목록 추가"
      description={`할 일에 대한 목록을 추가하고\n목록별 할 일을 만들 수 있습니다.`}
      buttonType="single-green"
      confirmText="만들기"
      confirmButtonType="submit"
      onSubmit={onSubmit}
    >
      <div className="my-4">
        <Input
          id="todo-title"
          name="name"
          type="text"
          label="할 일 제목"
          placeholder="할 일 제목을 입력해주세요."
          value={formData.name}
          onChange={onChange}
          required
        />
      </div>

      <div className="mb-4">
        <Textarea
          name="description"
          label="할 일 메모"
          height="h-[6rem]"
          placeholder="메모를 입력해주세요."
          value={formData.description}
          onChange={onChange}
        />
      </div>

      <div className="mb-4 repaet-dropdown">
        <label className="block mb-3">반복 설정</label>
        <RepeatDropdown
          value={formData.frequencyType}
          onChange={onFrequencyChange}
        />
      </div>

      {formData.frequencyType === "WEEKLY" && (
        <div className="mb-4">
          <label>반복 요일 선택</label>
          <div className="flex justify-between mt-2">
            {["일", "월", "화", "수", "목", "금", "토"].map((day, i) => (
              <button
                type="button"
                key={i}
                onClick={() => toggleWeekDay(i)}
                className={`px-2 py-1 rounded ${
                  (formData.weekDays || []).includes(i)
                    ? "bg-brand-primary text-white"
                    : "bg-bg-primary"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-4">
        {formData.frequencyType === "MONTHLY" ? (
          <div>
            <label className="block mb-2">반복 날짜 입력 (1~31)</label>
            <Input
              type="text"
              name="monthDay"
              min={1}
              max={31}
              placeholder="예: 15"
              value={formData.monthDay || ""}
              onChange={(e) =>
                handleMonthDayChange(
                  e.target.value,
                  onMonthDayChange,
                  onDateChange,
                )
              }
            />
          </div>
        ) : (
          <>
            <label>시작 날짜</label>
            <Calendar
              value={calendarValue}
              onChange={(date) => {
                if (date instanceof Date) {
                  handleCalendarChange(date, onDateChange);
                }
              }}
              formatDay={(locale, date) => String(date.getDate())}
            />
          </>
        )}
      </div>

      {formData.frequencyType === "MONTHLY" && formData.monthDay && (
        <p className="text-sm text-gray-500 mt-2">
          매월 <strong>{formData.monthDay}일</strong> 반복됩니다.
        </p>
      )}
    </Modal>
  );
}
