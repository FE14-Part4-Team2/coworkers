import ShortCard from "../Card/ShortCard";
import Image from "next/image";

const dummyList = [
  //LATER: 실제 게시물 API 연결
  {
    id: 1,
    date: "2025.06.17",
    title: "6월에 같이 팀하면서 일정 관리하고 공유하실 분!",
    writer: "이나경",
    likes: 10,
  },
  {
    id: 2,
    date: "2025.06.15",
    title: "React 같이 공부하실 분 구해요!",
    writer: "홍길동",
    likes: 7,
  },
  {
    id: 3,
    date: "2025.06.18",
    title: "같이 공모전 나가실 분 구합니다!",
    writer: "김김김",
    likes: 20,
  },
];

export default function BoardBestList() {
  return (
    <>
      <div className="flex items-center mt-[2.5rem] justify-between mb-[3.5rem]">
        <span className="sm:text-xl text-text-primary text-lg ">
          베스트 게시글
        </span>
        <div className="flex gap-[0.1rem]">
          <button className="text-text-disabled">더보기</button>
          <Image
            src="/icons/icon-arrow_right.svg"
            alt="오른쪽 화살표"
            width={16}
            height={16}
          />
        </div>
      </div>
      <ul className="flex gap-[1.5rem]">
        {dummyList.map((post) => (
          <li key={post.id}>
            <ShortCard
              date={post.date}
              title={post.title}
              writer={post.writer}
              likes={post.likes}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
