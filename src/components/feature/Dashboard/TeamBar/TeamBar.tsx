import Image from "next/image";
import TeamBarDropdown from "./TeamBarDropdown";

export default function TeamBar() {
  return (
    <div className="w-full h-16 bg-bg-bar border border-bg-bar rounded-xl relative px-6 flex items-center justify-between">
      <div className="font-bold text-xl text-text-inverse z-10">경영관리팀</div>
      <TeamBarDropdown />
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
