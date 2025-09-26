import React, { useCallback, useEffect, useState } from "react";
// Style
import {
  BoxDrawerActive,
  BoxDrawings,
  BoxHR,
  DrawerStyle,
  // ShowAlertStyle,
  ShowItemsStyle,
} from "../../Style";
// import { EditBax } from "../Style";
// Icon
import { DrawerDataItem } from "@/Interfaces";
import Arc from "@/assets/png/arcPNG.png";
import { ReactComponent as Circle } from "@/assets/svg/circle.svg";
// import { ReactComponent as Delete } from "@/assets/svg/deleteMap.svg";
// import { ReactComponent as Edit } from "@/assets/svg/editMap.svg";
import { ReactComponent as Union } from "@/assets/svg/union.svg";

interface Props {
  drawer: string;
  setDrawer: (name: string) => void;
  state: { selectedGeometryType: string };
  handleGeometryTypeChange: any;
  drawerData: DrawerDataItem[];
  isEditMode: boolean;
  handleDeleteSelected: () => void;
  editCoordinates: () => void;
  isDelete: boolean;
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
  handleDeleteSelected,
  editCoordinates,
  isDelete,
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
    (type: string, IconComponent: any, additionalStyle = {}) => (
      <>
        <BoxDrawerActive
          $show={drawer === type}
          onClick={() => {
            setDrawer(type);
            editHandler();
          }}
          style={{ padding: "3px 5px", ...additionalStyle }}
        >
          {IconComponent}
        </BoxDrawerActive>
        {type !== "arcThreePoint" && <BoxHR $isColumn={openJson} />}
      </>
    ),
    [drawer, setDrawer, editHandler, openJson]
  );

  return (
    <>
      <DrawerStyle>
        <ShowItemsStyle $isColumn={openJson}>
          <BoxDrawings $isColumn={openJson}>
            {renderDrawerButton("rectAngle", <Union />)}
            {renderDrawerButton("circleThreePoint", <Circle />)}
            {renderDrawerButton(
              "arcThreePoint",
              <img src={Arc} style={{ width: "20px" }} />
            )}
            {drawerData.map((geometryType: DrawerDataItem) => (
              <React.Fragment key={geometryType.name}>
                <BoxHR $isColumn={openJson} />
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
                </BoxDrawerActive>
              </React.Fragment>
            ))}
          </BoxDrawings>

          {/* <EditBax
            $isColumn={openJson}
            onClick={
              isEditMode && !isDelete
                ? () => {
                    setIsEditMode(false);
                    setShowAlert(false);
                  }
                : editCoordinates
            }
            style={{
              backgroundColor: isEditMode && !isDelete ? "#43a047" : undefined,
            }}
          >
            <Edit />
          </EditBax> */}

          {/* <EditBax
            $isColumn={openJson}
            style={{
              backgroundColor:
                isEditMode ||
                state.selectedGeometryType !== "None" ||
                drawer === "rectAngle" ||
                drawer === "circleThreePoint" ||
                drawer === "arcThreePoint"
                  ? "#ccc"
                  : "#fff",
              cursor:
                isEditMode ||
                state.selectedGeometryType !== "None" ||
                drawer === "rectAngle" ||
                drawer === "circleThreePoint" ||
                drawer === "arcThreePoint"
                  ? "not-allowed"
                  : "pointer",
            }}
            onClick={() => {
              if (
                isEditMode ||
                state.selectedGeometryType !== "None" ||
                drawer === "rectAngle" ||
                drawer === "circleThreePoint" ||
                drawer === "arcThreePoint"
              )
                return;
              handleDeleteSelected();
            }}
          >
            <Delete />
          </EditBax> */}

          {/* <EditBax
            $isColumn={openJson}
            style={{
              backgroundColor: "#0B233F",
              color: "#fff",
              fontSize: "12px",
            }}
          >
            ذخیره
          </EditBax> */}
        </ShowItemsStyle>
      </DrawerStyle>
      {/* <ShowAlertStyle $show={showAlert}>ویرایش را غیرفعال کنید</ShowAlertStyle> */}
    </>
  );
};

export default MapDrawer;
