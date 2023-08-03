import styled from "styled-components";

export const Button = styled.button`
  padding: ${(props) => props.padding || "5px 10px"};
  border-radius: ${(props) => props.borderRadius || "5px"};
  font-size: ${(props) => props.fontSize || "12px"};
  display: flex;
  align-items: ${(props) => props.alignItems || "center"};
  justify-content: ${(props) => props.justifyContent || "center"};
  gap:2px;
  &:hover {
    background: ${(props) => props.hoverColor || "#aed7fc"};
    color: ${(props) => props.hoverTextColor || "#2b2b29"};
    cursor: pointer;
  }
`;
