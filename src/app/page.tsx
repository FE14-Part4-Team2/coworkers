"use client";

import FeatureSection from "@/components/feature/Landing/FeatureSection";
import InteractiveGridBg from "@/components/feature/Landing/InteractiveGridBg";
import { useAuthStore } from "@/stores/authStore";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: -1, y: -1 });
  const { isAuthenticated } = useAuthStore();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: -1, y: -1 });
  }, []);

  return (
    <main className="mt-[3.75rem]">
      <div className="relative w-full min-h-screen pt-14">
        <InteractiveGridBg
          currentMousePos={mousePos}
          className="hidden md:block"
        />
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-landing-top-mobile sm:bg-landing-top-tablet md:hidden"></div>
        <div
          className="absolute inset-0 z-20"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        ></div>
        <div className="relative z-10 h-screen text-center">
          <h1 className="text-2xl sm:text-4xl md:text-[3rem] font-semibold flex justify-center items-center gap-2 flex-wrap">
            함께 만들어가는 투두 리스트
            <span className="relative w-7 h-7 md:w-12 md:h-12 lg:w-14 lg:h-14 inline-block">
              <Image
                src="/icons/icon-repair-lg.svg"
                alt="망치 아이콘"
                fill
                className="object-contain"
              />
            </span>
            <div className="w-full"></div>
            <span className="mt-1 text-3xl sm:text-[3rem] md:text-[4rem] text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#CEF57E] leading-[3.75rem]">
              Coworkers
            </span>
          </h1>
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 w-full aspect-[1920/679]">
            <Image
              src="/images/landing/landing-top-lg.png"
              alt="일러스트"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <Link
          href={isAuthenticated ? "/boards" : "/login"}
          className="absolute z-30 bottom-[9rem] sm:bottom-[12rem] left-4 right-4 max-w-[373px] bg-brand-gradient rounded py-3 mx-auto text-center rounded-[2rem]"
        >
          지금 시작하기
        </Link>
      </div>
      <div>
        <FeatureSection />
      </div>

      <div className="mt-[20rem] text-center">
        <p className="text-2xl font-semibold sm:text-4xl">
          지금 바로 시작해보세요
        </p>
        <p className="mt-3 text-sm font-medium sm:text-2xl sm:mt-4">
          팀원 모두와 같은 방향, <br className="sm:hidden" />
          같은 속도로 나아가는 가장 쉬운 방법
        </p>
      </div>
      <div className="w-full h-[60vh] bg-cover bg-center bg-no-repeat bg-landing-bottom-mobile sm:bg-landing-bottom-tablet md:bg-landing-bottom-pc"></div>
    </main>
  );
}
