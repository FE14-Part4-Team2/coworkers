"use client";

import Image from "next/image";

import { useUploadImage } from "@/api/image/image-api";
import { useTeamStore } from "@/stores/\buseTeamStore";
import { useToastStore } from "@/stores/toastStore";

export default function ProfileImageUploader() {
  const { teamProfileFile, setTeamProfileFile, setTeamProfileUrl } =
    useTeamStore();
  const { showToast } = useToastStore();
  const uploadImageMutation = useUploadImage();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setTeamProfileFile(file);

    try {
      const url = await uploadImageMutation.mutateAsync(file);
      setTeamProfileUrl(url);
    } catch {
      showToast("이미지 업로드에 실패했습니다.", "error");
    }
  };

  const handleBoxClick = () => {
    document.getElementById("team-profile-input")?.click();
  };

  const preview = teamProfileFile ? URL.createObjectURL(teamProfileFile) : null;

  return (
    <div
      className="w-16 h-16 relative overflow-hidden cursor-pointer"
      onClick={handleBoxClick}
    >
      <div className="w-full h-full relative flex items-center justify-center bg-bg-secondary rounded-full overflow-hidden border-2 border-border-primary/10">
        {preview ? (
          <Image src={preview} alt="팀 프로필" className="object-cover" fill />
        ) : (
          <Image
            src="/icons/icon-img.svg"
            alt="기본 팀 프로필"
            width={24}
            height={24}
          />
        )}
      </div>
      <Image
        src="/icons/icon-edit.svg"
        alt="편집 아이콘"
        width={18}
        height={18}
        className="absolute bottom-0 right-0 rounded-full object-cover border border-bg-primary"
      />
      <input
        id="team-profile-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
