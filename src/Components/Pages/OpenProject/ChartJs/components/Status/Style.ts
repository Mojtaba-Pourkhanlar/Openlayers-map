import styled from "styled-components";

export const Container = styled.div`
  background: rgb(255, 255, 255);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid #cfcfd0;
  height: 750px;
  width: 100%;
  padding: 20px;
  flex-grow: 0;
  flex-basis: auto;
  border-radius: 16px;
  margin: 0 0 50px 0;
  @media (max-width: 1360px) {
    display: none;
  }
`;
export const ContainerSEC = styled.div`
  background: rgb(255, 255, 255);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid #cfcfd0;
  width: 100%;
  padding: 10px 20px;
  flex-grow: 0;
  flex-basis: auto;
  border-radius: 16px;
  height: "auto";
  transition: height 0.4s ease;

  @media (min-width: 1360px) {
    display: none;
  }
  @media (max-width: 980px) {
    display: none;
  }
`;
export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 15px;
  z-index: 100;
  & > div {
    padding: 0 10px;
    border-radius: 12px 12px 0 0;
    height: 14px;
    margin: -7px 0 0 0;
  }
  @media (min-width: 980px) {
    display: none;
  }
`;
export const MobileView = styled.div`
  position: relative;
  display: flex;
  align-items: start;
  justify-content: center;
  gap: 16px;
`;

export const ContainerSECMobile = styled.div<{ $isShow: boolean }>`
  background: rgb(255, 255, 255);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid #cfcfd0;
  width: 100%;
  padding: 10px 20px;
  flex-grow: 0;
  flex-basis: auto;
  border-radius: 16px;
  height: ${({ $isShow }) => ($isShow ? "470px" : "180px")};
  transition: height 0.4s ease;
  display: flex;
  align-items: start;
  justify-content: space-between;
  & > div {
    width: 45%;
  }
  @media (min-width: 980px) {
    display: none;
  }
`;
