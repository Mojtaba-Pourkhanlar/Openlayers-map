import styled from "styled-components";

export const StyledGridContainer = styled.div<{ $spacing: number }>`
  box-sizing: border-box;
  display: flex;
  flex-flow: wrap;
  align-items: center;
  margin-top: -8px;
  width: ${({ $spacing }) => `calc(100% + ${$spacing}px)`};
  margin-right: ${({ $spacing }) => -$spacing}px;
  & > div {
    padding-top: ${({ $spacing }) => $spacing}px;
    padding-right: ${({ $spacing }) => $spacing}px;
  }
`;

interface Props {
  $xs?: number;
  $sm?: number;
  $md?: number;
  $lg?: number;
  $xl?: number;
}
export const StyledGridItem = styled.div<Props>`
  -webkit-box-flex: 0;
  flex-grow: 0;
  box-sizing: border-box;
  margin: 0px;
  ${({ theme }) => theme.breakpoints.up(0)} {
    ${({ $xs }) =>
      $xs &&
      `
          width: ${($xs * 100) / 12}%
      `}
  }
  ${({ theme }) => theme.breakpoints.up("sm")} {
    ${({ $sm }) =>
      $sm &&
      `
          width: ${($sm * 100) / 12}%
      `}
  }
  ${({ theme }) => theme.breakpoints.up("md")} {
    ${({ $md }) =>
      $md &&
      `
          width: ${($md * 100) / 12}%
      `}
  }
  ${({ theme }) => theme.breakpoints.up("lg")} {
    ${({ $lg }) =>
      $lg &&
      `
          width: ${($lg * 100) / 12}%
      `}
  }
  ${({ theme }) => theme.breakpoints.up("xl")} {
    ${({ $xl }) =>
      $xl &&
      `
          width: ${($xl * 100) / 12}%
      `}
  }
`;
