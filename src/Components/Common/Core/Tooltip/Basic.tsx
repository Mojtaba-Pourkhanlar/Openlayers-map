import React from "react";
import styled, { useTheme } from "styled-components";
import Typography from "../Typography";

const Container = styled.div`
  position: relative;
  display: inline-block;
  height: 32px;
  margin: 0;
  padding: 0;
  &:hover {
    & span {
      visibility: visible;
      opacity: 1;
    }
  }
`;
const TooltipBox = styled.span<{ $position: "right" | "bottom" }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  min-width: 110px;
  max-width: unset;
  min-height: 27px;
  background: ${({ theme }) => theme.palette.secondary[900]};
  border-radius: ${({ $position }) =>
    $position === "right" ? "24px 24px 24px 0px" : "50px 24px 24px 50px"};
  box-shadow: 0px 1px 8px 0px #dcd9e3;
  position: absolute;
  z-index: 1301 !important;
  top: ${({ $position }) => ($position === "right" ? "-80%" : "50%")};
  left: ${({ $position }) => $position === "right" && "50%"};
  right: ${({ $position }) => $position === "bottom" && "-200%"};
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.5s;
  padding: 0 2px;
`;

interface Props {
  text: string;
  children: React.ReactNode;
  position?: "bottom" | "right";
}
const Basic = ({ position = "right", text, children }: Props) => {
  const theme = useTheme().palette;
  return (
    <Container>
      {children}
      <TooltipBox $position={position}>
        <Typography
          style={{
            textAlign: "center",
            color: theme.neutral[800],
            margin: "0",
            padding: "0",
            fontWeight: 500,
            fontSize: "14px",
            userSelect: "none",
          }}
        >
          {text}
        </Typography>
      </TooltipBox>
    </Container>
  );
};

export default Basic;
