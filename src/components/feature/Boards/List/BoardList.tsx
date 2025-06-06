import FilterDropdown from "@/components/feature/Boards/List/FilterDropdown";
import LongCard from "../Card/LongCard";
import { Article } from "@/types/Article";

export default function BoardList({ data }: { data: Article[] }) {
  return (
    <>
      <div className="flex flex-col mt-[5rem]">
        <div className="flex items-center justify-between mb-[2rem]">
          <span className="text-xl text-text-primary">게시글</span>
          <FilterDropdown />
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-10">
          {data.map((post) => (
            <li key={post.id}>
              <LongCard
                key={post.id}
                date={post.createdAt}
                title={post.title}
                writer={post.writer.nickname}
                content={post.content}
                likes={post.likeCount}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
