import { Metadata } from "next";

import { UserAuthForm } from "@/components/forms/user-auth-form";
import { useParams } from "next/navigation";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  const { next } = useParams as { next?: string };

  return (
    <>
      <div className="container relative h-screen flex items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Get Started
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to get started
            </p>
          </div>
          <UserAuthForm next={next} />
        </div>
      </div>
    </>
  );
}
