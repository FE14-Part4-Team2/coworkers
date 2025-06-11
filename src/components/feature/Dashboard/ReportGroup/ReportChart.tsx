import { useEffect, useState } from "react";

type Props = {
  done: number;
  total: number;
};

function ReportCircle({ done, total }: Props) {
  const [size, setSize] = useState<number | null>(null);

  const determineSize = () => {
    const isSmallScreen = window.innerWidth < 640;
    return isSmallScreen ? 135 : 170;
  };

  useEffect(() => {
    const handleResize = () => {
      setSize(determineSize());
    };

    setSize(determineSize());

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (size === null) return null;

  const stroke = size === 135 ? 24 : 30;
  const radius = (size - stroke) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = total === 0 ? 0 : (done / total) * circumference;

  return (
    <svg width={size} height={size} className="rotate-[-90deg] w-full h-full">
      <defs>
        <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#A3E635" />
        </linearGradient>
      </defs>
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="#334155"
        strokeWidth={stroke}
        fill="none"
      />
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="url(#circleGradient)"
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ReportChart({ done, total }: Props) {
  const percentage = total === 0 ? 0 : (done / total) * 100;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-12">
      <div className="relative sm:w-[170px] sm:h-[170px] w-[135px] h-[135px]">
        <ReportCircle done={done} total={total} />
        <div className="absolute inset-0 flex flex-col items-center justify-center sm:hidden">
          <div className="text-text-primary text-sm">오늘</div>
          <div className="bg-brand-gradient bg-clip-text text-transparent font-bold text-2xl">
            {percentage.toFixed(0)}%
          </div>
        </div>
      </div>
      <div className="hidden sm:flex flex-col text-start gap-1">
        <div className="text-text-primary font-medium text-md">
          오늘의
          <br />
          진행 상황
        </div>
        <div className="bg-brand-gradient bg-clip-text text-transparent font-bold text-[2.5rem]">
          {percentage.toFixed(0)}%
        </div>
      </div>
    </div>
  );
}
