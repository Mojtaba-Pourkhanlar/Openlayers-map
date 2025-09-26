import React, { forwardRef, useState } from "react";
import Typography from "../../Typography";
import SearchIcon from "@/assets/images/icons/search.svg";
import Visibility from "@/assets/images/icons/visibility.svg";
import VisibilityOff from "@/assets/images/icons/visibility-off.svg";
import { StyledIconButton, StyledTextInputBox } from "./styles";
import { useTheme } from "styled-components";

const IconButton = ({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <StyledIconButton {...rest} type="button">
      {children}
    </StyledIconButton>
  );
};

interface CustomProps {
  label?: string;
  startIcon?: any;
  endIcon?: any;
  error?: boolean | undefined;
  helperText?: string | undefined | any;
}
const TextInputRHF = forwardRef(
  (
    {
      label,
      startIcon,
      endIcon,
      style,
      onClick,
      error,
      helperText,
      disabled,
      type,
      className,
      ...rest
    }: CustomProps & React.InputHTMLAttributes<HTMLInputElement>,
    ref
  ) => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);

    return (
      <>
        <StyledTextInputBox
          $startIcon={startIcon !== undefined || type === "search"}
          $endIcon={endIcon !== undefined || type === "password"}
          $error={error}
          $disabled={disabled}
          $password={type === "password"}
          className={className}
          onClick={onClick}
          style={style}
        >
          {type === "search" && <img src={SearchIcon} />}
          {startIcon && startIcon}
          {label && <label>{label}</label>}
          <input
            {...rest}
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            disabled={disabled}
            ref={ref as any}
            className="textInput"
          />
          {endIcon && endIcon}
          {type === "password" && (
            <IconButton onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? (
                <img
                  src={Visibility}
                  style={{ width: "24px", opacity: "0.3" }}
                />
              ) : (
                <img
                  src={VisibilityOff}
                  style={{ width: "24px", opacity: "0.3" }}
                />
              )}
            </IconButton>
          )}
        </StyledTextInputBox>
        {helperText !== undefined && (
          <Typography
            style={{
              margin: "2px 14px -16px",
              color: error
                ? theme.palette.red.dark
                : theme.palette.neutral[900],
              fontSize: "14px",
            }}
          >
            {helperText}
          </Typography>
        )}
      </>
    );
  }
);

export default TextInputRHF;
