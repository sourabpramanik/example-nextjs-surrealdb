"use client";

import { CopyPlusIcon, EditIcon, Loader, Trash2 } from "lucide-react";
import { Row } from "@tanstack/react-table";

import { Button } from "../ui/button";

import { Task, record, taskSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createTask, deleteTaskById } from "@/lib/task/handler";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task: Task = taskSchema.parse(row.original);
  const router = useRouter();
  const [isCopying, setCopying] = useState<boolean>(false);
  const [isDeleting, setDeleting] = useState<boolean>(false);
  const { data: session } = useSession();

  const isAuthor = task.author.replace("user:", "") === session?.user.id;

  const handleEditClick = () => {
    task.id && router.push("/task/edit/" + task.id.replace("task:", ""));
  };

  const handleCreateCopy = async () => {
    setCopying(true);
    try {
      await createTask({
        title: task.title,
        description: task.description,
        status: task.status,
        label: task.label,
        priority: task.priority,
        author: record("user").parse("user:" + session?.user.id),
      });
      toast.success("Created a copy successfully!");
    } catch (error) {
      console.log(error);
      toast.success("Failed to copy!");
    } finally {
      setCopying(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    if (task.id) {
      try {
        await deleteTaskById(task.id.replace("task:", ""));
        toast.success("Successfully deleted!");
      } catch (error) {
        console.log(error);
        toast.success("Failed to delete!");
      } finally {
        setDeleting(false);
      }
    } else {
      toast.success("Trouble deleting!");
    }
  };

  return (
    <div className="flex items-center">
      {isAuthor && (
        <Button variant={"ghost"} onClick={handleEditClick}>
          <EditIcon className="w-4 h-4" />
        </Button>
      )}
      {isAuthor && (
        <Button className="relative min-w-14" variant={"ghost"}>
          {isDeleting ? (
            <Loader className="w-4 h-4 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" onClick={handleDelete} />
          )}
        </Button>
      )}

      <Button className="relative min-w-14" variant={"ghost"}>
        {isCopying ? (
          <Loader className="w-4 h-4 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 animate-spin" />
        ) : (
          <CopyPlusIcon className="w-4 h-4" onClick={handleCreateCopy} />
        )}
      </Button>
    </div>
  );
}
