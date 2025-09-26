// Core
import Checkbox from "@/Components/Common/Core/Input/Checkbox";
// Icons
import { ReactComponent as Top } from "@/assets/svg/top.svg";
// Styles
import {
  BottomIcon,
  BoxInput,
  BoxInputDetail,
  BoxLayer,
  BoxName,
  Hr,
  MenuIcon,
  TextLayerStyle,
  TextStyle,
} from "../../Style";
import { useDispatch } from "react-redux";
import { clearDrawnFeatures } from "@/store/Actions/Map";
import { showData } from "../Hook";
import { useEffect, useState } from "react";

interface Filter {
  open: boolean;
  setOpen: any;
  layers: any;
  setLayers: any;
  getPointData: {
    features: any[];
    type: string;
  };
  drawnFeaturesState: any[];
  setPointData: (getPointData: any) => void;
  utm: any;
  // setIsTest: any;
  sourceDrawnRef: any;
  sourceServerRef: any;
  isEditMode: any;
  setOpenSearch: any;
}

const Filter = ({
  open,
  setOpen,
  layers,
  setLayers,
  getPointData,
  drawnFeaturesState,
  setPointData,
  utm,
  // setIsTest,
  sourceDrawnRef,
  sourceServerRef,
  isEditMode,
  setOpenSearch,
}: Filter) => {
  const [openDetail, setOpenDetail] = useState(false);
  // redux
  const dispatch = useDispatch();
  const handleCheckboxChange = (layerId: number, checked: boolean) => {
    if (drawnFeaturesState) {
      const updatedPointData = {
        features: [...getPointData.features, ...drawnFeaturesState],
        type: "FeatureCollection",
      };
      setPointData(updatedPointData);
      dispatch(clearDrawnFeatures());
      // setIsTest(true);
      sourceDrawnRef?.current?.clear();
      // Add base layer
      const features = showData(updatedPointData, utm);
      sourceServerRef.current?.addFeatures(features);
      // setIsTest(false);
    }
    setLayers((prevLayers: any) =>
      prevLayers.map((layer: any) =>
        layer.id === layerId ? { ...layer, active: checked } : layer
      )
    );
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpenDetail(open);
      }, 200);
    } else {
      setOpenDetail(false);
    }
  }, [open]);

  return (
    <>
      <BoxLayer open={open}>
        <BoxInput
          onClick={() => {
            setOpen(!open);
            setOpenSearch(false);
          }}
        >
          <BoxName>
            <MenuIcon />
            <TextLayerStyle $isOpen={open}>لایه ها</TextLayerStyle>
          </BoxName>
          {open ? <Top /> : <BottomIcon />}
        </BoxInput>
        {openDetail && (
          <BoxInputDetail open={true}>
            <Hr> </Hr>
            {layers.map((layer: any) => (
              <BoxInput
                key={layer.id}
                style={{
                  marginBottom: "10px",
                }}
              >
                <BoxName>
                  <div>{layer.icon}</div>
                  <TextStyle>
                    {layer.name === "LineString"
                      ? "Line"
                      : layer.name === "Polygon"
                      ? "Area"
                      : layer.name}
                  </TextStyle>
                </BoxName>
                <Checkbox
                  label=""
                  checked={layer.active}
                  onChange={(checked) => {
                    if (isEditMode) return;
                    handleCheckboxChange(layer.id, checked);
                  }}
                />
              </BoxInput>
            ))}
          </BoxInputDetail>
        )}
      </BoxLayer>
    </>
  );
};

export { Filter };
