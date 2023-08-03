"use client";
import React from "react";
import styled from "styled-components";

export const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalContainer>
      {children}
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 12vh;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f4d5;
  opacity: 1;
  z-index:2;
`;


