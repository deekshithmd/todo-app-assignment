"use client";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setAuthentication } from "@/features/auth/authSlice";
import { store, type RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Button } from "../Reusables/SharedStyling";

export const Header = () => {
  const isAuthorized = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(setAuthentication(false));
    router.push("/auth/login");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("todos");
  };
  return (
    <HeaderContainer>
      <Logo onClick={() => router.push("/")}>To-Do App</Logo>
      {!isAuthorized ? (
        <Button
          fontSize="16px"
          onClick={() => {
            router.push("/auth/login");
          }}
        >
          Login
        </Button>
      ) : (
        <Button fontSize="16px" onClick={() => handleLogout()}>
          Logout
        </Button>
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
  background: #fff9ed;
  position: fixed;
  top: 0;
  right: 0;
  padding: 5px 10px;
`;

const Logo = styled.span`
  font-size: 36px;
  font-weight: 700;
  cursor: pointer;
`;
