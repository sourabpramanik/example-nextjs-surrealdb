"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { Task, record, taskSchema } from "@/lib/schema";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useState } from "react";
import { Loader, SquarePen } from "lucide-react";
import { createTask, updateTaskById } from "@/lib/task/handler";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface TaskFormProps {
  editRecord?: Task;
}

export function TaskForm(props: TaskFormProps) {
  const { editRecord } = props;

  const form = useForm<Task>({
    resolver: zodResolver(taskSchema),
    defaultValues: editRecord,
    mode: "onChange",
  });
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();

  async function onSubmit(data: Task) {
    setSubmitting(true);
    try {
      if (editRecord?.id) {
        await updateTaskById(editRecord.id.replace("task:", ""), data);
        toast.success("Task updated successfully!");
      } else {
        await createTask({
          ...data,
          author: record("user").parse("user:" + session?.user.id),
        });
        toast.success("Task created successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.success("Something went wrong. Try again");
    } finally {
      setSubmitting(false);
      router.push("/");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter a brief description about the task"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Select a status</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="todo" />
                    </FormControl>
                    <FormLabel className="font-normal">Todo</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="inprogress" />
                    </FormControl>
                    <FormLabel className="font-normal">Inprogress</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="done" />
                    </FormControl>
                    <FormLabel className="font-normal">Done</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="canceled" />
                    </FormControl>
                    <FormLabel className="font-normal">Cancel</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Select a label</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="bug" />
                    </FormControl>
                    <FormLabel className="font-normal">Bug</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="feature" />
                    </FormControl>
                    <FormLabel className="font-normal">Feature</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="documentation" />
                    </FormControl>
                    <FormLabel className="font-normal">Documentation</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Set priority for the task</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="high" />
                    </FormControl>
                    <FormLabel className="font-normal">High</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="moderate" />
                    </FormControl>
                    <FormLabel className="font-normal">Moderate</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="low" />
                    </FormControl>
                    <FormLabel className="font-normal">Low</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="float-end">
          {isSubmitting ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <SquarePen className="mr-2 h-4 w-4" />
          )}
          {editRecord?.id ? "Update task" : "Create task"}
        </Button>
      </form>
    </Form>
  );
}
