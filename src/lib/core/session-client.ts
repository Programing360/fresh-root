"use client";

import { authClient } from "../auth-client";
export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}
export function useClientSession() {
  const { data: session, isPending, error } = authClient.useSession();

  return {
    session,
    user: session?.user as SessionUser | undefined,
    isPending,
    error,
  };
}
