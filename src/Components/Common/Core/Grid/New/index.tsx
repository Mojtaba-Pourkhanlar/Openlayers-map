import React from "react";
import { StyledGridContainer, StyledGridItem } from "./styles";

interface GridContainerProps {
  spacing?: number;
  children?: React.ReactNode;
}
export const GridContainerNew = ({
  spacing = 16,
  children,
  ...rest
}: GridContainerProps & React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <StyledGridContainer $spacing={spacing} {...rest}>
      {children}
    </StyledGridContainer>
  );
};

interface GridItemProps {
  /**extra-small: 320px */
  xs?: number;
  /**small: 768px */
  sm?: number;
  /**medium: 1024px */
  md?: number;
  /**large: 1200px */
  lg?: number;
  /**extra-large: 1440px */
  xl?: number;
  children?: React.ReactNode;
}
export const GridItemNew = ({
  xs = 12,
  sm,
  md,
  lg,
  xl,
  children,
  ...rest
}: GridItemProps & React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <StyledGridItem $xs={xs} $sm={sm} $md={md} $lg={lg} $xl={xl} {...rest}>
      {children}
    </StyledGridItem>
  );
};
