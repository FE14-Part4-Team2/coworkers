import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";

interface TeamFormLayoutProps {
  title: string;
  buttonLabel: string;
  tip?: string;
  children: React.ReactNode;
  onSubmit: () => void;
}

export default function TeamFormLayout({
  title,
  buttonLabel,
  tip,
  children,
  onSubmit,
}: TeamFormLayoutProps) {
  return (
    <main className="mt-[4.5rem] sm:mt-0 w-full items-center justify-center">
      <h1 className="pb-[1.5rem] text-2xl sm:pb-[5rem] md:text-4xl text-center font-medium text-text-primary">
        {title}
      </h1>
      <form onSubmit={onSubmit} className="w-full">
        {children}
        <Input placeholder="팀 이름을 입력해주세요." value={""} />
        <Button
          label={buttonLabel}
          variant="primary"
          className="w-full mt-[2.5rem] mb-[1.5rem]"
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
