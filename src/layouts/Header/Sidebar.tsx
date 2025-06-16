import Link from "next/link";
import Image from "next/image";

interface Team {
  teamId: number;
  name: string;
}
interface SidebarProps {
  groups: Team[] | null;
  currentTeam: string | null;
  onClose: () => void;
}

export default function Sidebar({ groups, onClose }: SidebarProps) {
  return (
    <aside className="fixed top-0 left-0 z-50 w-64 h-full bg-bg-secondary shadow-md p-6">
      <div className="flex justify-end mb-9">
        <button onClick={onClose}>
          <Image
            src="/icons/icon-close.svg"
            width={24}
            height={24}
            alt="닫기"
          />
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {groups?.map((team) => (
          <Link href={`/${team.teamId}`} key={team.teamId}>
            <span className="block">{team.name}</span>
          </Link>
        ))}

        <Link href="/boards" className={"text-lg text-interaction-focus"}>
          모집게시판
        </Link>
      </div>
    </aside>
  );
}
