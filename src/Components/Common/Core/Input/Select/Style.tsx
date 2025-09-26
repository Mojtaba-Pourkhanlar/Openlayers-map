import { styled } from "styled-components";
import { ReactComponent as Down } from "@/assets/svg/bottom.svg";
import { ReactComponent as Close } from "@/assets/svg/close.svg";

const SelectButton = styled.button<{
  hasvalue: string;
  changedesign: string;
  $chartStyle: boolean;
}>`
  border-radius: ${({ $chartStyle }) => ($chartStyle ? "10px" : "16px")};
  border: ${({ changedesign, theme, $chartStyle }) =>
    $chartStyle
      ? `1px solid ${theme.palette.neutral[200]}`
      : changedesign === "true"
      ? `1px solid ${theme.palette.neutral[300]}`
      : `1px solid ${theme.palette.neutral[100]}`};
  background: ${({ theme, $chartStyle }) =>
    $chartStyle ? theme.palette.neutral[50] : theme.palette.neutral[0]};
  height: ${({ $chartStyle }) => ($chartStyle ? "40px" : "48px")};
  width: 100%;
  text-align: right;
  padding: ${({ $chartStyle }) =>
    $chartStyle ? "8px 12px 12px 5px" : "12px 12px 12px 5px"};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: ${({ hasvalue, theme }) =>
    hasvalue === "true"
      ? theme.palette.neutral[900]
      : theme.palette.neutral[400]};
  &:focus {
    border: ${({ theme }) => `1px solid ${theme.palette.primary[900]}`};
  }
`;

const CustomSelect = styled.div`
  position: relative;
  /* width: 100%; */
  @media (max-width: 768px) {
    width: 100% !important;
  }
`;

const DeleteIcon = styled.span`
  margin-top: -2px;
  cursor: pointer;
`;
const DownIcon = styled(Down)`
  margin: 0px;
  cursor: pointer;
  width: 23px;
  height: 23px;
`;
const CloseIcon = styled(Close)`
  margin: 0px;
  cursor: pointer;
  width: 23px;
  height: 23px;
  & > path {
    fill: #a0a0a0;
  }
`;

const DropdownList = styled.ul<{ isopen: string }>`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  border-radius: 16px;
  max-height: 200px;
  overflow-x: auto;
  border: ${({ theme }) => `1px solid ${theme.palette.neutral[100]}`};
  background: ${({ theme }) => theme.palette.neutral[0]};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.isopen === "true" ? "block" : "none")};
  z-index: 1201;

  &::-webkit-scrollbar {
    height: 3px;
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 16px;
    background-color: #ccc;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const LabelStyle = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-right: 7px;
  margin-bottom: 7px;
`;

const DropdownItem = styled.li`
  padding: 12px;
  font-family: Vazir;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${({ theme }) => theme.palette.neutral[400]};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.palette.secondary[100]};
    color: ${({ theme }) => theme.palette.neutral[900]};

    &:first-child {
      border-radius: 16px 16px 0 0;
    }
    &:last-child {
      border-radius: 0 0 16px 16px;
    }
  }
`;

export {
  SelectButton,
  LabelStyle,
  CustomSelect,
  DeleteIcon,
  DropdownList,
  DropdownItem,
  DownIcon,
  CloseIcon,
};
