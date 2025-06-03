import FilterDropdown from "@/components/common/Dropdown/FilterDropdown";
import LongCard from "./LongCard";

const dummyList = [
  {
    id: 1,
    date: "2025.06.17",
    title: "6월에 같이 팀하면서 일정 관리하고 공유하실 분!",
    writer: "이나경",
    content:
      "혼자 하려니까 일정 관리가 안되어서 팀 맺어서 같이 일정 공유하실 분 구합니다! 한 4명정도 구해요~~~~",
    likes: 10,
  },
  {
    id: 2,
    date: "2025.06.17",
    title: "6월에 같이 팀하면서 일정 관리하고 공유하실 분!",
    writer: "이나경",
    content:
      "혼자 하려니까 일정 관리가 안되어서 팀 맺어서 같이 일정 공유하실 분 구합니다! 한 4명정도 구해요~~~~",
    likes: 10,
  },
  {
    id: 3,
    date: "2025.06.17",
    title: "6월에 같이 팀하면서 일정 관리하고 공유하실 분!",
    writer: "이나경",
    content:
      "혼자 하려니까 일정 관리가 안되어서 팀 맺어서 같이 일정 공유하실 분 구합니다! 한 4명정도 구해요~~~~",
    likes: 10,
  },
  {
    id: 4,
    date: "2025.06.17",
    title: "6월에 같이 팀하면서 일정 관리하고 공유하실 분!",
    writer: "이나경",
    content:
      "혼자 하려니까 일정 관리가 안되어서 팀 맺어서 같이 일정 공유하실 분 구합니다! 한 4명정도 구해요~~~~",
    likes: 10,
  },
];

export default function BoardList() {
  return (
    <>
      <div className="flex flex-col mt-[5rem]">
        <div className="flex items-center justify-between mb-[2rem]">
          <span className="text-xl text-text-primary">게시글</span>
          <FilterDropdown />
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-10">
          {dummyList.map((post) => (
            <li key={post.id}>
              <LongCard
                key={post.id}
                date={post.date}
                title={post.title}
                writer={post.writer}
                content={post.content}
                likes={post.likes}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
