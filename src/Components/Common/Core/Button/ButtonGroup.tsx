import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 48px;
  border-radius: 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 8px;
  justify-content: center;
  margin: -10px 0 0 0;
  align-items: center;
  /* background: ${({ theme }) => theme.palette.primary[800]}; */
  ${({ theme }) => theme.breakpoints.down(1050)} {
    height: 48px;
    border-radius: 16px;
  }
`;

const StyledButton = styled.div<{ $isActive: boolean; $isNumber: number }>`
  cursor: pointer;
  width: inherit;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  &:first-child {
    margin: 6px 6px 6px -6px;
    border-radius: 0 12px 12px 0;
  }
  &:last-child {
    border-radius: 12px 0 0 12px;
    margin: 6px -6px 6px 6px;
  }
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.palette.primary[900] : theme.palette.primary[600]};
  color: ${({ theme }) => theme.palette.neutral[0]};
  font-size: 14px;
  ${({ theme }) => theme.breakpoints.down(1050)} {
    border-radius: 12px;
    height: 45px;
  }
`;

interface Props {
  firstLabel: string;
  firstOnClick?: React.MouseEventHandler<HTMLDivElement>;
  secondLabel: string;
  secondOnClick?: React.MouseEventHandler<HTMLDivElement>;
  defaultActive?: 1 | 2;
}

const ButtonGroup = ({
  firstLabel,
  firstOnClick,
  secondLabel,
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
      <StyledButton
        $isActive={activeBtn === 1}
        $isNumber={activeBtn}
        onClick={handleFirstBtnClick}
      >
        {firstLabel}
      </StyledButton>
      <StyledButton
        $isNumber={activeBtn}
        $isActive={activeBtn === 2}
        onClick={handleSecondBtnClick}
      >
        {secondLabel}
      </StyledButton>
    </Wrapper>
  );
};

export default ButtonGroup;
