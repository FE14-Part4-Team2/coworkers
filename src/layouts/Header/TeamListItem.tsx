import DropDownItem from "@/components/common/Dropdown/Item";
import useImageFallback from "@/hooks/useImageFallback";
import { useTeamStore } from "@/stores/teamStore";
import Image from "next/image";
import React from "react";
import { Team } from "./TeamDropdown";
import { useRouter } from "next/navigation";

interface Props {
  team: { id: number; name: string; img: string };
  onTeamClick: (team: Team) => void;
}

function TeamListItem({ team, onTeamClick }: Props) {
  const { currentTeam } = useTeamStore();
  const teamImg = useImageFallback(team.img, "/icons/icon-avatar.svg");
  const router = useRouter();

  const handleClick = () => {
    onTeamClick(team);
    router.push(`/${team.id}`);
  };

  return (
    <DropDownItem
      key={team.id}
      className={`text-lg w-full h-[2.8rem] flex items-center justify-between ${
        team.name === currentTeam?.name ? "bg-bg-hover" : ""
      }`}
      onClick={handleClick}
    >
      <div
        className="flex items-center gap-[0.75rem]"
        onClick={() => onTeamClick(team)}
      >
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
