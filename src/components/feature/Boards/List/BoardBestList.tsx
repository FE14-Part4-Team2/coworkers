import ShortCard from "../Card/ShortCard";
import { ArticleType } from "@/api/article/article.schema";

export default function BoardBestList({ data }: { data: ArticleType[] }) {
  return (
    <>
      <div className="flex items-center mt-[2.5rem] justify-between mb-[3.5rem]">
        <span className="sm:text-xl text-text-primary text-lg ">
          베스트 게시글
        </span>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[1.5rem] w-full overflow-hidden">
        {data.map((post) => (
          <li key={post.id}>
            <ShortCard
              date={post.createdAt}
              title={post.title}
              writer={post.writer.nickname}
              likes={post.likeCount}
              thumbnail={post.image ?? undefined}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
