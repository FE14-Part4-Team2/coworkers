import DropDownItem from "@/components/common/Dropdown/Item";
import useImageFallback from "@/hooks/useImageFallback";
import Image from "next/image";
import React from "react";
import { Team } from "./TeamDropdown";
import { useRouter } from "next/navigation";
interface Props {
  team: Team;
  onTeamClick: (team: Team) => void;
  currentTeam: Team | null;
  onClose?: () => void;
}

function TeamListItem({ team, onTeamClick, currentTeam, onClose }: Props) {
  const teamImg = useImageFallback(team.img, "/icons/icon-avatar.svg");
  const router = useRouter();

  const handleClick = () => {
    onTeamClick(team);
    onClose?.();
    router.push(`/${team.id}`);
  };

  return (
    <DropDownItem
      key={team.id}
      className={`text-lg w-full h-[2.8rem] flex items-center justify-between ${
        team.id === currentTeam?.id ? "bg-bg-tertiary" : ""
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-[0.75rem]">
        <Image
          src={teamImg}
          alt={team.name}
          width={24}
          height={24}
          className="w-[2rem] h-[2rem] rounded-md object-cover"
        />
        {team.name}
      </div>
    </DropDownItem>
  );
}

export default TeamListItem;
