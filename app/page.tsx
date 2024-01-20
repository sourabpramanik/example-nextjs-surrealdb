import { getAllTasks } from "@/lib/task/handler";
import TaskTable from "@/components/task-table";
import { surrealDatabase } from "./api/lib/surreal";

export default async function Home() {
  const { data } = await getAllTasks();
  console.log(data);

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Bonjour!</h2>
        </div>
      </div>

      <TaskTable data={data ?? []} />
    </div>
  );
}
