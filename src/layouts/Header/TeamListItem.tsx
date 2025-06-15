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
            src={teamImg}
            alt={team.name}
            width={24}
            height={24}
            className="rounded-full object-cover"
          />
          {team.name}
        </div>
      </Link>
    </DropDownItem>
  );
}

export default TeamListItem;
