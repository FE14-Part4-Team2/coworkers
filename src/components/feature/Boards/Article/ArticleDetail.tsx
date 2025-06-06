import Image from "next/image";

interface ArticleDetailProps {
  data: {
    title: string;
    writer: string;
    date: string;
    comment: number;
    likes: number;
    content: string;
  };
}

export default function ArticleDetail({ data }: ArticleDetailProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2lg text-text-secondary">{data.title}</h1>
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
          <span className="text-text-primary text-md">{data.writer}</span>
          <span className="text-interaction-inactive text-md">{data.date}</span>
        </div>
        <span className="flex items-center gap-4 text-text-disabled text-md">
          <span className="flex items-center gap-1">
            <Image
              src="/icons/icon-comment.svg"
              alt="댓글"
              width={16}
              height={16}
            />
            {data.comment}
          </span>
          <span className="flex items-center gap-1">
            <Image
              src="/icons/icon-heart.svg"
              alt="하트"
              width={16}
              height={16}
            />
            {data.likes}
          </span>
        </span>
      </div>

      <section className="text-text-secondary text-lg py-[3.8rem] whitespace-pre-line">
        {data.content}
      </section>
    </>
  );
}
