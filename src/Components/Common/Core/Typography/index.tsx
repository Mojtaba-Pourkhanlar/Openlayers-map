import React, { ReactNode, CSSProperties } from "react";

interface TypographyProps {
  variant?: "regular" | "bold"; // Add more variants if needed
  style?: CSSProperties;
  fontFamily?: string;
  children: ReactNode;
  [key: string]: any;
}

const Typography: React.FC<TypographyProps> = ({
  variant = "regular",
  style,
  fontFamily,
  children,
  ...rest
}: TypographyProps) => {
  const getFontFamily = () => {
    switch (variant) {
      case "bold":
        return fontFamily || "Vazirmatn-Bold, sans-serif";
      default:
        return fontFamily || "Vazirmatn-Regular, sans-serif";
    }
  };

  const textStyle: CSSProperties = {
    fontFamily: getFontFamily(),
    marginBottom: "0 !important",
    ...style,
  };

  return (
    <p style={textStyle} {...rest}>
      {children}
    </p>
  );
};

export default Typography;
