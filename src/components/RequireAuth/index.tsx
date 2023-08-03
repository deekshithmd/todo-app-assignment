"use-client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/lib/store";
import { populateTodo } from "@/features/todo/todoSlice";
import { setAuthentication } from "@/features/auth/authSlice";
import { todos } from "@/data/todos";

const RequiresAuth = ({ children }: { children: any }) => {
  const isAuthorized = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isAuthorized || isLoggedIn) {
      const storedTodo = JSON.parse(localStorage.getItem("todos")!);
      dispatch(populateTodo(storedTodo));
      dispatch(setAuthentication(true));
    } else {
      router.push("/auth/login");
    }
  }, [isAuthorized, router]);

  return children;
};

export default RequiresAuth;
