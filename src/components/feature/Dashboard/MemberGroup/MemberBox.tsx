import Image from "next/image";
import { useCallback, useMemo } from "react";
import { motion } from "framer-motion";

type Props = {
  profile: string;
  name: string;
  email: string;
  isAdmin: boolean;
  isSelf: boolean;
  isAbleButton: boolean;
  onClickProfile: () => void;
};

export default function MemberBox({
  profile,
  name,
  email,
  isAdmin,
  isSelf,
  isAbleButton,
  onClickProfile,
}: Props) {
  const handleDelete = useCallback(() => {
    alert("팀원 삭제하기"); // TODO: 모달, API 연결
  }, []);

  const hoverAnimation = useMemo(() => ({ scale: 1.04 }), []);
  const transitionSpring = useMemo(
    () => ({ type: "spring", stiffness: 300, damping: 20 }),
    [],
  );

  return (
    <motion.div
      className="w-full h-[4.25rem] sm:h-[4.5625rem] flex bg-bg-secondary px-4 sm:px-6 py-3 sm:py-5 rounded-2xl justify-between items-center cursor-pointer"
      onClick={onClickProfile}
      whileHover={hoverAnimation}
      transition={transitionSpring}
    >
      <div className="w-full hidden sm:flex gap-3 min-w-0">
        <Image src={profile} alt="프로필 이미지" width={32} height={32} />
        <div className="flex flex-col w-full gap-0.5 min-w-0">
          <div className="flex items-center font-medium text-md text-text-primary gap-1 w-full">
            <div className="truncate whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
              {name}
            </div>
            {isAdmin && (
              <div className="flex-shrink-0 font-light text-xs text-text-disabled">
                (관리자)
              </div>
            )}
            {!isAdmin && isSelf && (
              <div className="flex-shrink-0 font-light text-xs text-text-disabled">
                (나)
              </div>
            )}
          </div>
          <div className="font-normal text-sm text-text-secondary break-words overflow-hidden text-ellipsis line-clamp-2">
            {email}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full h-full sm:hidden items-center gap-1.5 min-w-0">
        <div className="flex w-full gap-2 items-center">
          <Image src={profile} alt="프로필 이미지" width={24} height={24} />
          <div className="flex-1 flex items-center font-medium text-md text-text-primary gap-1 min-w-0">
            <div className="truncate whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
              {name}
            </div>
            {isAdmin && (
              <div className="flex-shrink-0 font-light text-xs text-text-disabled">
                (관리자)
              </div>
            )}
            {!isAdmin && isSelf && (
              <div className="flex-shrink-0 font-light text-xs text-text-disabled">
                (나)
              </div>
            )}
          </div>
        </div>
        <div className="w-full font-normal text-sm text-text-secondary break-words overflow-hidden text-ellipsis line-clamp-1">
          {email}
        </div>
      </div>
      <div className="flex items-center justify-center">
        {isAbleButton && !isAdmin && (
          <Image
            src="/icons/icon-delete-people.svg"
            alt="회원 삭제"
            width={24}
            height={24}
            className="cursor-pointer text-red-500 ml-4"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
