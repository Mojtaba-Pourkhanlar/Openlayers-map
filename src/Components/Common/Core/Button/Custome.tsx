import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Add } from "@/assets/svg/table.svg";
import { ReactComponent as List } from "@/assets/svg//project/list.svg";
import Tooltip from "@/Components/Common/Core/Tooltip/Basic";

const Wrapper = styled.div`
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  ${({ theme }) => theme.breakpoints.down(1050)} {
    height: 48px;
  }
`;

const StyledButton = styled.div<{ $isActive: boolean }>`
  cursor: pointer;
  width: inherit;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
  color: ${({ theme }) => theme.palette.neutral[0]};
  font-size: 14px;
  border-radius: 12px;
  ${({ theme }) => theme.breakpoints.down(1050)} {
    border-radius: 12px;
    height: 37px;
  }

  & > svg > path {
    fill: ${({ $isActive, theme }) =>
      $isActive ? theme.palette.primary[700] : "#ccc"};
    &:first-child {
      stroke: ${({ $isActive, theme }) =>
        $isActive ? theme.palette.primary[700] : "#ccc"};
    }
  }
`;

interface Props {
  firstOnClick?: React.MouseEventHandler<HTMLDivElement>;
  secondOnClick?: React.MouseEventHandler<HTMLDivElement>;
  defaultActive?: 1 | 2;
}

const ListGroup = ({
  firstOnClick,
  secondOnClick,
  defaultActive = 1,
}: Props) => {
  const [activeBtn, setActiveBtn] = useState<1 | 2>(defaultActive);

  useEffect(() => {
    setActiveBtn(defaultActive);
  }, [defaultActive]);

  const handleFirstBtnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeBtn === 1) return;
    if (firstOnClick) firstOnClick(e);
    setActiveBtn(1);
  };

  const handleSecondBtnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeBtn === 2) return;
    if (secondOnClick) secondOnClick(e);
    setActiveBtn(2);
  };

  return (
    <Wrapper>
      <Tooltip text={"جدول"}>
        <StyledButton $isActive={activeBtn === 1} onClick={handleFirstBtnClick}>
          <Add
            style={{
              width: "30px",
              height: "35px",
            }}
          />
        </StyledButton>
      </Tooltip>
      <div
        style={{
          width: "1px",
          height: "60%",
          background: "#ccc",
          margin: "7px 5px 0",
        }}
      />
      <Tooltip text={"لیست"}>
        <StyledButton
          $isActive={activeBtn === 2}
          onClick={handleSecondBtnClick}
        >
          <List
            style={{
              width: "25px",
              height: "25px",
            }}
          />
        </StyledButton>
      </Tooltip>
    </Wrapper>
  );
};

export default ListGroup;
