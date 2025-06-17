import LongCardSkeleton from "./LongCardSkeleton";
import Skeleton from "@/components/common/Skeleton/Skeleton";

export default function BoardListSkeleton() {
  return (
    <div className="flex flex-col mt-[5rem]">
      <div className="flex items-center justify-between mb-[2rem]">
        <span className="sm:text-xl text-lg text-text-primary">게시글</span>
        <Skeleton className="w-[6rem] sm:w-[7.5rem] h-12 rounded-xl" />
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-10">
        {Array.from({ length: 6 }, (_, index) => (
          <li key={index}>
            <LongCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}
