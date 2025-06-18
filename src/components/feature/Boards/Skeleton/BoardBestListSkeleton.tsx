import ShortCardSkeleton from "./ShortCardSkeleton";

export default function BoardBestListSkeleton() {
  return (
    <>
      <div className="flex items-center mt-[2.5rem] justify-between mb-[3.5rem]">
        <div className="flex items-center gap-2">
          <span className="bg-brand-primary text-white text-lg font-bold px-2 py-1 rounded-full">
            Top 3
          </span>
          <span className="text-lg sm:text-xl text-text-primary">
            인기 게시글
          </span>
        </div>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-[1.5rem] w-full overflow-hidden">
        {Array.from({ length: 3 }, (_, index) => (
          <li key={index}>
            <ShortCardSkeleton />
          </li>
        ))}
      </ul>
    </>
  );
}
