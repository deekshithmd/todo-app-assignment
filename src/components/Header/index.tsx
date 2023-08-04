"use client";
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { setUserData } from "@/features/auth/authSlice";
import { type RootState } from "@/lib/store";
import { Button } from "../Reusables/SharedStyling";

export const Header = () => {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    const updatedUserData = JSON.parse(localStorage.getItem("userData")!);
    const logoutData = { ...updatedUserData, isLoggedIn: false };
    dispatch(setUserData(logoutData));
    router.push("/auth/login");
    localStorage.removeItem("isLoggedIn");
  };
  return (
    <HeaderContainer>
      <Logo onClick={() => router.push("/")}>To-Do App</Logo>
      {!isLoggedIn ? (
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
