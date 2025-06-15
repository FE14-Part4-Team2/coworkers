import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import TeamNameError from "./TeamNameError";
import { useState } from "react";
interface TeamFormLayoutProps {
  title: string;
  buttonLabel: string;
  tip?: string;
  placeholder?: string;
  inputValue?: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputBlur?: () => void;
  isInputError?: boolean;
  isButtonDisabled?: boolean;
  errorMessage?: string;
}

export default function TeamFormLayout({
  title,
  buttonLabel,
  tip,
  placeholder,
  inputValue,
  children,
  onSubmit,
  onKeyDown,
  onInputChange,
  onInputBlur,
  isInputError,
  isButtonDisabled,
  errorMessage = "팀 이름을 입력해주세요.",
}: TeamFormLayoutProps) {
  const error = useState("");
  return (
    <main className="mt-[4.5rem] sm:mt-0 w-full items-center justify-center">
      <h1 className="pb-[1.5rem] text-2xl sm:pb-[5rem] md:text-4xl text-center font-medium text-text-primary">
        {title}
      </h1>
      <form onSubmit={onSubmit} className="w-full">
        {children}
        <Input
          placeholder={placeholder}
          value={inputValue}
          onChange={onInputChange}
          onBlur={onInputBlur}
          error={!isInputError}
          onKeyDown={onKeyDown}
        />
        {error && <TeamNameError message={errorMessage} />}
        <Button
          label={buttonLabel}
          variant="primary"
          className="w-full mt-[2.5rem] mb-[1.5rem]"
          state={isButtonDisabled ? "disabled" : "default"}
        />
        {tip && (
          <p className="text-md sm:text-lg text-center font-regular text-text-primary">
            {tip}
          </p>
        )}
      </form>
    </main>
  );
}
