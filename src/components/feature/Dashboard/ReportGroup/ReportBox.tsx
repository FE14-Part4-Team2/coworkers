import Image from "next/image";

type Props = {
  content: string;
  count: number;
  image: string;
};

export default function ReportBox({ content, count, image }: Props) {
  return (
    <div className="flex md:max-w-[25rem] w-full bg-bg-tertiary h-20 items-center justify-between rounded-xl p-4">
      <div className="flex flex-col gap-1">
        <div className="text-text-secondary font-medium text-sm">{content}</div>
        <div className="text-brand-tertiary font-bold text-2xl">{count}개</div>
      </div>
      <Image src={image} alt="리포트 아이콘" width={40} height={40} />
    </div>
  );
}
