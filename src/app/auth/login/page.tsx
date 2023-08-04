"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { database } from "@/data/database";
import { setUserData } from "@/features/auth/authSlice";
import { LoginDataType } from "@/types/type";
import { Button, Text, LinkText } from "@/components/Reusables/SharedStyling";

const LoginPage = () => {
  const [userDetails, setUserDetails] = useState<LoginDataType>({
    username: "",
    password: "",
  });
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = (e: any) => {
    e.preventDefault();
    let isMatched = false;
    for (let value of database) {
      if (
        userDetails.username === value?.username &&
        userDetails.password === value.password
      ) {
        isMatched = true;
        const prevData = JSON.parse(localStorage.getItem("userData")!);
        const historyData = prevData?.id === value?.id ? prevData : value;
        const loggedInData = { ...historyData, isLoggedIn: true };
        dispatch(setUserData(loggedInData));
        router.push("/");
      }
    }
    if (!isMatched) {
      router.push("/auth/signup");
    }
    setUserDetails({
      username: "",
      password: "",
    });
  };

  return (
    <Container>
      <LoginContainer onSubmit={handleLogin}>
        <h1>Login</h1>
        <label htmlFor="username">
          <Input
            type="text"
            placeholder="Enter username..."
            name="username"
            value={userDetails?.username}
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, username: e.target.value }))
            }
          />
        </label>
        <label htmlFor="password">
          <Input
            type="password"
            name="password"
            placeholder="Enter password..."
            value={userDetails?.password}
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </label>
        <Button
          borderRadius="15px"
          padding="8px 15px"
          width="100px"
          hoverColor="#e6faec"
          fontSize="18px"
          type="submit"
        >
          Login
        </Button>
        <Text fontSize="16px">
          Don`t have account?{" "}
          <LinkText href="/auth/signup">Click here to Signup</LinkText>
        </Text>
      </LoginContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.form`
  width: 300px;
  height: auto;
  border: 1px solid black;
  border-radius: 10px;
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  row-gap: 15px;
`;

const Input = styled.input`
  outline: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
`;

export default LoginPage;
