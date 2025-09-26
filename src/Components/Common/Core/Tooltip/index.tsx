import React, { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import Typography from "../Typography";

export interface PropsToltips {
  name: string;
  value: "view" | "permissions" | "delete";
  icon: JSX.Element;
}

interface TooltipProps {
  children: ReactNode;
  title: any;
  hasId: number;
  onClick?: () => void; // New prop
  onItemClick?: (item: PropsToltips) => void;
  tableData: any[];
}

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const TooltipContent = styled.div`
  position: fixed;
  border-radius: 0px 24px 24px 24px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.12);
  width: 162px;
  z-index: 100000000 !important;
  background: ${({ theme }) => theme.palette.neutral[0]};
`;

const MUIBox = styled.div<{ $index: number }>`
  display: flex;
  align-items: center;
  height: 48px;
  color: ${({ theme }) => theme.palette.neutral[400]};
  background: ${({ theme }) => theme.palette.neutral[0]};
  &:nth-child(even) {
    div > svg {
      width: 24px;
      height: 24px;
      path {
        fill: ${({ theme }) => theme.palette.neutral[400]};
        stroke: ${({ theme }) => theme.palette.neutral[400]};
      }
    }
  }
  &:first-child {
    border-radius: 0px 24px 0 0;
  }
  &:last-child {
    border-radius: ${({ $index }) =>
      $index === 1 ? "0px 24px 24px 24px" : "0px 0 24px 24px"};
  }
  &:hover {
    &:nth-child(1) {
      div > svg > g > path {
        fill: ${({ theme }) => theme.palette.neutral[900]};
      }
    }
    div > svg {
      path {
        fill: ${({ theme }) => theme.palette.neutral[900]};
      }
    }
    &:nth-child(even) {
      div > svg {
        path {
          stroke: ${({ theme }) => theme.palette.neutral[900]};
        }
      }
    }
    color: ${({ theme }) => theme.palette.neutral[900]};
    background: ${({ theme }) => theme.palette.secondary[100]};
  }
`;

const TextStyle = styled(Typography)`
  font-size: 14px;
  margin-top: 17px;
  font-weight: 400;
`;

export const Tooltip: React.FC<TooltipProps> = ({
  onItemClick,
  children,
  tableData,
  title,
  onClick,
  hasId,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [topPosition, setTopPosition] = useState(0);
  const [leftPosition, setLeftPosition] = useState(0);
  const [bottomPosition, setBottomPosition] = useState(0);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    const currentTarget = event.currentTarget;

    if (currentTarget) {
      setIsTooltipVisible((prevIsTooltipVisible) => !prevIsTooltipVisible);

      const offsetTop = currentTarget.offsetTop - window.scrollY;
      const offsetBottom = offsetTop + currentTarget.offsetHeight;

      setBottomPosition(() => offsetTop - 78);
      setTopPosition(() => offsetBottom);
      setLeftPosition(
        () =>
          currentTarget.offsetLeft +
          window.scrollX +
          currentTarget.offsetWidth / 2
      );
    }

    if (onClick) {
      onClick();
    }
  };

  const handleItemClick = (item: PropsToltips) => {
    setIsTooltipVisible(false); // Close the tooltip when an item is clicked
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const tooltipElement = document.getElementById(`${hasId}`);
    if (tooltipElement && !tooltipElement.contains(event.target as Node)) {
      setIsTooltipVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <TooltipWrapper key={hasId} id={`${hasId}`} onClick={handleClick}>
      {children}
      {isTooltipVisible && tableData?.length > 10 && (
        <TooltipContent
          style={{
            top: `${
              tableData[tableData.length - 2].id === hasId ||
              tableData[tableData.length - 1].id === hasId
                ? bottomPosition
                : topPosition
            }px`,
            left: `${leftPosition}px`,
          }}
        >
          {title?.map((item: PropsToltips, index: any) => (
            <MUIBox
              $index={tableData?.length}
              key={index}
              onClick={() => handleItemClick(item)}
            >
              <div style={{ width: "24px", height: "24px", margin: "0 12px" }}>
                {item.icon}
              </div>
              <TextStyle>{item.name}</TextStyle>
            </MUIBox>
          ))}
        </TooltipContent>
      )}
      {isTooltipVisible && tableData?.length <= 10 && (
        <TooltipContent
          style={{ top: `${topPosition}px`, left: `${leftPosition}px` }}
        >
          {title?.map((item: PropsToltips, index: any) => {
            return (
              <MUIBox
                $index={title?.length}
                key={index}
                onClick={() => handleItemClick(item)}
              >
                <div
                  style={{ width: "24px", height: "24px", margin: "0 12px" }}
                >
                  {item.icon}
                </div>
                <TextStyle>{item.name}</TextStyle>
              </MUIBox>
            );
          })}
        </TooltipContent>
      )}
    </TooltipWrapper>
  );
};
