"use client";

import Image from "next/image";

export default function ProfileUploader() {
  return (
    <div>
      <Image
        src={"/icons/icon-image-uploader.svg"}
        alt="ProfileImg"
        width={64}
        height={64}
        className="cursor-pointer"
      />
    </div>
  );
}
