import { FC, ReactNode, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Box: FC<Props> = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};

export default Box;
