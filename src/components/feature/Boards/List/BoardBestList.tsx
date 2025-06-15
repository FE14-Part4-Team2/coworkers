import ShortCard from "../Card/ShortCard";
import { ArticleType } from "@/api/article/article.schema";
import { useBestArticles } from "@/api/article/article.query";

export default function BoardBestList() {
  const { data: bestList } = useBestArticles();
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
        {bestList.map((post: ArticleType) => (
          <li key={post.id}>
            <ShortCard article={post} />
          </li>
        ))}
      </ul>
    </>
  );
}
