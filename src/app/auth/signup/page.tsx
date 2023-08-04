"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

import { credentials } from "@/data/credentials";
import { SignupDataType } from "@/types/type";
import { Button, Text, LinkText } from "@/components/Reusables/SharedStyling";

const SignupPage = () => {
  const [userData, setUserData] = useState<SignupDataType>({
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
      router?.push("/auth/login");
    } else {
      router?.push("/auth/signup");
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
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          name="username"
          placeholder="Type your username..."
          value={userData?.username}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, username: e.target.value }))
          }
        />

        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="Type your password..."
          value={userData?.password}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, password: e.target.value }))
          }
        />

        <Label htmlFor="confirm">Confirm Password</Label>
        <Input
          type="password"
          name="confirmd"
          placeholder="Confirm password..."
          value={userData?.confirm}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, confirm: e.target.value }))
          }
        />
        <Button
          borderRadius="15px"
          padding="8px 15px"
          width="100px"
          hoverColor="#e6faec"
          fontSize="18px"
          type="submit"
        >
          Signup
        </Button>
        <Text fontSize="16px">
          Have account already?{" "}
          <LinkText href="/auth/login">Click here to login</LinkText>
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

const Label = styled.label`
  font-size: 18px;
  width: 100%;
  text-align: left;
  margin-left: 55px;
`;

export default SignupPage;
