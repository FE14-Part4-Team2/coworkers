import Image from "next/image";
import Textarea from "@/components/common/TextArea/TextArea";
import Button from "@/components/common/Button";

export default function CommentSection({ articleId }: { articleId: number }) {
  const commentList = [
    {
      id: 1,
      writer: "이나경",
      date: "2025.06.17",
      content: "댓글 영역입니다.",
    },
  ];

  return (
    <>
      <section aria-label="댓글 목록" className="flex flex-col gap-[1.5rem]">
        <h2 className="text-xl text-text-primary">댓글달기</h2>
        <Textarea
          id="comment"
          placeholder="댓글을 입력해주세요."
          height="h-[6.5rem]"
        />
        <div className="flex justify-end mb-[2.5rem]">
          <Button
            label="등록"
            variant="primary"
            className="w-[11.5rem] h-[3rem]"
            type="submit"
          />
        </div>

        <hr className="w-full border-t border-border-primary opacity-10 mb-[2.5rem]" />

        <div className="flex flex-col justify-between py-5 px-6 items-start border rounded-lg bg-bg-secondary border-border-primary/10 h-[7.5rem]">
          <div className="flex justify-between w-full items-center">
            <span className="text-lg text-text-primary">댓글 영역입니다.</span>
            <Image
              src="/icons/icon-kebabs.svg"
              alt="더보기"
              width={3}
              height={12}
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center text-md text-text-primary gap-3">
              <Image
                src="/icons/icon-profile-default.svg"
                alt="프로필 이미지"
                width={32}
                height={32}
              />
              {commentList[0].writer}
            </span>
            <span className="flex items-center text-md text-text-disabled gap-4">
              <Image
                src="/icons/icon-vector.svg"
                alt="벡터"
                width={2}
                height={12}
              />
              {commentList[0].date}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
