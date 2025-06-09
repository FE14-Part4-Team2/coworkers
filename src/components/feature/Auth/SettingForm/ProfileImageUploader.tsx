"use client";

import Image from "next/image";
import React, { useRef } from "react";

function ProfileImageUploader() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 이미지 업로드 뮤테이션 연결
  };

  return (
    <div className="relative w-16 h-16 cursor-pointer" onClick={handleClick}>
      <Image
        className="rounded-full object-cover w-full h-full"
        src="/icons/icon-profile-default.svg"
        alt="프로필"
        width={64}
        height={64}
      />
      <Image
        className="absolute bottom-0 right-0 rounded-full object-cover border-bg-primary border-2"
        src="/icons/icon-edit.svg"
        alt="편집 아이콘"
        width={19}
        height={19}
      />
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}

export default ProfileImageUploader;
