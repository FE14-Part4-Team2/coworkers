import Image from "next/image";

export interface ArticleDetailProps {
  data: {
    updatedAt: string;
    createdAt: string;
    likeCount: number;
    writer: { nickname: string; id: number };
    image: string;
    title: string;
    id: number;
    commentCount: number;
    isLiked: boolean;
    content: string;
  };
}
export default function ArticleDetail({ data }: ArticleDetailProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2lg text-text-secondary font-medium">
          {data?.title}
        </h1>
        <Image
          src="/icons/icon-kebabs.svg"
          alt="더보기"
          width={3}
          height={12}
        />
      </div>
      <hr className="w-full border-t border-border-primary opacity-10" />
      <div className="flex justify-between items-center mt-5">
        <div className="flex items-center gap-20">
          <span className="text-text-primary text-md">
            {data?.writer?.nickname}
          </span>
          <span className="text-interaction-inactive text-md">
            {data?.updatedAt.slice(0, 10).replace(/-/g, ".")}
          </span>
        </div>
        <span className="flex items-center gap-4 text-text-disabled text-md">
          <span className="flex items-center gap-1">
            <Image
              src="/icons/icon-comment.svg"
              alt="댓글"
              width={16}
              height={16}
            />
            {data?.commentCount}
          </span>
          <span className="flex items-center gap-1">
            <Image
              src="/icons/icon-heart.svg"
              alt="하트"
              width={16}
              height={16}
            />
            {data?.likeCount}
          </span>
        </span>
      </div>

      <section className="text-text-secondary text-lg py-[3.8rem] whitespace-pre-line">
        {data?.content}
      </section>
    </>
  );
}
