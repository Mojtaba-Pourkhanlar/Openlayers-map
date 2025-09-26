import ForgatIMG from "@/assets/images/forgetPass/index.svg";
import { GridContainer, GridRow } from "@/Components/Common/Core/Grid";
import { RootState } from "@/store/interfaces";
import { useSelector } from "react-redux";
import First from "./Stepper/First";
import OtpCode from "./Stepper/OtpCode";
import { GridItemLeft, GridItemRight } from "./style";

const Container = () => {
  const { stepper } = useSelector((state: RootState) => state.root);

  return (
    <GridContainer fluid={true}>
      <GridRow>
        <GridItemRight xs={12} sm={6}>
          {stepper === 1 && <First />}
          {stepper === 2 && <OtpCode />}
        </GridItemRight>
        <GridItemLeft xs={0} sm={6}>
          <div id="image-Container">
            <p>RayCloud</p>
            <img src={ForgatIMG} />
          </div>
        </GridItemLeft>
      </GridRow>
    </GridContainer>
  );
};

export default Container;
