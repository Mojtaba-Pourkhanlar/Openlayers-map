import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 48px;
  border-radius: 24px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 8px;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.palette.primary[500]};
  ${({ theme }) => theme.breakpoints.down(1050)} {
    background: ${({ theme }) => theme.palette.primary[900]};
    height: 48px;
    border-radius: 12px;
  }
`;

const StyledButton = styled.div<{ $isActive: boolean }>`
  cursor: pointer;
  width: inherit;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  &:first-child {
    margin: 6px 6px 6px 0;
  }
  &:last-child {
    margin: 6px 0 6px 6px;
  }
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.palette.primary[900] : "inherit"};
  color: ${({ theme }) => theme.palette.neutral[0]};
  font-size: 14px;
  border-radius: 24px;
  ${({ theme }) => theme.breakpoints.down(1050)} {
    border-radius: 12px;
    height: 37px;
  }
`;

interface Props {
  firstLabel: string;
  firstOnClick?: React.MouseEventHandler<HTMLDivElement>;
  secondLabel: string;
  secondOnClick?: React.MouseEventHandler<HTMLDivElement>;
}

const ButtonGroup = ({
  firstLabel,
  firstOnClick,
  secondLabel,
  secondOnClick,
}: Props) => {
  const [activeBtn, setActiveBtn] = useState<1 | 2>(1);

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
      <StyledButton $isActive={activeBtn === 1} onClick={handleFirstBtnClick}>
        {firstLabel}
      </StyledButton>
      <StyledButton $isActive={activeBtn === 2} onClick={handleSecondBtnClick}>
        {secondLabel}
      </StyledButton>
    </Wrapper>
  );
};

export default ButtonGroup;
