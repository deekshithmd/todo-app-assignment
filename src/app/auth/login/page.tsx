"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { credentials } from "@/data/credentials";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuthentication } from "@/features/auth/authSlice";
import { LoginDataType } from "@/types/type";

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
        <Button type="submit">Login</Button>
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
  height: 300px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
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

const Button = styled.button`
  padding: 5px 10px;
`;

export default LoginPage;
