import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import NavBack from "@/components/nav-back";

export const metadata: Metadata = {
  title: "Task Forms",
  description: "Task form",
};

interface TaskLayoutProps {
  children: React.ReactNode;
}

export default function TaskLayout({ children }: TaskLayoutProps) {
  return (
    <>
      <div className="space-y-6 p-10 pb-16">
        <div className="flex items-center justify-center">
          <div className="flex-1 lg:max-w-2xl">
            <NavBack />
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
