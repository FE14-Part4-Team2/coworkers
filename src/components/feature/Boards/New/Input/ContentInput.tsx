import { TextareaHTMLAttributes } from "react";
import Textarea from "../TextArea/TextArea";

export default function ContentInput(
  props: TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <>
      <div className="flex gap-[0.3rem] mb-[1rem] mt-[2.5rem]">
        <span className="text-brand-tertiary text-lg">*</span>
        <span className="text-text-primary text-lg">내용</span>
      </div>
      <Textarea id="content" placeholder="내용을 입력해주세요." {...props} />
    </>
  );
}
