import React, { HTMLAttributes, ReactNode } from "react";
import Button, { ButtonProps } from "react-bootstrap/Button";
import IconViewer from "../IconViewer";
import { useTheme } from "styled-components";

interface BtnIcon extends ButtonProps {
  lable: string;
  src: string;
  alt: string;
  style?: React.CSSProperties;
}
interface BtnComponentProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  variant: "outline" | "contained" | "text";
  color?: string;
  style?: React.CSSProperties;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  disabled?: boolean;
  type?: any;
}

export const BtnComponent: React.FC<BtnComponentProps> = ({
  label,
  style,
  variant,
  color,
  startIcon,
  endIcon,
  type = "button",
  disabled = false,
  ...rest
}) => {
  const theme = useTheme().palette;
  let btnStyle;
  switch (variant) {
    case "outline":
      btnStyle = { border: `1px solid ${color}`, color: color };
      break;
    case "text":
      btnStyle = { border: "none", color: color };
      break;
    case "contained":
      btnStyle = { border: "none", backgroundColor: color, color: "#FFF" };
      break;
    default:
      break;
  }

  const customStyle: React.CSSProperties = {
    ...(btnStyle as React.CSSProperties),
    width: "100%",
    height: "48px",
    padding: "12px",
    borderRadius: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...style,
  };

  if (disabled) {
    // Customize the background color when the button is disabled
    if (variant === "outline") {
      customStyle.color = theme.neutral[300];
      customStyle.border = "1px solid #A0A0A0";
    } else if (variant === "text") {
      customStyle.backgroundColor = "transparent";
      customStyle.color = theme.neutral[300];
      customStyle.border = "none";
    } else if (variant === "contained") {
      // customStyle.border = '1px solid #CFCFD0';
      // customStyle.backgroundColor = '#F6F6F6';
      // customStyle.color = '#A0A0A0';
    }
    customStyle.cursor = "not-allowed";
  }
  return (
    <button
      style={customStyle as React.CSSProperties}
      disabled={disabled}
      type={type}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {startIcon && (
        <div style={{ marginLeft: "8px", width: "16px", height: "16px" }}>
          {startIcon}
        </div>
      )}
      <p style={{ margin: 0, padding: 0 }}>{label}</p>
      {endIcon && (
        <div style={{ marginRight: "8px", width: "16px", height: "16px" }}>
          {endIcon}
        </div>
      )}
    </button>
  );
};

export const BtnIcon = ({ src, alt, style, lable, ...rest }: BtnIcon) => {
  return (
    <Button {...rest}>
      <p style={{ margin: 0, padding: 0 }}>{lable}</p>
      <IconViewer src={src} alt={alt} style={style} />
    </Button>
  );
};

/* 
_ for example : 
    // Assuming the SVG file is in the same directory
    import SendIcon from '@/assets/search.svg';
    <BtnIcon lable="Demo" src={SendIcon} alt="SendIcon" style={{ width: "20px" }} />
_ for example : 
    import { BtnComponent } from "../Button";
    <BtnComponent disabled={true} endIcon={Refresh} label="برای تست" variant="contained" color="#0B233F" onClick={clickHandler} style={{ marginTop: "20px" }} />
*/
