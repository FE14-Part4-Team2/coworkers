import ShortCard from "../Card/ShortCard";
import Image from "next/image";
import { ArticleType } from "@/api/article/article.schema";

export default function BoardBestList({ data }: { data: ArticleType[] }) {
  return (
    <>
      <div className="flex items-center mt-[2.5rem] justify-between mb-[3.5rem]">
        <span className="sm:text-xl text-text-primary text-lg ">
          베스트 게시글
        </span>
        <div className="flex gap-[0.1rem]">
          <button className="text-text-disabled">더보기</button>
          <Image
            src="/icons/icon-arrow_right.svg"
            alt="오른쪽 화살표"
            width={16}
            height={16}
          />
        </div>
      </div>
      <ul className="flex gap-[1.5rem]">
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
