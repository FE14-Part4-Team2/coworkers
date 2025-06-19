"use client";
import Image from "next/image";
import DropDownMenu from "@/components/common/Dropdown/Menu";
import useClickOutside from "@/hooks/useClickOutside";
import Link from "next/link";
import TeamListItem from "./TeamListItem";

interface Team {
  name: string;
  img: string;
  id: number;
}

interface TeamDropdownProps {
  teams: Team[];
  currentTeam: string | null;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onTeamClick: (name: string) => void;
}

export default function TeamDropdown({
  teams,
  currentTeam,
  isOpen,
  onToggle,
  onClose,
  onTeamClick,
}: TeamDropdownProps) {
  const ref = useClickOutside(onClose);

  return (
    <div ref={ref} className="relative cursor-pointer">
      <div className="flex items-center gap-2.5" onClick={onToggle}>
        <span className="whitespace-nowrap text-text-primary text-lg">
          {currentTeam}
        </span>
        <Image
          src="/icons/icon-toggle-check.svg"
          alt="팀 선택"
          width={16}
          height={16}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      <DropDownMenu
        isOpen={isOpen}
        className="absolute w-[13.5rem] text-center top-full mt-2 right-0"
      >
        {teams.map((team) => (
          <TeamListItem key={team.id} team={team} onTeamClick={onTeamClick} />
        ))}
        <Link href="/create" onClick={onClose}>
          <span className="inline-block py-3.5 mt-2 w-full text-center rounded-xl text-brand-secondary cursor-pointer bg-bg-secondary border border-text-primary hover:bg-bg-primary transition-colors">
            팀 생성하기
          </span>
        </Link>

        <Link href="/join" onClick={onClose}>
          <span className="inline-block py-3.5 mt-2 w-full text-center rounded-xl text-brand-tertiary cursor-pointer bg-bg-secondary border border-text-primary hover:bg-bg-primary transition-colors">
            팀 참여하기
          </span>
        </Link>
      </DropDownMenu>
    </div>
  );
}
