import FilterDropdown from "@/components/feature/Boards/List/FilterDropdown";
import LongCard from "../Card/LongCard";
import { ArticleType } from "@/api/article/article.schema";
import WriteButton from "./WriteButton";
import { useRouter } from "next/navigation";
import { OrderType, ORDER_TYPE } from "@/constants/orderType";
import { useState } from "react";
import Pagination from "@/components/feature/Boards/Pagination/Pagination";
import { useArticleList } from "@/api/article/article.query";
import EmptyCard from "../Card/EmptyCard";
import useDebounce from "@/hooks/useDebounce";
import IfElse from "./IfElse";

interface BoardListProps {
  keyword: string;
}

export default function BoardList({ keyword }: BoardListProps) {
  const [orderBy, setOrderBy] = useState<OrderType>(ORDER_TYPE.RECENT);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const debouncedKeyword = useDebounce(keyword, 300);

  const { data: articleList = [], totalCount = 0 } = useArticleList({
    page,
    pageSize,
    orderBy,
    keyword: debouncedKeyword,
  });

  const router = useRouter();

  return (
    <div className="flex flex-col mt-[5rem]">
      <div className="flex items-center justify-between mb-[2rem]">
        <span className="sm:text-xl text-lg text-text-primary">게시글</span>
        <FilterDropdown
          orderBy={orderBy}
          setOrderBy={(newOrderBy) => {
            setOrderBy(newOrderBy);
            setPage(1);
          }}
        />
      </div>

      <IfElse
        condition={debouncedKeyword.trim() !== "" && articleList.length === 0}
        then={<EmptyCard keyword={debouncedKeyword} />}
        else={
          <>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-10">
              {articleList.map((post: ArticleType) => (
                <li key={post.id}>
                  <LongCard article={post} />
                </li>
              ))}
            </ul>

            <Pagination
              page={page}
              setPage={setPage}
              total={totalCount}
              pageSize={pageSize}
            />
          </>
        }
      />
      <WriteButton onClick={() => router.push("/boards/new")} />
    </div>
  );
}
