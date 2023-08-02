"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { credentials } from "@/data/credentials";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    confirm: "",
  });
  const router = useRouter();

  const handleSignup = (e: any) => {
    e.preventDefault();
    if (userData?.username !== "" && userData?.password === userData?.confirm) {
      credentials?.push({
        username: userData?.username,
        password: userData?.password,
      });
      router?.push("/login");
    } else {
      router?.push("/signup");
    }
    setUserData({
      username: "",
      password: "",
      confirm: "",
    });
  };

  return (
    <Container>
      <LoginContainer onSubmit={handleSignup}>
        <h1>Signup</h1>
        <label htmlFor="username">Username</label>
        <Input
          type="text"
          name="username"
          value={userData?.username}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, username: e.target.value }))
          }
        />

        <label htmlFor="password">Password</label>
        <Input
          type="password"
          name="password"
          value={userData?.password}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, password: e.target.value }))
          }
        />

        <label htmlFor="password">Confirm Password</label>
        <Input
          type="password"
          name="password"
          value={userData?.confirm}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, confirm: e.target.value }))
          }
        />
        <Button type="submit">Signup</Button>
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
  height: 400px;
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

export default SignupPage;
