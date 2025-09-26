import { ReactComponent as MapIcon } from "@/assets/svg/addnewmapIcon.svg";
import { BtnComponent } from "@/Components/Common/Core/Button";
import Select from "@/Components/Common/Core/Input/Select";
import { processChartData } from "@/Hook";
import { setModal } from "@/store/Actions/Root";
import { RootState } from "@/store/interfaces";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChartContainerStyle,
  GridContainerNewStyle,
  GridItemNewStyle,
  GridItemNewStyleSec,
} from "../../style";
import ShowMap from "../HeatMap/ShowMap";
import Hrms from "./Hrms";
import { BTNMap } from "../HeatMap/Style";
import Tooltip from "@/Components/Common/Core/Tooltip/Basic";

type ChartDataKeys = "navMode" | "measureMode" | "loggingMode" | "systems";
const ContainerChart = ({ data }: any) => {
  const dispatch = useDispatch();
  const modalName = useSelector((state: RootState) => state.root.modal);
  const [right, setRight] = useState<ChartDataKeys>("navMode");
  const [left, setLeft] = useState<ChartDataKeys>("loggingMode");
  const [chartData, setChartData] = useState({
    navMode: {},
    measureMode: {},
    loggingMode: {},
    systems: {},
  });
  const [isShow, setIsShow] = useState(false);
  const options = [
    { value: "navMode", label: "Navigation Mode" },
    { value: "loggingMode", label: "Logging Mode" },
    { value: "measureMode", label: "Measure Mode" },
    { value: "systems", label: "NTRIP Casters" },
  ];

  const handleSelectChange = (item: any) => {
    setRight(item.value as ChartDataKeys);
  };
  const handleSelectChangeSecond = (item: any) => {
    setLeft(item.value as ChartDataKeys);
  };

  const handleShowMap = () => {
    dispatch(
      setModal({
        name: "نمایش نقاط چارت",
        mode: "showPoint",
      })
    );
  };

  return (
    <GridContainerNewStyle>
      <GridItemNewStyle xs={12} lg={6}>
        <ChartContainerStyle>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <Select
              label={""}
              options={options}
              value={right}
              onChange={handleSelectChange}
              changedesign={true}
              clear={() => setRight("navMode")}
              defaultOption={{ value: "navMode", label: "Nav Mode" }}
              dontClose
              style={{
                width: "150px",
                margin: "10px 10px 0 0 ",
              }}
              chartStyle
            />
            <Tooltip text="نمایش روی نقشه">
              <BTNMap
                label={""}
                variant="contained"
                endIcon={
                  <MapIcon
                    style={{
                      width: "45px",
                      height: "45px",
                      margin: "-18px -30px 0 0",
                    }}
                  />
                }
                onClick={() => {
                  setIsShow(false);
                  handleShowMap();
                }}
              />
            </Tooltip>
          </div>
          <div
            style={{
              margin: "0",
              userSelect: "none",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {right === "navMode" && (
              <Hrms data={data} name="navMode" setChartData={setChartData} />
            )}
            {right === "loggingMode" && (
              <Hrms
                data={data}
                name="loggingMode"
                setChartData={setChartData}
              />
            )}
            {right === "measureMode" && (
              <Hrms
                data={data}
                name="measureMode"
                setChartData={setChartData}
              />
            )}
            {right === "systems" && (
              <Hrms data={data} name="systems" setChartData={setChartData} />
            )}
          </div>
        </ChartContainerStyle>
      </GridItemNewStyle>
      <GridItemNewStyleSec xs={12} lg={6}>
        <ChartContainerStyle>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <Select
              label={""}
              options={options}
              value={left}
              onChange={handleSelectChangeSecond}
              changedesign={true}
              clear={() => setLeft("loggingMode")}
              defaultOption={{ value: "loggingMode", label: "Logging Mode" }}
              dontClose
              style={{
                width: "150px",
                margin: "10px 10px 0 0 ",
              }}
              chartStyle
            />
            <Tooltip text="نمایش روی نقشه">
              <BTNMap
                label={""}
                variant="contained"
                endIcon={
                  <MapIcon
                    style={{
                      width: "45px",
                      height: "45px",
                      margin: "-18px -30px 0 0",
                    }}
                  />
                }
                onClick={() => {
                  setIsShow(false);
                  handleShowMap();
                }}
              />
            </Tooltip>
          </div>
          <div
            style={{
              margin: "0",
              userSelect: "none",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {left === "navMode" && (
              <Hrms data={data} name="navMode" setChartData={setChartData} />
            )}
            {left === "loggingMode" && (
              <Hrms
                data={data}
                name="loggingMode"
                setChartData={setChartData}
              />
            )}
            {left === "measureMode" && (
              <Hrms
                data={data}
                name="measureMode"
                setChartData={setChartData}
              />
            )}
            {left === "systems" && (
              <Hrms data={data} name="systems" setChartData={setChartData} />
            )}
          </div>
        </ChartContainerStyle>
      </GridItemNewStyleSec>
      {modalName.name === "نمایش نقاط چارت" && (
        <ShowMap
          heatMapData={
            isShow
              ? processChartData(chartData[left], left)
              : processChartData(chartData[right], right)
          }
          currentMode={isShow ? left : right}
        />
      )}
    </GridContainerNewStyle>
  );
};

export default ContainerChart;
