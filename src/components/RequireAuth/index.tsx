"use-client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/lib/store";
import { populateTodo } from "@/features/todo/todoSlice";
import { setUserData } from "@/features/auth/authSlice";

// Testing whether user authenticated or not
const RequiresAuth = ({ children }: { children: any }) => {
  const isAuthorized = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("userData")!);
    if (isAuthorized || user?.isLoggedIn) {
      dispatch(populateTodo(user));
      dispatch(setUserData(user));
    } else {
      router.push("/auth/login");
    }
  }, [isAuthorized, router]);

  return children;
};

export default RequiresAuth;
