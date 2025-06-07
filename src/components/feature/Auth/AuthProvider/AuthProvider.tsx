"use client";

import { useMyInfoQuery } from "@/api/user/user.query";
import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setAuth, clearAuth } = useAuthStore();
  const { data, isError } = useMyInfoQuery();

  useEffect(() => {
    if (data) {
      setAuth(data);
    }

    if (isError) {
      clearAuth();
    }
  }, [data, isError, setAuth, clearAuth]);

  return <>{children}</>;
}
