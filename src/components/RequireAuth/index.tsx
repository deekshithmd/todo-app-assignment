import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store";

const RequiresAuth = ({ children }: { children: any }) => {
  const isAuthorized = useSelector((state: RootState) => state.auth.isLoggedIn);
  const router = useRouter();
  useEffect(() => {
    if (!isAuthorized) {
      router.push("/login");
    }
  }, [isAuthorized, router]);

  return children;
};

export default RequiresAuth;
