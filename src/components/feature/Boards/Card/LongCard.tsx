"use client";
import Image from "next/image";

const DEFAULT_PROFILE_IMG = "/icons/icon-profile-default.svg";

interface LongCardProps {
  title: string;
  writer: string;
  date: string;
  likes: number;
  profileImg?: string;
  thumbnail?: string;
}

export default function LongCard({
  title,
  writer,
  date,
  likes,
  profileImg = DEFAULT_PROFILE_IMG,
  thumbnail,
}: LongCardProps) {
  return (
    <div className="w-[37rem] h-[11rem] border border-card-border bg-bg-secondary rounded-xl shadow-lg relative flex items-center overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full opacity-25 transform translate-x-10 -translate-y-10"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-teal-100 to-green-100 rounded-full opacity-20 transform -translate-x-6 translate-y-6"></div>

      {thumbnail ? (
        <>
          <div className="px-5 py-4 w-full h-full flex items-center relative z-10">
            <div className="w-[128px] h-[128px] rounded-xl overflow-hidden bg-blue-100 flex-shrink-0 relative shadow-md">
              <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full opacity-40 transform translate-x-2 -translate-y-2"></div>
              <div className="absolute bottom-2 left-2 w-6 h-6 bg-gradient-to-tr from-teal-200 to-green-200 rounded-full opacity-30 transform -translate-x-1 translate-y-1"></div>
              <Image
                src={thumbnail}
                alt="썸네일"
                fill
                className="object-cover relative z-10"
              />
            </div>

            <div className="ml-6 w-full h-full flex flex-col justify-between">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full"></div>
                  <h3 className="text-xl text-text-tertiary font-semibold leading-relaxed line-clamp-2">
                    {title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Image
                        src={profileImg}
                        alt="작성자"
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-white shadow-sm"
                      />
                    </div>
                    <div>
                      <div className="text-sm text-text-Primary font-medium">
                        {writer}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-text-disabled font-medium">
                      {date.slice(0, 10).replace(/-/g, ".")}
                    </span>
                  </div>
                </div>

                <div className="flex gap-1 items-center bg-gray-50 px-3 py-1.5 rounded-full">
                  <Image
                    src="/icons/icon-heart.svg"
                    alt="하트"
                    width={14}
                    height={14}
                  />
                  <span className="text-sm text-text-disabled font-medium">
                    {likes}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="px-5 py-4  w-full h-full flex flex-col justify-between relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full"></div>
                <span className="text-sm text-text-disabled font-medium">
                  {date.slice(0, 10).replace(/-/g, ".")}
                </span>
              </div>
            </div>

            <div className="flex-grow flex items-center justify-center">
              <div className="text-center">
                <div className="w-6 h-6 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 transform rotate-45 rounded-lg shadow-lg mx-auto mb-4 hover:scale-110 transition-transform"></div>
                <h3 className="text-xl text-text-tertiary leading-relaxed font-semibold px-4">
                  {title}
                </h3>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    src={profileImg}
                    alt="작성자"
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-white shadow-sm"
                  />
                </div>
                <div>
                  <div className="text-sm text-text-Primary font-medium">
                    {writer}
                  </div>
                </div>
              </div>

              <div className="flex gap-1 items-center bg-gray-50 px-3 py-1.5 rounded-full">
                <Image
                  src="/icons/icon-heart.svg"
                  alt="하트"
                  width={14}
                  height={14}
                />
                <span className="text-sm text-text-disabled font-medium">
                  {likes}
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      <button className="absolute top-4 right-5 p-2 hover:bg-gray-50/50 rounded-lg transition-colors cursor-pointer">
        <Image src="/icons/icon-heart.svg" alt="하트" width={25} height={25} />
      </button>
    </div>
  );
}
