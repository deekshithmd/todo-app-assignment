import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setAuthenticaion } from "@/features/auth/authSlice";
import type { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";

export const Header = () => {
  const isAuthorized = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(setAuthenticaion(false));
    router.push("/login");
  };
  return (
    <HeaderContainer>
      <h1 onClick={() => router.push("/")}>Todo App</h1>
      {isAuthorized ? (
        <button onClick={() => handleLogout()}>Logout</button>
      ) : (
        <button
          onClick={() => {
            router.push("/login");
          }}
        >
          Login
        </button>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  height: 12vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  position: fixed;
  top: 0;
  right: 0;
  padding: 5px 10px;
`;
