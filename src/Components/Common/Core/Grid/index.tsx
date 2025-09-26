import { ReactNode } from "react";
import Container, { ContainerProps } from "react-bootstrap/Container";
import Col, { type ColProps } from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface Props extends ColProps {
  children: ReactNode;
}

export const GridCol = ({ children, ...rest }: Props) => {
  return (
    <Col style={{ padding: "0" }} {...rest}>
      {children}
    </Col>
  );
};
interface PropsContainer extends ContainerProps {
  children: ReactNode;
}

export const GridContainer = ({ children, ...rest }: PropsContainer) => {
  return <Container {...rest}>{children}</Container>;
};

export const GridRow = ({ children }: Props) => {
  return <Row>{children}</Row>;
};
