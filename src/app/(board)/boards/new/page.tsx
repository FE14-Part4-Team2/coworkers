import Button from "@/components/common/Button";
import Input from "@/components/common/Input/Input";
import Textarea from "@/components/feature/Boards/New/TextArea/TextArea";
import Image from "next/image";

export default function BoardsNewPage() {
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center mb-[2.5rem]">
          <span className="text-text-primary text-xl">게시글 쓰기</span>
          <Button
            label="등록"
            variant="primary"
            className="w-[11.5rem] h-[3rem]"
          />
        </div>
        <hr className="w-full border-icon-inverse border-t mb-[2.5rem]" />
        {/* <div className="flex gap-[0.3rem]">
          <span className="text-brand-tertiary text-lg">*</span>
          <span className="text-text-primary text-lg">제목</span>
        </div> */}
        <div className="flex flex-col gap-[2.5rem]">
          <Input id="title" label="제목" placeholder="제목을 입력해주세요." />
          <Textarea
            id="content"
            label="내용"
            placeholder="내용을 입력해주세요."
          />
          <div className="flex flex-col gap-[1rem]">
            <span className="text-lg text-text-primary">이미지</span>
            <div className="w-[15rem] h-[15rem] flex flex-col gap-[0.75rem] items-center justify-center rounded-xl bg-bg-secondary">
              <Image
                src="/icons/icon-plus-gray.svg"
                alt="이미지 추가"
                width={48}
                height={48}
              />
              <span className="text-image-label text-lg">이미지 등록</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
