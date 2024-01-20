import { TaskForm } from "@/components/forms/task-form";
import { Separator } from "@/components/ui/separator";
import { getTaskById } from "@/lib/task/handler";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function EditTaskPage({
  params,
}: {
  params: { id: string };
}) {
  const { data } = await getTaskById(params.id);
  const session = await getServerSession();

  if (!data || session?.user.id !== data.author.replace("user:", "")) {
    redirect("/");
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Edit Task:{params.id}</h3>
        <p className="text-sm text-muted-foreground">Edit the details below.</p>
      </div>
      <Separator />
      <TaskForm editRecord={data} />
    </div>
  );
}
