"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCallback, useState } from "react";
import Sidebar from "./Sidebar";
import DropDownMenu from "@/components/common/Dropdown/Menu";
import DropDownItem from "@/components/common/Dropdown/Item";

const mockUser = {
  name: "안해나",
  teams: ["경영관리팀", "프로덕트팀", "마케팅팀"],
};

export default function Header() {
  const pathname = usePathname();

  const isLanding = pathname === "/";
  const isAuthPage = ["/login", "/sign-up"].includes(pathname);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<string | null>(
    mockUser.teams[0] || null,
  );

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleMenuClick = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <>
      <header
        className="flex items-center w-full h-[60px] bg-bg-secondary max-w-full 
                   px-[16px] py-[20px] md:px-[24px] md:py-[14px] lg:px-[360px] lg:py-[14px]"
      >
        <div className="flex items-center">
          {!isLanding && !isAuthPage && mockUser.teams.length > 0 && (
            <button onClick={handleMenuClick} className="block md:hidden mr-4">
              <Image
                src="/icons/icon-gnb_menu.svg"
                alt="메뉴"
                width={24}
                height={24}
              />
            </button>
          )}
        </div>

        <div className="flex items-center md:gap-8 lg:gap-10">
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

          {!isLanding && !isAuthPage && (
            <>
              <div className="hidden md:flex items-center md:gap-8 lg:gap-10">
                {mockUser.teams.length > 1 ? (
                  <div className="flex items-center gap-2.5 cursor-pointer">
                    <span className="whitespace-nowrap text-text-primary text-md md:text-lg">
                      {currentTeam}
                    </span>
                    <Image
                      src="/icons/icon-check.svg"
                      alt="팀 선택"
                      width={16}
                      height={16}
                    />
                  </div>
                ) : (
                  <span className="text-text-primary text-md md:text-lg">
                    {mockUser.teams[0]}
                  </span>
                )}

                <Link
                  href="/boards"
                  className={"whitespace-nowrap text-md md:text-lg"}
                >
                  모집게시판
                </Link>
              </div>
            </>
          )}
        </div>

        {!isAuthPage && (
          <div className="ml-auto">
            {isLanding ? (
              <Link
                href="/login"
                className="whitespace-nowrap text-text-primary text-md md:text-lg"
              >
                로그인
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={toggleMenu}
                  className="flex gap-2 cursor-pointer"
                >
                  <Image
                    src="/icons/icon-user.svg"
                    alt="프로필"
                    width={16}
                    height={16}
                    className="rounded-full cursor-pointer"
                  />
                  <span className="whitespace-nowrap text-sm md:text-base text-text-primary hidden lg:inline-block">
                    {mockUser.name}
                  </span>
                </button>

                <DropDownMenu
                  isOpen={isMenuOpen}
                  className="right-0 text-center"
                >
                  <DropDownItem>
                    <Link href="/myhistory">마이 히스토리</Link>
                  </DropDownItem>
                  <DropDownItem>
                    <Link href="/join">팀 참여</Link>
                  </DropDownItem>
                  <DropDownItem>
                    <Link href="/user-setting">계정 설정</Link>
                  </DropDownItem>
                  <DropDownItem>로그아웃</DropDownItem>
                </DropDownMenu>
              </div>
            )}
          </div>
        )}
      </header>

      {isSidebarOpen && (
        <Sidebar
          user={mockUser}
          currentTeam={currentTeam}
          onClose={handleCloseSidebar}
        />
      )}
    </>
  );
}
