"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { credentials } from "@/data/credentials";
import { setAuthentication } from "@/features/auth/authSlice";
import { LoginDataType } from "@/types/type";
import { Button, Text, LinkText } from "@/components/Reusables/SharedStyling";

const LoginPage = () => {
  const [userData, setUserData] = useState<LoginDataType>({
    username: "",
    password: "",
  });
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = (e: any) => {
    e.preventDefault();
    let isMatched = false;
    for (let value of credentials) {
      if (
        userData.username === value?.username &&
        userData.password === value.password
      ) {
        isMatched = true;
        dispatch(setAuthentication(true));
        router.push("/");
      }
    }
    if (!isMatched) {
      router.push("/auth/signup");
    }
  };

  return (
    <Container>
      <LoginContainer onSubmit={handleLogin}>
        <h1>Login</h1>
        <label htmlFor="username">
          <Input
            type="text"
            name="username"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, username: e.target.value }))
            }
          />
        </label>
        <label htmlFor="password">
          <Input
            type="password"
            name="password"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, password: e.target.value }))
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
