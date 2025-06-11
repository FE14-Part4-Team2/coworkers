import Image from "next/image";
import TeamBarDropdown from "./TeamBarDropdown";

interface TeamBarProps {
  teamName: string;
  showDropdown: boolean;
}

export default function TeamBar({
  teamName,
  showDropdown = true,
}: TeamBarProps) {
  return (
    <div className="w-full h-16 bg-bg-bar border border-bg-bar rounded-xl relative px-6 flex items-center justify-between">
      <div className="font-bold text-xl text-text-inverse z-10">{teamName}</div>
      {showDropdown && <TeamBarDropdown />}
      <Image
        src="/images/teambar-pattern.png"
        alt="teambar-thumbnail"
        width={181}
        height={64}
        className="absolute right-20 top-0 h-full w-auto z-0"
      />
    </div>
  );
}
