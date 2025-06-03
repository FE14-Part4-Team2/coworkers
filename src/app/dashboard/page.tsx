import ListBadge from "@/components/feature/Dashboard/ListGroup/ListBadge";
import TeamBar from "@/components/feature/Dashboard/TeamBar/TeamBar";

type Task = {
  id: number;
  title: string;
  doneCount: number;
  totalCount: number;
};

const taskList: Task[] = [
  { id: 1, title: "할 일1", doneCount: 3, totalCount: 5 },
  { id: 2, title: "할 일2", doneCount: 5, totalCount: 5 },
  { id: 3, title: "할 일3", doneCount: 1, totalCount: 5 },
]; // TODO: API 연결

export default function DashboardPage() {
  return (
    <div className="w-full flex-col flex gap-12">
      <TeamBar />
      <div className="space-y-1">
        {/* //TODO: ListBar로 대체 */}
        {taskList.map((task) => (
          <div
            key={task.id}
            className="flex justify-between items-center bg-bg-tertiary h-10 px-3"
          >
            <span className="text-white text-sm">{task.title}</span>
            <ListBadge done={task.doneCount} total={task.totalCount} />
          </div>
        ))}
      </div>
    </div>
  );
}
