import React, { useCallback, useEffect, useState } from "react";
// Style
import {
  BoxDrawerActive,
  BoxDrawings,
  DrawerStyle,
  ShowItemsStyle,
} from "../../Style";
// Icon
import { DrawerDataItem } from "@/Interfaces";
import Arc from "@/assets/png/arcPNG.png";
import { ReactComponent as Circle } from "@/assets/svg/circle.svg";
import { ReactComponent as Union } from "@/assets/svg/union.svg";
import Tooltip from "@/Components/Common/Core/Tooltip";

interface Props {
  drawer: string;
  setDrawer: (name: string) => void;
  state: { selectedGeometryType: string };
  handleGeometryTypeChange: any;
  drawerData: DrawerDataItem[];
  isEditMode: boolean;
  editCoordinates: () => void;
  setState: any;
  setIsEditMode: any;
  openJson: boolean;
}

const MapDrawer = ({
  drawer,
  setDrawer,
  state,
  handleGeometryTypeChange,
  drawerData,
  isEditMode,
  editCoordinates,
  setState,
  setIsEditMode,
  openJson,
}: Props) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const editHandler = useCallback(() => {
    if (isEditMode) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [isEditMode]);

  const renderDrawerButton = useCallback(
    (type: string, IconComponent: any, tooltip: string) => (
      <>
        <Tooltip text={tooltip}>
          <BoxDrawerActive
            $show={drawer === type}
            onClick={() => {
              setDrawer(type);
              editHandler();
            }}
            style={{ padding: "3px 5px" }}
          >
            {IconComponent}
          </BoxDrawerActive>{" "}
        </Tooltip>
      </>
    ),
    [drawer, setDrawer, editHandler, openJson]
  );
  console.log("drawerData", drawerData);
  return (
    <>
      <DrawerStyle>
        <ShowItemsStyle $isColumn={openJson}>
          <BoxDrawings $isColumn={openJson}>
            {renderDrawerButton("rectAngle", <Union />, "ترسیم مستطیل")}
            {renderDrawerButton(
              "circleThreePoint",
              <Circle />,
              "ترسیم دایره با سه نقطه"
            )}
            {renderDrawerButton(
              "arcThreePoint",
              <img src={Arc} style={{ width: "20px" }} />,
              "ترسیم نیم دایره با سه نقطه"
            )}
            {drawerData.map((geometryType: DrawerDataItem) => (
              <React.Fragment key={geometryType.name}>
                <Tooltip text={geometryType.tooltip}>
                  <BoxDrawerActive
                    $show={
                      state.selectedGeometryType === geometryType.name &&
                      drawer === ""
                    }
                    onClick={() =>
                      handleGeometryTypeChange(
                        geometryType.name,
                        setDrawer,
                        setState,
                        isEditMode,
                        setShowAlert
                      )
                    }
                    style={{
                      padding:
                        state.selectedGeometryType === "LineString"
                          ? "3px 6px"
                          : "",
                    }}
                  >
                    {geometryType.icon}
                  </BoxDrawerActive>{" "}
                </Tooltip>
              </React.Fragment>
            ))}
          </BoxDrawings>
        </ShowItemsStyle>
      </DrawerStyle>
    </>
  );
};

export default MapDrawer;
