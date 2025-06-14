"use client";
import Image from "next/image";
import DropDownMenu from "@/components/common/Dropdown/Menu";
import DropDownItem from "@/components/common/Dropdown/Item";
import useClickOutside from "@/hooks/useClickOutside";
import Link from "next/link";

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
          <DropDownItem
            key={team.id}
            className={`text-lg w-full h-11.5 flex items-center justify-between ${
              team.name === currentTeam ? "font-bold bg-bg-hover" : ""
            }`}
          >
            <Link href={`/${team.id}`}>
              <div
                className="flex items-center gap-2"
                onClick={() => onTeamClick(team.name)}
              >
                <Image
                  src={team.img}
                  alt={team.name}
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                />
                {team.name}
              </div>
            </Link>
          </DropDownItem>
        ))}
        <Link href="/create">
          <span className="inline-block py-3.5 mt-2 border-t w-full text-center border border-white rounded-xl text-text-primary cursor-pointer">
            + 팀 추가하기
          </span>
        </Link>
      </DropDownMenu>
    </div>
  );
}
