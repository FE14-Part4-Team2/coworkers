"use client";

import { useAuthStore } from "@/stores/authStore";
import LandingHeader from "./LandingHeader";
import Header from "./Header";

export default function LandingHeaderWrap() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) return <Header />;
  return <LandingHeader />;
}
