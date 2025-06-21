"use client";

import Image from "next/image";
import Link from "next/link";

import Button from "@/components/common/Button";

import { useRouter } from "next/navigation";
import { useTeamStore } from "@/stores/teamStore";
import { useEffect } from "react";

export default function TeamSelectPage() {
  const router = useRouter();
  const { currentTeam } = useTeamStore();
  const hasTeam = !!currentTeam;
  const handleNavigate = (path: string) => {
    router.push(path);
  };

  useEffect(() => {
    if (hasTeam) {
      router.replace("/");
    }
  }, [hasTeam, router]);

  if (hasTeam) return null;

  return (
    <main className="w-full flex justify-center">
      <div className="md:w-[75rem] w-full sm:mx-6 mx-4 md:py-[6.25rem] py-[5.25rem] flex flex-col">
        <section>
          <Image
            src="/images/empty-team.png"
            alt="No team available"
            width={810}
            height={255}
            className="w-[19.5rem] sm:w-[32.5rem] lg:w-[50.625rem] h-auto max-w-none"
          />
        </section>
        <p className="text-md mt-8 sm:text-lg sm:mt-12 text-text-default text-center font-medium">
          아직 소속된 팀이 없습니다. <br />
          팀을 생성하거나 팀에 참여해보세요.
        </p>
        <nav className="mt-12 sm:mt-20 flex flex-col items-center gap-y-2">
          <Link href="/create">
            <Button
              label="팀 생성하기"
              variant="primary"
              className="w-[11.625rem]"
              onClick={() => handleNavigate("/create")}
            />
          </Link>
          <Link href="/join">
            <Button
              label="팀 참여하기"
              variant="ghost"
              size="md"
              className="w-[11.625rem]"
              onClick={() => handleNavigate("/join")}
            />
          </Link>
        </nav>
      </div>
    </main>
  );
}
