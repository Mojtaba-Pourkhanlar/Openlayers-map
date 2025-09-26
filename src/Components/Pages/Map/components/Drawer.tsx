// Icons
import { ReactComponent as Circle } from "@/assets/svg/circle.svg";
import { ReactComponent as Services } from "@/assets/svg/designServices.svg";
import { ReactComponent as Line } from "@/assets/svg/line.svg";
import { ReactComponent as Point } from "@/assets/svg/point.svg";
import { ReactComponent as Polygon } from "@/assets/svg/polygon.svg";
import { ReactComponent as Union } from "@/assets/svg/union.svg";
// Styles
import { BoxDrawerActive, BoxDrawings, BoxHR } from "../../Style";

interface Props {
  drawer: boolean | string;
  setDrawer: any;
}
const Drawer = ({ drawer, setDrawer }: Props) => {
  return (
    <BoxDrawings>
      <BoxDrawerActive
        $show={drawer === "services"}
        onClick={() => setDrawer("services")}
      >
        <Services />
      </BoxDrawerActive>
      <BoxHR $isColumn={false} />
      <BoxDrawerActive
        $show={drawer === "circle"}
        onClick={() => setDrawer("circle")}
        style={{ padding: "3px 5px" }}
      >
        <Circle />
      </BoxDrawerActive>
      <BoxHR $isColumn={false} />
      <BoxDrawerActive
        $show={drawer === "union"}
        onClick={() => setDrawer("union")}
        style={{ padding: "3px 5px" }}
      >
        <Union />
      </BoxDrawerActive>
      <BoxHR $isColumn={false} />
      <BoxDrawerActive
        $show={drawer === "polygon"}
        onClick={() => setDrawer("polygon")}
      >
        <Polygon />
      </BoxDrawerActive>
      <BoxHR $isColumn={false} />
      <BoxDrawerActive
        $show={drawer === "line"}
        onClick={() => setDrawer("line")}
        style={{ padding: "3px 6px" }}
      >
        <Line />
      </BoxDrawerActive>
      <BoxHR $isColumn={false} />
      <BoxDrawerActive
        $show={drawer === "point"}
        onClick={() => setDrawer("point")}
      >
        <Point />
      </BoxDrawerActive>
    </BoxDrawings>
  );
};

export default Drawer;
