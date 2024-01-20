"use client";
import React from "react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

const NextAuthSessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};
export default NextAuthSessionProvider;
