import { TaskForm } from "@/components/forms/task-form";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Create Task</h3>
        <p className="text-sm text-muted-foreground">
          Enter all the details below.
        </p>
      </div>
      <Separator />
      <TaskForm />
    </div>
  );
}
