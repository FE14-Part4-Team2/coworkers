import ListBarDropdown from "./ListBarDropdown";
import classNames from "classnames";
import ListBadge from "./ListBadge";
import { useState } from "react";

interface ListBarProps {
  listName: string;
  done: number;
  total: number;
  colorClass: string;
}

export default function ListBar({
  listName,
  done,
  total,
  colorClass,
}: ListBarProps) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="w-full h-10 bg-bg-secondary rounded-xl relative pr-2 flex items-center justify-between cursor-pointer"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="h-full flex justify-center items-center gap-3">
        <div className="w-3 h-full overflow-hidden rounded-l-xl">
          <div className={`w-full h-full ${colorClass}`} />
          <div
            className={classNames(
              `absolute top-0 left-0 rounded-xl h-full ${colorClass} opacity-10 transition-all duration-300 ease-in-out z-0`,
              isHover ? "w-full" : "w-0",
            )}
          />
        </div>
        <div className="font-medium text-md text-text-primary">{listName}</div>
      </div>
      <div className="flex justify-center items-center gap-1">
        <ListBadge done={done} total={total} />
        <ListBarDropdown />
      </div>
    </div>
  );
}
