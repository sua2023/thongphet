"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Loader from "@/utils/Loader";
import useAuth from "./useAuth";

interface authRouteProps {
  children: React.ReactNode;
}

const AuthRoute = ({ children }: authRouteProps) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) return;
    if (!isAuthenticated) {
      router.push("/auth/admin/login");
    }
  }, [router]);

  return isAuthenticated ? <>{children}</> : null;
};

export default AuthRoute;
