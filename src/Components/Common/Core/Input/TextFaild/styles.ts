import styled from "styled-components";

export const StyledTextInputBox = styled.div<{
  $startIcon: boolean;
  $endIcon: boolean;
  $error?: boolean;
  $disabled?: boolean;
  $password?: boolean;
}>`
  position: relative;
  & svg {
    width: 24px;
    height: 24px;
  }
  ${({ $startIcon }) =>
    $startIcon &&
    `
    & > svg:first-child, > button:first-child {
    margin-right: 12px;
    }
  `}
  ${({ $endIcon }) =>
    $endIcon &&
    `
    & > svg:last-child, > button:last-child {
    margin-left: 12px;
    }
  `}

  & label {
    color: ${({ theme }) => theme.palette.neutral[300]};
    font-size: 12px;
    position: absolute;
    top: -20px;
    right: 15px;
  }
  & input {
    width: inherit;
    height: inherit;
    font-size: 14px;
    padding: 0 12px;
    padding-right: ${({ $password }) => $password && "6px"};
    outline: none;
    border: none;
    background: transparent;
    border-radius: inherit;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    color: ${({ theme }) => theme.palette.neutral[300]};
    &::-webkit-search-cancel-button {
      display: none !important;
    }
    &::placeholder {
      color: ${({ theme }) => theme.palette.neutral[300]};
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    }
    &:focus {
      color: ${({ theme }) => theme.palette.neutral[900]};
    }
  }
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  background: ${({ theme }) => theme.palette.neutral[0]};
  border-radius: 24px;
  border: 1px solid #a0a0a0;
  ${({ $disabled, theme }) =>
    !$disabled &&
    `
    &:hover {
    border-color:${theme.palette.neutral[900]};
    box-shadow: 0px 0px 11px 0px rgba(82, 51, 145, 0.14);
    }
  `}
  &:focus-within {
    border-color: ${({ theme }) => theme.palette.neutral[900]};
    & label {
      color: ${({ theme }) => theme.palette.neutral[900]};
    }
    & p {
      color: ${({ theme }) => theme.palette.neutral[900]};
    }
  }
  input:disabled {
    background: ${({ theme }) => theme.palette.neutral[50]};
  }
  ${({ $error, theme }) =>
    $error &&
    `
    & label {
      color: ${theme.palette.red.dark};
    }
    & input {
      color: ${theme.palette.red.dark} !important;
    }
    & p {
      color: ${theme.palette.red.dark} !important;
    }
    border-color: ${theme.palette.red.dark} !important;
    background: ${theme.palette.red.light}
  `}
`;

export const StyledIconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  outline: 0px;
  border: 0px;
  &:not(:disabled) {
    cursor: pointer;
  }
  &:disabled {
    color: ${({ theme }) => theme.palette.neutral[400]};
  }
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  text-align: center;
  flex: 0 0 auto;
  font-size: 1.5rem;
  padding: 6px;
  border-radius: 50%;
  overflow: visible;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.1);
  }
`;
