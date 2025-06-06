import Textarea from "@/components/common/TextArea/TextArea";
import Button from "@/components/common/Button";

export default function CommentForm() {
  return (
    <>
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
          className="px-0 py-0 w-[4.5rem] h-[2rem] sm:w-[11.5rem] sm:h-[3rem] mt-4"
        />
      </div>

      <hr className="w-full border-t border-border-primary opacity-10 mb-8 sm:mb-10" />
    </>
  );
}
