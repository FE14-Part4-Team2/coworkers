"use client";

import { useUploadImage } from "@/api/image/image-api";
import { useUpdateMyInfoMutation } from "@/api/user/user.query";
import Button from "@/components/common/Button";
import { useAuthStore } from "@/stores/authStore";
import { useToastStore } from "@/stores/toastStore";
import { processImageFile } from "@/utils/imageUploadHelpers";
import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";

function ProfileImageUploader() {
  const DEFAULT_IMAGE = "/icons/icon-profile-default.svg";
  const DEFAULT_IMAGE_URL =
    "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/2186/icon-profile-default.svg";

  const inputRef = useRef<HTMLInputElement>(null);
  const { user, setAuth } = useAuthStore();
  const { showToast } = useToastStore();
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const imgSrc =
    previewSrc ??
    (user?.image === DEFAULT_IMAGE_URL
      ? DEFAULT_IMAGE
      : user?.image || DEFAULT_IMAGE);
  const imageUpload = useUploadImage();
  const updateMyInfoMutation = useUpdateMyInfoMutation();

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      processImageFile(file, imgSrc, (previewUrl) => {
        if (previewUrl) {
          setPreviewSrc(previewUrl);
        }
      });

      imageUpload.mutate(file, {
        onSuccess: (uploadedUrl) => {
          updateMyInfoMutation.mutate(
            { image: uploadedUrl },
            {
              onSuccess: () => {
                showToast("프로필 이미지를 변경하였습니다.", "success");
                if (user) {
                  setAuth({ ...user, image: uploadedUrl });
                }
                setPreviewSrc(null); // 성공하면 preview 초기화
              },
              onError: () => {
                showToast("정보 수정을 실패했습니다.", "error");
                setPreviewSrc(null); // 실패 시 되돌림
              },
            },
          );
        },
        onError: () => {
          showToast("이미지 업로드를 실패했습니다.", "error");
          setPreviewSrc(null);
        },
      });
    },
    [imageUpload, updateMyInfoMutation, user, setAuth, showToast, imgSrc],
  );

  const resetToDefaultImage = useCallback(() => {
    updateMyInfoMutation.mutate(
      { image: DEFAULT_IMAGE_URL },
      {
        onSuccess: () => {
          showToast("기본 이미지로 변경하였습니다.", "success");
          if (user) {
            setAuth({ ...user, image: DEFAULT_IMAGE_URL });
          }
          setPreviewSrc(null);
        },
        onError: () => {
          showToast("기본 이미지 변경에 실패했습니다.", "error");
        },
      },
    );
  }, [user, updateMyInfoMutation, setAuth, showToast]);
  return (
    <div className="flex items-end gap-2">
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
      {imgSrc !== DEFAULT_IMAGE && (
        <Button
          label="이미지 제거"
          variant="ghost"
          size="sm"
          className="mt-2 w-[5rem]"
          onClick={resetToDefaultImage}
        />
      )}
    </div>
  );
}

export default ProfileImageUploader;
