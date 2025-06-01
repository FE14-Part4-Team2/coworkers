"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCallback, useState } from "react";
import Sidebar from "./Sidebar";
import UserDropdown from "./UserDropdown";
import TeamDropdown from "./TeamDropdown";

const mockUser = {
  name: "안해나",
  teams: [
    { name: "경영관리팀", img: "/icons/icon-avatar.svg" },
    { name: "프로덕트팀", img: "/icons/icon-avatar.svg" },
    { name: "마케팅팀", img: "/icons/icon-avatar.svg" },
  ],
};

export default function Header() {
  const pathname = usePathname();

  const isLanding = pathname === "/";
  const isAuthPage = ["/login", "/sign-up"].includes(pathname);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTeamMenuOpen, setIsTeamMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTeam] = useState<string | null>(mockUser.teams[0].name || null);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const toggleTeamMenu = useCallback(() => {
    setIsTeamMenuOpen((prev) => !prev);
  }, []);

  const handleMenuClick = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <>
      <header
        className="fixed flex items-center w-full h-15 bg-bg-secondary max-w-[120rem] mx-auto
                 px-4 py-5 sm:px-6 sm:py-3.5 md:px-[18.75vw] md:py-3.5
                 justify-between sm:justify-center md:justify-between"
      >
        <div className="flex items-center">
          {!isLanding && !isAuthPage && mockUser.teams.length > 0 && (
            <button onClick={handleMenuClick} className="block sm:hidden mr-4">
              <Image
                src="/icons/icon-gnb_menu.svg"
                alt="메뉴"
                width={24}
                height={24}
              />
            </button>
          )}
        </div>

        <div className="flex items-center sm:gap-8 md:gap-10">
          <Link href="/">
            <Image
              src="/icons/icon-logo-sm.svg"
              alt="작은 로고"
              width={102}
              height={20}
              className="block md:hidden"
            />
            <Image
              src="/icons/icon-logo-lg.svg"
              alt="큰 로고"
              width={158}
              height={32}
              className="hidden md:block"
            />
          </Link>

          {!isLanding && !isAuthPage && (
            <>
              <div className="hidden sm:flex items-center sm:gap-8 md:gap-10">
                {mockUser.teams.length > 1 ? (
                  <TeamDropdown
                    teams={mockUser.teams}
                    currentTeam={currentTeam}
                    isOpen={isTeamMenuOpen}
                    onToggle={toggleTeamMenu}
                  />
                ) : (
                  <span className="text-text-primary text-lg">
                    {mockUser.teams[0].name}
                  </span>
                )}

                <Link href="/boards" className={"whitespace-nowrap text-lg"}>
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
                className="whitespace-nowrap text-text-primary text-lg"
              >
                로그인
              </Link>
            ) : (
              <div className="relative">
                <UserDropdown
                  userName={mockUser.name}
                  isOpen={isMenuOpen}
                  onToggle={toggleMenu}
                />
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
