import FilterDropdown from "@/components/feature/Boards/List/FilterDropdown";
import LongCard from "../Card/LongCard";
import { ArticleType } from "@/api/article/article.schema";

export default function BoardList({ data }: { data: ArticleType[] }) {
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
                likes={post.likeCount}
                thumbnail={post.image ?? undefined}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
