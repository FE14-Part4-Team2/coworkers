"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import UserDropdown from "./UserDropdown";
import TeamDropdown from "./TeamDropdown";
import { useAuthStore } from "@/stores/authStore";
import { useMyGroups } from "@/api/user/user.query";
import { useTeamStore } from "@/stores/teamStore";
import useImageFallback from "@/hooks/useImageFallback";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTeamMenuOpen, setIsTeamMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: teams } = useMyGroups();
  const { user } = useAuthStore();
  const { currentTeam, setCurrentTeam } = useTeamStore();
  const userImg = useImageFallback(user?.image, "/icons/icon-avatar.svg");

  useEffect(() => {
    if (!teams) return;

    if (
      currentTeam === null ||
      !teams.some((team) => team.name === currentTeam)
    ) {
      if (teams.length > 0) {
        setCurrentTeam(teams[0].name);
      } else {
        setCurrentTeam(null);
      }
    }
  }, [teams, currentTeam, setCurrentTeam]);

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

  const handleTeamClick = (name: string) => {
    setCurrentTeam(name);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-bg-secondary z-50 h-15">
        <div className="w-full h-16 max-w-[78rem] mx-auto flex items-center justify-between px-4 py-5 sm:px-6 sm:py-3.5 md:px-7 md:py-[0.88rem]">
          <div className="flex items-center">
            {teams && teams.length > 0 && (
              <button
                onClick={handleMenuClick}
                className="block sm:hidden mr-4"
              >
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

            <div className="hidden sm:flex items-center sm:gap-8 md:gap-10">
              {teams && teams.length > 0 ? (
                <TeamDropdown
                  teams={teams.map((team) => ({
                    name: team.name,
                    img: team.image ?? "/icons/icon-avatar.svg",
                    id: team.id,
                  }))}
                  currentTeam={currentTeam}
                  isOpen={isTeamMenuOpen}
                  onToggle={toggleTeamMenu}
                  onClose={() => setIsTeamMenuOpen(false)}
                  onTeamClick={handleTeamClick}
                />
              ) : (
                <Link href="/create" className="text-text-primary text-lg">
                  팀 생성
                </Link>
              )}

              <Link
                href="/boards"
                className={"whitespace-nowrap text-lg text-text-primary"}
              >
                모집게시판
              </Link>
            </div>
          </div>

          <div className="ml-auto">
            <div className="relative">
              <UserDropdown
                userName={user?.nickname ?? ""}
                userImg={userImg}
                isOpen={isMenuOpen}
                onToggle={toggleMenu}
                onClose={() => setIsMenuOpen(false)}
              />
            </div>
          </div>
        </div>
      </header>

      {isSidebarOpen && (
        <Sidebar
          currentTeam={currentTeam}
          onClose={handleCloseSidebar}
          groups={
            teams && teams.length > 0
              ? teams.map((team) => ({ teamId: team.id, name: team.name }))
              : null
          }
        />
      )}
    </>
  );
}
