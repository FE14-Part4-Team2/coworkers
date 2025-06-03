import { useModalStore } from "@/stores/modalStore";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@/styles/calendar.css";

interface CalendarModalProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export default function CalendarModal({
  selectedDate,
  onSelectDate,
}: CalendarModalProps) {
  const { modalType, isOpen, closeModal } = useModalStore();
  const [value, setValue] = useState<Date>(selectedDate);

  useEffect(() => {
    setValue(selectedDate);
  }, [selectedDate]);

  if (!isOpen || modalType !== "calendar") return null;

  const handleDateChange = (
    value: Date | [Date | null, Date | null] | null,
  ) => {
    if (!value) return;

    if (value instanceof Date) {
      setValue(value);
      onSelectDate(value);
    }

    closeModal();
  };

  return (
    <Modal showCloseIcon={false} buttonType="none-button">
      <Calendar
        onChange={handleDateChange}
        value={value}
        locale="ko-KR"
        calendarType="gregory"
        className="REACT-CALENDAR p-2 rounded"
        formatDay={(locale, date) => String(date.getDate())}
      />
    </Modal>
  );
}
