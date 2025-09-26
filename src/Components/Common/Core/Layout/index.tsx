import { ReactNode } from "react";
import { GridCol, GridContainer, GridRow } from "../Grid";
import Header from "./Header";


interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <GridContainer fluid style={{}}>
        <GridRow>
          <GridCol xs={12} style={{ padding: "0px 15px", height: "90vh" }}>
            {children}
          </GridCol>
        </GridRow>
      </GridContainer>
    </>
  );
};

export default Layout;
