"use client";

import { useUploadImage } from "@/api/image/image-api";
import { useUpdateMyInfoMutation } from "@/api/user/user.query";
import { useAuthStore } from "@/stores/authStore";
import { useToastStore } from "@/stores/toastStore";
import { processImageFile } from "@/utils/imageUploadHelpers";
import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";

function ProfileImageUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { user, setAuth } = useAuthStore();
  const initialImgSrc = user?.image || "/icons/icon-profile-default.svg";
  const [imgSrc, setImgSrc] = useState(initialImgSrc);
  const imageUpload = useUploadImage();
  const updateMyInfoMutation = useUpdateMyInfoMutation();
  const { showToast } = useToastStore();

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const updateImagePreview = useCallback((newPreview: string | null) => {
    if (newPreview) {
      setImgSrc(newPreview);
    }
  }, []);

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      processImageFile(file, imgSrc, (newPreviewUrl, processedFile) => {
        void processedFile;
        if (newPreviewUrl) {
          updateImagePreview(newPreviewUrl);
        }
      });

      imageUpload.mutate(file, {
        onSuccess: (uploadedUrl) => {
          setImgSrc(uploadedUrl);
          updateMyInfoMutation.mutate(
            { image: uploadedUrl },
            {
              onSuccess: () => {
                showToast("프로필 이미지를 변경하였습니다.", "success");
              },
              onError: (error) => {
                console.log(error);
                showToast("정보 수정을 실패했습니다.", "error");

                setImgSrc(initialImgSrc);
                if (user) {
                  setAuth({ ...user, image: user.image });
                }
              },
            },
          );
        },
        onError: (error) => {
          console.log(error);
          setImgSrc(initialImgSrc);
          showToast("이미지 변경을 실패했습니다.", "error");
          if (user) {
            setAuth({ ...user, image: user.image });
          }
        },
      });
    },
    [
      user,
      imageUpload,
      imgSrc,
      updateImagePreview,
      showToast,
      updateMyInfoMutation,
      setAuth,
      initialImgSrc,
    ],
  );

  return (
    <div className="relative w-16 h-16 cursor-pointer" onClick={handleClick}>
      <Image
        className="rounded-full object-cover w-full h-full"
        src={imgSrc}
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
