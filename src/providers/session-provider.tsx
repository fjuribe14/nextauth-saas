"use client";

import * as React from "react";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function AuthSessionProvider({ children, ...props }: SessionProviderProps) {
  const session = await getServerSession(authOptions);

  console.log(session);
  return (
    <SessionProvider {...props} session={session}>
      {children}
    </SessionProvider>
  );
}
