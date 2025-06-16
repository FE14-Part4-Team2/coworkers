import Image from "next/image";
import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center min-h-screen gap-8">
      <h1 className="flex items-center text-[5rem] gap-2">
        <span>4</span>
        <Image
          src="/icons/icon-logo-icon.svg"
          alt="코워커스 로고"
          width={80}
          height={80}
        />
        <span>4</span>
      </h1>
      <div>
        <p className="sm:text-3xl font-semibold text-2xl text-center sm:text-left">
          페이지를 찾을 수 없어요.
        </p>
        <p className="mt-4 text-center sm:text-left text-md sm:text-2lg">
          대신, 새로운 팀원을 만나러 가볼까요?
        </p>
        <Link
          href={"/boards"}
          className="block mt-4 w-[9rem] sm:w-[13rem] bg-brand-gradient rounded py-2 text-center rounded-[2rem] mx-auto sm:mx-0"
        >
          둘러보기
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
