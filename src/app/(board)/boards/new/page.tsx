import Button from "@/components/common/Button";
import ImageUploader from "@/components/feature/Boards/New/ImageUploader/ImageUploader";
import ContentInput from "@/components/feature/Boards/New/Input/ContentInput";
import TitleInput from "@/components/feature/Boards/New/Input/TitleInput";

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
        <hr className="w-full border border-card-border stroke-1" />
        <TitleInput />
        <ContentInput />
        <ImageUploader />
      </div>
    </>
  );
}
