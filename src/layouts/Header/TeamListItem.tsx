import DropDownItem from "@/components/common/Dropdown/Item";
import useImageFallback from "@/hooks/useImageFallback";
import { useTeamStore } from "@/stores/teamStore";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  team: { id: number; name: string; img: string };
  onTeamClick: (name: string) => void;
}

function TeamListItem({ team, onTeamClick }: Props) {
  const { currentTeam } = useTeamStore();
  const teamImg = useImageFallback(team.img, "/icons/icon-avatar.svg");

  return (
    <Link href={`/${team.id}`}>
      <DropDownItem
        key={team.id}
        className={`text-lg w-full h-[2.8rem] flex items-center justify-between ${
          team.name === currentTeam ? "bg-bg-hover" : ""
        }`}
      >
        <div
          className="flex items-center gap-[0.75rem]"
          onClick={() => onTeamClick(team.name)}
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
    </Link>
  );
}

export default TeamListItem;
