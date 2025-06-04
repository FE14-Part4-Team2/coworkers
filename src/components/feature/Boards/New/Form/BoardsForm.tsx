import Button from "@/components/common/Button";
import LabeledField from "./LabeledField";
import Input from "@/components/common/Input/Input";
import Textarea from "../TextArea/TextArea";
import ImageUploader from "../ImageUploader/ImageUploader";

export default function BoardsForm() {
  return (
    <form className="flex flex-col w-full">
      <div className="flex justify-between items-center mb-[2.5rem] mt-[1.5rem] sm:mt-0">
        <h1 className="text-text-primary text-2lg sm:text-xl">게시글 쓰기</h1>
        <div className="hidden sm:block">
          <Button
            label="등록"
            variant="primary"
            className="w-[11.5rem] h-[3rem]"
          />
        </div>
      </div>
      <hr className="w-full border-t border-border-primary opacity-10" />
      <LabeledField id="title" label="제목" required>
        <Input id="title" placeholder="제목을 입력해주세요." />
      </LabeledField>
      <LabeledField id="content" label="내용" required>
        <Textarea id="content" placeholder="내용을 입력해주세요." />
      </LabeledField>
      <section aria-label="이미지 등록">
        <ImageUploader />
      </section>
      <div className="block sm:hidden">
        <Button
          label="등록"
          variant="primary"
          className="w-full h-[3rem] mt-[2.5rem] block sm:hidden"
        />
      </div>
    </form>
  );
}
