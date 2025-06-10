import FilterDropdown from "@/components/feature/Boards/List/FilterDropdown";
import LongCard from "../Card/LongCard";
import { ArticleType } from "@/api/article/article.schema";
import WriteButton from "./WriteButton";
import { useRouter } from "next/navigation";
import { OrderType } from "@/constants/orderType";

export default function BoardList({
  data,
  orderBy,
  setOrderBy,
}: {
  data: ArticleType[];
  orderBy: OrderType;
  setOrderBy: (order: OrderType) => void;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col mt-[5rem]">
      <div className="flex items-center justify-between mb-[2rem]">
        <span className="sm:text-xl text-lg text-text-primary">게시글</span>
        <FilterDropdown orderBy={orderBy} setOrderBy={setOrderBy} />
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-10">
        {data.map((post) => (
          <li key={post.id}>
            <LongCard article={post} />
          </li>
        ))}
      </ul>

      <WriteButton onClick={() => router.push("/boards/new")} />
    </div>
  );
}
