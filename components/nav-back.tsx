"use client";

import { ChevronLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

const NavBack = () => {
  const router = useRouter();
  return (
    <div className="w-full flex items-center justify-start -ml-5 my-3">
      <Button onClick={() => router.back()} variant={"ghost"}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button onClick={() => router.push("/")} variant={"ghost"}>
        <Home className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default NavBack;
