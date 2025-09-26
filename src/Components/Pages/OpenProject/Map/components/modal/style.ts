import Box from "@/Components/Common/Core/Box";
import styled from "styled-components";

export const BoxView = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 2px 0 20px 0px;
  &::-webkit-scrollbar {
    height: 3px;
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 24px;
    background-color: ${({ theme }) => theme.palette.neutral[300]};
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  @media (max-width: 990px) {
    flex-direction: column;
    max-height: 600px;
    overflow-y: auto;
  }
`;
export const Container = styled.div`
  background: rgb(255, 255, 255);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid #cfcfd0;
  height: auto;
  width: 99%;
  padding: 10px 20px;
  flex-grow: 0;
  flex-basis: auto;
  border-radius: 16px;
`;
export const BoxCard = styled(Box)`
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.neutral[100]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
`;

export const BoxCardChild = styled(Box)<{ $index: number }>`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  width: 180px;
  padding: 9px 0;
  color: ${({ theme }) => theme.palette.neutral[600]};
  /* border-radius: ${({ $index }) =>
    $index === 0 ? "12px 12px 0 0" : $index === 15 ? "0 0 12px 12px" : "0"}; */
  background-color: ${({ theme, $index }) => theme.palette.neutral[100]};

  @media (max-width: 480px) {
    width: 120px;
  }
`;

export const BoxCardChildRes = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  padding: 7px 0;
  width: calc(100% - 180px);

  @media (max-width: 480px) {
    width: calc(100% - 120px);
  }
`;

export const BoxShowItem = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #ced3d9;
  padding: 2px 0px;
  cursor: pointer;
  /* background-color: red; */
  /* &:nth-child(odd) {
    background-color: ${({ theme }) => theme.palette.neutral[100]};
  }
  &:hover {
    background-color: ${({ theme }) => theme.palette.neutral[200]};
  } */
`;
