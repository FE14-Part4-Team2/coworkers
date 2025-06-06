import Image from "next/image";
import Textarea from "@/components/common/TextArea/TextArea";
import Button from "@/components/common/Button";

interface ArticleComment {
  id: number;
  writer: {
    image: string;
    nickname: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  content: string;
}

interface ArticleCommentProps {
  comments: ArticleComment[];
  articleId: number;
}

export default function ArticleComment({ comments }: ArticleCommentProps) {
  return (
    <>
      <section aria-label="댓글 목록" className="flex flex-col">
        <h2 className="text-lg sm:text-xl text-text-primary font-medium mb-4 sm:mb-6">
          댓글달기
        </h2>
        <Textarea
          id="comment"
          placeholder="댓글을 입력해주세요."
          height="h-[6.5rem]"
          className="text-md sm:text-lg"
        />
        <div className="flex justify-end mb-8 sm:mb-10">
          <Button
            label="등록"
            variant="primary"
            type="submit"
            className="w-[4.5rem] h-[2rem] sm:w-[11.5rem] sm:h-[3rem] mt-4"
          />
        </div>

        <hr className="w-full border-t border-border-primary opacity-10 mb-8 sm:mb-10" />

        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <div key={comment.id}>
              <div className="flex flex-col justify-between py-5 px-6 items-start border rounded-lg bg-bg-secondary border-border-primary/10 h-[7rem] sm:h-[7.5rem]">
                <div className="flex justify-between w-full items-center">
                  <span className="text-md sm:text-lg text-text-primary">
                    {comment.content}
                  </span>
                  <Image
                    src="/icons/icon-kebabs.svg"
                    alt="더보기"
                    width={3}
                    height={12}
                  />
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="flex items-center text-sm sm:text-md text-text-primary gap-1.5 sm:gap-3">
                    <Image
                      src={
                        comment.writer.image ||
                        "/icons/icon-profile-default.svg"
                      }
                      alt="프로필 이미지"
                      width={32}
                      height={32}
                    />
                    {comment.writer.nickname}
                  </span>
                  <span className="flex items-center text-sm sm:text-md text-text-disabled gap-2 sm:gap-4">
                    <Image
                      src="/icons/icon-vector.svg"
                      alt="벡터"
                      width={2}
                      height={12}
                    />
                    {comment.createdAt.slice(0, 10).replace(/-/g, ".")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
