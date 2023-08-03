import styled from "styled-components";
import Image from "next/image";
import { ButtonType, IconType, TextType } from "@/types/type";

export const Button = styled.button<ButtonType>`
  width: ${(props) => props.width || "auto"};
  padding: ${(props) => props.padding || "5px 10px"};
  border-radius: ${(props) => props.borderRadius || "5px"};
  border: ${(props) => props.border || "1px solid black"};
  font-size: ${(props) => props.fontSize || "12px"};
  display: flex;
  align-items: ${(props) => props.alignItems || "center"};
  justify-content: ${(props) => props.justifyContent || "center"};
  gap: 2px;
  &:hover {
    background: ${(props) => props.hoverColor || "#aed7fc"};
    color: ${(props) => props.hoverTextColor || "#2b2b29"};
    cursor: pointer;
  }
`;

export const Icon = styled(Image)<IconType>`
  width: ${(props) => props.width || "30px"};
  height: ${(props) => props.height || "30px"};
  cursor: pointer;
`;

export const Text = styled.p<TextType>`
  font-size: ${(props) => props.fontSize || "12px"};
  font-weight: ${(props) => props.fontWeight || "400"};
`;
