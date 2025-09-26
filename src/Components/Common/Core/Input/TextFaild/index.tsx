import { FC, InputHTMLAttributes, useState, ReactNode } from "react";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import styled, { useTheme } from "styled-components";
import Eye from "@/assets/svg/visibility.svg";
import EyeSlash from "@/assets/svg/visibility-off.svg";
import IconViewer from "../../IconViewer";
import Typography from "../../Typography";
import Box from "../../Box";

interface TextInputProps {
  label?: string;
  type: string; // type of the input (e.g., "text", "password", etc.)
  disabled?: boolean;
  error?: string;
  helperText?: string;
  value?: string;
  maxLength?: number;
  iconPosition?: "left" | "right";
  icon?: ReactNode;
}

const StyledFormControl = styled(FormControl)`
  position: relative;
  padding: 12px;
  border-radius: 16px !important;
  border: ${({ theme }) => `1px solid ${theme.palette.neutral[500]}`};
  background: ${({ theme }) => theme.palette.secondary[100]};
  color: ${({ theme }) => theme.palette.neutral[600]};
  height: 48px;
  box-shadow: none !important;

  &::placeholder {
    color: ${({ theme }) => theme.palette.neutral[600]};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &:hover {
    border-color: #0e0e0f !important;
    box-shadow: 0px 0px 11px 0px rgba(172, 214, 236, 0.34);
    background: ${({ theme }) => theme.palette.secondary[100]};
  }

  &:focus-within {
    border: 1px solid #0e0e0f !important;
    background: ${({ theme }) => theme.palette.secondary[100]};
  }

  &:focus-within::placeholder {
    color: #0e0e0f !important;
  }

  ${({ disabled, theme }) =>
    disabled &&
    `
        color: ${theme.palette.neutral[600]};
        border-color: ${theme.palette.neutral[600]} !important;
        background: ${theme.palette.primary[50]} !important;
        &::placeholder {
            color: ${theme.palette.neutral[600]} !important;
        }
    `}

  ${({ error, theme }) =>
    error === "true" &&
    `
        border-color:${theme.palette.red.dark} !important;
        background: ${theme.palette.red.light} !important;
        &::placeholder {
            color:${theme.palette.red.dark} !important;
        }
    `}
`;

const IconContainer = styled.span<{ position: "left" | "right" }>`
  position: absolute;
  top: 55%;
  left: ${(props) => (props.position === "left" ? "15px" : "auto")};
  right: ${(props) => (props.position === "right" ? "15px" : "auto")};
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 200;
`;
const Lable = styled(Form.Label)`
  color: ${({ theme }) => theme.palette.neutral[900]};
  text-align: start;
  font-size: 12px;
  font-weight: 400;
  line-height: normal;
  visibility: ${(props) => (props.visibility ? "visible" : "hidden")};
`;

const TextInput: FC<TextInputProps & InputHTMLAttributes<HTMLInputElement>> = ({
  label,
  icon,
  type,
  value,
  disabled,
  error,
  maxLength,
  helperText,
  iconPosition = "left",
  ...rest
}: TextInputProps) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "0 !important",
        width: "100%",
      }}
    >
      {/* // visibility={isFocused || (value && value.length === 0)} */}
      <Lable>{label}</Lable>
      <InputGroup>
        <StyledFormControl
          type={showPassword ? "text" : type}
          id={label}
          disabled={disabled}
          error={error}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          maxLength={maxLength}
          {...rest}
        />
        {type === "password" && (
          <IconContainer position={iconPosition}>
            <Box onClick={togglePasswordVisibility}>
              {showPassword ? (
                <IconViewer src={Eye} alt={"Eye"} style={{ width: "20px" }} />
              ) : (
                <IconViewer
                  src={EyeSlash}
                  alt={"EyeSlash"}
                  style={{ width: "20px" }}
                />
              )}
            </Box>
          </IconContainer>
        )}
        {icon && <IconContainer position={iconPosition}>{icon}</IconContainer>}
      </InputGroup>
      <Typography
        style={{
          color: theme.palette.red.dark,
          padding: "2px 10px 0",
          fontSize: "14px",
        }}
      >
        {helperText}
      </Typography>
    </Box>
  );
};

export default TextInput;
