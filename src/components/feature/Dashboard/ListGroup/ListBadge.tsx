import Image from "next/image";

type Props = {
  done: number;
  total: number;
};

function ListChart({ done, total }: Props) {
  if (done >= total) {
    return (
      <Image
        src="/icons/icon-success.svg"
        alt="Success"
        width={16}
        height={16}
      />
    );
  }

  const radius = 5;
  const stroke = 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (done / total) * circumference;

  return (
    <svg width={16} height={16} className="rotate-[-90deg]">
      <circle
        cx={8}
        cy={8}
        r={radius}
        stroke="#F8FAFC"
        strokeWidth={stroke}
        fill="none"
      />
      <circle
        cx={8}
        cy={8}
        r={radius}
        stroke="#10B981"
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ListBadge({ done, total }: Props) {
  return (
    <div className="flex w-[3.625rem] gap-1 items-center justify-center bg-bg-primary rounded-xl py-1 px-2">
      <ListChart done={done} total={total} />
      <div className="text-brand-primary text-md tabular-nums">
        {done}/{total}
      </div>
    </div>
  );
}
