import { styled } from "styled-components";
import Box from "../Box";
import { GridCol } from "../Grid";
import IconViewer from "../IconViewer";
import Typography from "../Typography";

interface SidebarWrapperProps {
  issidebaropen: string;
}

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 241, 230, 0.3);
  z-index: 1600;

  div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 150px;
  }
`;
const SidebarWrapper = styled.div`
  margin: -60px 21px 0;
  width: 90px;
  background-color: ${({ theme }) => theme.palette.primary[900]};
  border: 4px solid ${({ theme }) => theme.palette.neutral[0]};
  border-radius: 68px;
  height: 95vh;
  position: relative;
  z-index: 1000;
`;

const SidebarOverlay = styled.div<SidebarWrapperProps>`
  background-color: ${({ theme }) => theme.palette.secondary[100]};
  width: ${({ issidebaropen }) => (issidebaropen === "true" ? "288px" : "0")};
  height: calc(95vh - 85px);
  position: absolute;
  top: 100px;
  margin-bottom: 50px;
  right: 70px;
  border-radius: 69px 0px 0px 69px;
  border: 1px solid ${({ theme }) => theme.palette.secondary[500]};
  z-index: 200;
  transition: width 0.3s ease;
`;

const SidebarContainer = styled.div<SidebarWrapperProps>`
  position: relative;
  opacity: ${({ issidebaropen }) => (issidebaropen === "true" ? "1" : "0")};
  margin: 0 68px;
  z-index: 1000;
  width: fit-content;
  transition: opacity 0.9s ease;

  @media (max-width: 768px) {
    margin: 0 24px;
    width: 85%;
  }
`;
const CloseSidebar = styled.div<SidebarWrapperProps>`
  width: 24px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  height: 24px;
  border-radius: 50px;
  background: ${({ theme }) => theme.palette.neutral[0]};
  z-index: 201;
  position: absolute;
  right: ${({ issidebaropen }) =>
    issidebaropen === "true" ? "343px" : "375px"};
  top: 133px;
  display: ${({ issidebaropen }) =>
    issidebaropen === "true" ? "flex" : "none"};
  transition: right 0.9s ease; /* Add transition to right property */
  @media (max-width: 768px) {
    display: none;
  }
`;

const EmptyBox = styled(Box)`
  width: 24px;
  height: 24px;
  margin: 40px 65px 0 -8px;
`;

const SidebarContent = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 68px;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.42);
  z-index: 1000;
  position: relative;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin: -2px 0 0;
  cursor: pointer;
  color: aliceblue;
`;

const LogoIcon = styled(IconViewer)`
  width: 50px;
  height: 51px;
`;
const SideIcon = styled(IconViewer)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
const BoxStyle = styled(Box)<SidebarWrapperProps>`
  margin: ${({ issidebaropen }) =>
    issidebaropen === "true" ? "85px 65px 0 -8px" : "0"};
  width: ${({ issidebaropen }) => (issidebaropen === "true" ? "24px" : "0")};
`;

const MenuContainer = styled.div<SidebarWrapperProps>`
  width: 24px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  height: 24px;
  border-radius: 50px;
  background: ${({ theme }) => theme.palette.neutral[0]};
  z-index: 10;
  margin: ${({ issidebaropen }) =>
    issidebaropen === "false" ? "40px 65px 0 -8px" : "40px 310px 0 -8px"};
  display: ${({ issidebaropen }) =>
    issidebaropen === "true" ? "none" : "flex"};
`;

const MenuItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
  height: 73%;
`;

const Circle = styled.div`
  width: 6px;
  height: 6px;
  background: ${({ theme }) => theme.palette.neutral[0]};
  border-radius: 50%;
  margin: -3.5px 21px 0;
`;

const ActiveRoute = styled.div`
  background: rgba(255, 255, 255, 0.23);
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

const SubNav = styled(Typography)`
  color: ${({ theme }) => theme.palette.neutral[700]};
  line-height: 24px;
  font-weight: 400;
  font-size: 14px;
`;

const Hr = styled.div`
  width: 1px;
  height: 78px;
  background: #${({ theme }) => theme.palette.neutral[200]};
  margin-top: 10px;
`;

const MenuSideBar = styled.div`
  display: flex;
  align-items: center;
`;

const HrVertical = styled.div`
  width: 183px;
  height: 1px;
  background: ${({ theme }) => theme.palette.neutral[100]};
`;

const Setting = styled(Typography)`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.neutral[200]};
`;

const BoxIcon = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

// Header
const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.palette.primary[900]};
  height: 70px;
  margin: 0;
  z-index: 0;
  border-radius: 0;

  /* 
    margin: 10px 10px 0px 10px;
  border-radius: 12px;

   */

  @media (max-width: 768px) {
    background-color: ${({ theme }) => theme.palette.primary[900]};
    height: 60px;
    z-index: 0;
    border-radius: 0;
    margin: 0;
  }
`;
const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const BoxContainerMobile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  @media (min-width: 769px) {
    display: none;
  }
`;

const BoxHash = styled.div`
  /* margin-right: 120px; */
  display: flex;
  @media (max-width: 76px) {
    display: none;
  }
`;
const BoxBTN = styled.div`
  button > div {
    &:first-child {
      svg > path {
        stroke: ${({ theme }) => theme.palette.primary[900]};
      }
    }
    &:last-child {
      svg > path {
        fill: ${({ theme }) => theme.palette.primary[900]};
      }
    }
  }
  display: flex;
  align-items: center;
  @media (max-width: 769px) {
    display: none;
  }
`;
const BoxMobile = styled.div`
  display: flex;
  margin: 5px 0 0 10px;
  @media (min-width: 769px) {
    display: none;
  }
`;
const SideResponse = styled(Box)`
  display: none;
  @media (min-width: 769px) {
    display: flex;
  }
`;

const BoxsideMobile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const BoxsideMobileSec = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-right: -10px;
`;

const SidebarOverlayMobile = styled.div<SidebarWrapperProps>`
  background-color: ${({ theme }) => theme.palette.secondary[100]};
  width: ${({ issidebaropen }) => (issidebaropen === "true" ? "270px" : "0")};
  height: 100%;
  position: absolute;
  top: 0px;
  right: ${({ issidebaropen }) => (issidebaropen === "true" ? "0" : "-30px")};
  border-radius: 24px 0px 0px 24px;
  border: 1px solid ${({ theme }) => theme.palette.secondary[500]};
  z-index: 200;
  transition: width 0.3s ease;
  display: flex;
  @media (min-width: 769px) {
    display: none;
  }
`;
const HamMenu = styled(Box)`
  position: absolute;
  top: 18px;
  right: 0px;
  cursor: pointer;
  width: fit-content;
  @media (min-width: 769px) {
    display: none;
  }
`;
const GridColChild = styled(GridCol)`
  height: 100%;
  width: 100%;
  /* margin: 0 10px; */
  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
  }
`;
const GridColMain = styled(GridCol)`
  width: 120px !important;
`;
const BoxLogout = styled(Box)`
  width: 100%;
  text-align: center;
  padding-left: 5px;
  cursor: pointer;
`;

export {
  ActiveRoute,
  BoxBTN,
  BoxContainer,
  BoxContainerMobile,
  BoxHash,
  BoxIcon,
  BoxLogout,
  BoxMobile,
  BoxsideMobile,
  BoxsideMobileSec,
  BoxStyle,
  Circle,
  CloseSidebar,
  EmptyBox,
  GridColChild,
  GridColMain,
  HamMenu,
  HeaderContainer,
  Hr,
  HrVertical,
  LoadingContainer,
  LogoContainer,
  LogoIcon,
  MenuContainer,
  MenuItemsContainer,
  MenuSideBar,
  Setting,
  SidebarContainer,
  SidebarContent,
  SidebarOverlay,
  SidebarOverlayMobile,
  SidebarWrapper,
  SideIcon,
  SideResponse,
  SubNav,
};
