"use client";
import Image from "next/image";
import DropDownMenu from "@/components/common/Dropdown/Menu";
import DropDownItem from "@/components/common/Dropdown/Item";
import useClickOutside from "@/hooks/useClickOutside";

interface Team {
  name: string;
  img: string;
}

interface TeamDropdownProps {
  teams: Team[];
  currentTeam: string | null;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function TeamDropdown({
  teams,
  currentTeam,
  isOpen,
  onToggle,
  onClose,
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
            key={team.name}
            className={`text-lg w-full h-11.5 flex items-center justify-between ${
              team.name === currentTeam ? "font-bold bg-bg-hover" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <Image src={team.img} alt={team.name} width={24} height={24} />
              {team.name}
            </div>
            <Image
              src="icons/icon-kebabs.svg"
              width={3}
              height={12}
              alt="더보기"
            />
          </DropDownItem>
        ))}
        <button className="mt-2 border-t w-full h-[3rem] text-center border border-white rounded-xl text-text-primary cursor-pointer">
          + 팀 추가하기
        </button>
      </DropDownMenu>
    </div>
  );
}
