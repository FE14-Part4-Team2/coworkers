"use client";
import Image from "next/image";

interface ShortCardProps {
  date: string;
  title: string;
  writer: string;
  profileImg?: string;
  likes: number;
  thumbnail?: string;
}

export default function ShortCard({
  date,
  title,
  writer,
  profileImg = "/icons/icon-profile-default.svg",
  likes,
  thumbnail,
}: ShortCardProps) {
  return (
    <div className="w-[24rem] h-[20rem] rounded-xl border border-card-border bg-bg-secondary shadow-lg overflow-hidden">
      {thumbnail ? (
        <>
          <div className="w-full h-[10rem] bg-blue-100 flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-2 right-2 w-12 h-12 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full opacity-40 transform translate-x-4 -translate-y-4"></div>
            <div className="absolute bottom-2 left-2 w-8 h-8 bg-gradient-to-tr from-teal-200 to-green-200 rounded-full opacity-30 transform -translate-x-2 translate-y-2"></div>

            <Image
              src={thumbnail}
              fill
              alt="게시글 썸네일"
              className="object-cover relative z-10"
            />
          </div>

          <div className="px-5 py-4 relative">
            <div className="absolute top-0 right-4 w-16 h-16 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full opacity-20 transform translate-x-6 -translate-y-6"></div>

            <div className="flex items-center justify-between mb-3 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full"></div>
                <span className="text-sm text-text-disabled font-medium">
                  {date.slice(0, 10).replace(/-/g, ".")}
                </span>
              </div>
              <div className="p-2 hover:bg-gray-50/50 rounded-lg transition-colors cursor-pointer">
                <Image
                  src="/icons/icon-heart.svg"
                  alt="더보기"
                  width={25}
                  height={25}
                />
              </div>
            </div>

            <div className="text-xl text-text-tertiary font-semibold leading-relaxed relative z-10">
              {title}
            </div>

            <div className="border-gray-100 pt-3 relative z-10">
              <div className="flex gap-3 items-center">
                <div className="relative">
                  <Image
                    src={profileImg}
                    alt="작성자"
                    width={28}
                    height={28}
                    className="rounded-full border-2 border-white shadow-sm"
                  />
                </div>
                <div className="flex-grow">
                  <div className="text-sm text-text-Primary font-medium">
                    {writer}
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
        <div className="px-5 py-4 h-full flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full opacity-30 transform translate-x-8 -translate-y-8"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-teal-100 to-green-100 rounded-full opacity-20 transform -translate-x-6 translate-y-6"></div>

          <div className="flex items-center justify-between mb-5 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full"></div>
              <span className="text-sm text-text-disabled font-medium">
                {date.slice(0, 10).replace(/-/g, ".")}
              </span>
            </div>
            <div className="p-2 hover:bg-gray-50/50 rounded-lg cursor-pointer">
              <Image
                src="/icons/icon-heart.svg"
                alt="더보기"
                width={25}
                height={25}
              />
            </div>
          </div>

          <div className="flex-grow flex flex-col justify-center relative z-10">
            <div className="text-center mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 transform rotate-45 rounded-lg shadow-lg mx-auto mb-4 hover:scale-110 transition-transform"></div>
              <h3 className="text-xl text-text-tertiary leading-relaxed font-semibold px-2">
                {title}
              </h3>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 relative z-10">
            <div className="flex gap-3 items-center">
              <div className="relative">
                <Image
                  src={profileImg}
                  alt="작성자"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white shadow-sm"
                />
              </div>
              <div className="flex-grow">
                <div className="text-sm text-text-Primary font-medium">
                  {writer}
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
      )}
    </div>
  );
}
