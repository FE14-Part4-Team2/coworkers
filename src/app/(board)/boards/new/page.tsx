import Button from "@/components/common/Button";
import ImageUploader from "@/components/feature/Boards/New/ImageUploader/ImageUploader";
import ContentInput from "@/components/feature/Boards/New/Input/ContentInput";
import TitleInput from "@/components/feature/Boards/New/Input/TitleInput";

export default function BoardsNewPage() {
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center mb-[2.5rem] mt-[1.5rem] sm:mt-0">
          <span className="text-text-primary text-2lg sm:text-xl">
            게시글 쓰기
          </span>
          <div className="hidden sm:block">
            <Button
              label="등록"
              variant="primary"
              className="w-[11.5rem] h-[3rem]"
            />
          </div>
        </div>
        <hr className="w-full border-t border-border-primary opacity-10" />
        <TitleInput />
        <ContentInput />
        <ImageUploader />
        <div className="block sm:hidden">
          <Button
            label="등록"
            variant="primary"
            className="w-full h-[3rem] mt-[2.5rem] block sm:hidden"
          />
        </div>
      </div>
    </>
  );
}
