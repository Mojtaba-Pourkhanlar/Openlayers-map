import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

type Position = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: Position;
}

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipContent = styled.div<{ $position: Position }>`
  position: absolute;
  background-color: #1f2937;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  white-space: nowrap;
  z-index: 50;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  ${({ $position }) => getPositionStyles($position)}
`;

const getPositionStyles = (position: Position) => {
  switch (position) {
    case "top":
      return css`
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 0.5rem;

        &::before {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-width: 4px;
          border-style: solid;
          border-color: #1f2937 transparent transparent transparent;
        }
      `;
    case "bottom":
      return css`
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 0.5rem;

        &::before {
          content: "";
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-width: 4px;
          border-style: solid;
          border-color: transparent transparent #1f2937 transparent;
        }
      `;
    case "left":
      return css`
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-right: 1rem;

        &::before {
          content: "";
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          border-width: 4px;
          border-style: solid;
          border-color: transparent transparent transparent #1f2937;
        }
      `;
    case "right":
      return css`
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-left: 1rem;

        &::before {
          content: "";
          position: absolute;
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          border-width: 4px;
          border-style: solid;
          border-color: transparent #1f2937 transparent transparent;
        }
      `;
    default:
      return "";
  }
};

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  position = "right",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 780);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <>
      {isLargeScreen ? (
        <TooltipContainer>
          <span
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
          >
            {children}
          </span>
          {isVisible && (
            <TooltipContent $position={position}>{text}</TooltipContent>
          )}
        </TooltipContainer>
      ) : (
        children
      )}
    </>
  );
};

export default Tooltip;
