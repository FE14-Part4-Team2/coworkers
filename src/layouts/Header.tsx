"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();

  const isLanding = pathname === "/";
  const isAuthPage = pathname === "/login" || pathname === "/sign-up";

  return (
    <header
      className="flex items-center w-full h-[60px] bg-bg-secondary max-w-full 
                   px-[16px] py-[20px] md:px-[24px] md:py-[14px] lg:px-[360px] lg:py-[14px]"
    >
      {/* 로고 */}
      <div className="flex items-center gap-10">
        <Link href="/">
          <Image
            src="/icons/icon-logo-sm.svg"
            alt="작은 로고"
            width={102}
            height={20}
            className="block lg:hidden"
          />
          <Image
            src="/icons/icon-logo-lg.svg"
            alt="큰 로고"
            width={158}
            height={32}
            className="hidden lg:block"
          />
        </Link>

        {/* GNB 메뉴 */}
        {!isAuthPage && !isLanding && (
          <nav className="hidden md:flex gap-10">
            <Link href="/dashboard">경영관리팀</Link>
            <Link href="/boards">자유게시판</Link>
          </nav>
        )}
      </div>

      {/* 오른쪽: 로그인 또는 프로필 */}
      {!isAuthPage && (
        <div className="ml-auto">
          {isLanding ? (
            <Link
              href="/login"
              className="text-text-primary text-md md:text-lg"
            >
              로그인
            </Link>
          ) : (
            <Link
              href="/profile"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Image
                src="/icons/icon-user.svg"
                alt="프로필"
                width={20}
                height={20}
                className="rounded-full cursor-pointer"
              />
              <span className="text-sm md:text-base text-text-primary">
                안해나
              </span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
