import { styled } from "styled-components";
import { Dropdown } from "react-bootstrap";

export const SelectInput = styled.div`
  border: ${({ theme }) => `1px solid ${theme.palette.neutral[100]}`};
  display: flex;
  align-items: center;
  height: 44px;
  border-radius: 24px;
  padding: 5px 0;
  width: 100%;
  white-space: nowrap;
`;

export const DropdownContainer = styled(Dropdown)`
  div {
    max-height: 200px !important;
    overflow-y: auto;
    width: 100% !important;
    border: ${({ theme }) => `1px solid ${theme.palette.neutral[100]}`};
    border-radius: 24px;
    margin-top: 10px;
  }
`;

export const StyledCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.neutral[50]};
  padding: 5px 10px;
`;
export const StyledShow = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 5px 0;
  color: ${({ theme }) => theme.palette.neutral[0]};
`;
export const StyledShowContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0 0 0 5px;
  background-color: rgba(222, 239, 247, 1);
  border-radius: 24px;
  padding: 1px 0;
  color: #212121;
`;
export const StyledShowTitle = styled.div`
  padding: 0 10px 0 2px;
  margin: 0;
  font-size: 13px;
`;
