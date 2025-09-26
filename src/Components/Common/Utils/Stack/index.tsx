import React from "react";

interface Props {
  children?: React.ReactNode;
}
const Stack = ({
  children,
  width = "100%",
  flexDirection = "row",
  alignItems = "center",
  justifyContent = "center",
  ...rest
}: Props & Omit<React.CSSProperties, "display">) => {
  return (
    <div
      style={{
        display: "flex",
        width,
        flexDirection,
        justifyContent,
        alignItems,
        ...rest,
      }}
    >
      {children}
    </div>
  );
};

export default Stack;
