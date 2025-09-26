import styled from "styled-components";
import Typography from "../Typography";
import Box from "../Box";

export const BackDrop = styled.div<{ $show: boolean }>`
  display: none;
  position: fixed;
  z-index: 1300;
  inset: 0px;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.5s;
  ${({ $show }) =>
    $show &&
    `
    opacity:1;
    display: unset;
  `}
`;
export const Container = styled.div`
  width: 100%;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ModalCard = styled.div<any>`
  width: ${({ $width }) => $width}px;
  background: #ffffff;
  border-radius: 24px;

  @media (max-width: 768px) {
    width: 450px;
  }
  @media (max-width: 468px) {
    width: 300px;
  }
`;
export const ModalHeader = styled.div<{ $headerbgcolor: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 15px 20px 10px;
  background-color: ${({ $headerbgcolor }) => $headerbgcolor};
  border-radius: 24px 24px 0 0;
`;

export const TextHeader = styled(Typography)<{ $isDark: boolean }>`
  font-size: 16px;
  color: ${({ theme, $isDark }) =>
    $isDark ? theme.palette.neutral[900] : theme.palette.neutral[0]};
  margin: 0;
`;

export const BoxClose = styled(Box)<{ $isDark: boolean }>`
  border: 1px solid
    ${({ theme, $isDark }) =>
      $isDark ? theme.palette.neutral[900] : theme.palette.neutral[0]};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & > svg > path {
    fill: ${({ theme, $isDark }) =>
      $isDark ? theme.palette.neutral[900] : theme.palette.neutral[0]};
  }
`;
export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  padding-bottom: 24px;
  gap: 30%;
`;
