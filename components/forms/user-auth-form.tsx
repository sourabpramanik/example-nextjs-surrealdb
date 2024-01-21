"use client";

import * as React from "react";

import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Github, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  next: any;
}

const formSchema = z.object({
  email: z.string().min(2).max(50).email("Invalid email address"),
});

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoginWithEmail, setIsLoginWithEmail] =
    React.useState<boolean>(false);
  const [isLoginWithGithub, setIsLoginWithGithub] =
    React.useState<boolean>(false);
  const [isLoginWithGoogle, setIsLoginWithGoogle] =
    React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoginWithEmail(true);
    signIn("email", {
      email: values.email,
      redirect: false,
      ...(props.next && props.next.length > 0
        ? { callbackUrl: props.next }
        : {}),
    }).then((res) => {
      if (res?.ok && !res?.error) {
        toast.success("Check your terminal");
      } else {
        toast.error("Something went wrong");
      }
      setIsLoginWithEmail(false);
    });
  }

  function onLoginWithGoogle() {
    setIsLoginWithGoogle(true);
    signIn("google", {
      redirect: false,
      ...(props.next && props.next.length > 0
        ? { callbackUrl: props.next }
        : {}),
    })
      .then(() => {
        toast.success("Redirecting...");
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoginWithGoogle(false);
      });
  }

  function onLoginWithGithub() {
    setIsLoginWithGithub(true);
    signIn("github", {
      redirect: false,
      ...(props.next && props.next.length > 0
        ? { callbackUrl: props.next }
        : {}),
    })
      .then(() => {
        toast.success("Redirecting...");
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoginWithGoogle(false);
      });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoginWithEmail} className="w-full">
            {isLoginWithEmail && (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        onClick={() => onLoginWithGoogle()}
        variant="outline"
        type="button"
        disabled={isLoginWithGoogle}
      >
        {isLoginWithGoogle ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
            fill="currentColor"
            className="mr-2 h-4 w-4"
          >
            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
          </svg>
        )}{" "}
        Google
      </Button>
      <Button
        onClick={() => onLoginWithGithub()}
        variant="outline"
        type="button"
        disabled={isLoginWithGithub}
      >
        {isLoginWithGithub ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  );
}
