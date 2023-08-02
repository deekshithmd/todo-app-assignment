import React from "react";
import styled from "styled-components";

export const Modal = ({ children }: { children: React.ReactNode }) => {
  return <ModalContainer>{children}</ModalContainer>;
};

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
  opacity: 0.9;
`;
