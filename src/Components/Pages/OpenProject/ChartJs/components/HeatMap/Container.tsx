import { ReactComponent as MapIcon } from "@/assets/svg/addnewmapIcon.svg";
import {
  GridContainerNew,
  GridItemNew,
} from "@/Components/Common/Core/Grid/New";
import Select from "@/Components/Common/Core/Input/Select";
import Tooltip from "@/Components/Common/Core/Tooltip/Basic";
import { getAllDistances, getNumbers } from "@/Hook";
import { setModal } from "@/store/Actions/Root";
import { RootState } from "@/store/interfaces";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChartContainerStyle } from "../../style";
import HeatMap from "./HeatMap";
import ShowMap from "./ShowMap";
import { BTNMap } from "./Style";

const metrics = [
  { key: "hrms", label: "HRMS" }, // < green
  { key: "vrms", label: "VRMS" }, // < green
  { key: "pdop", label: "PDOP" }, // < green
  { key: "hdop", label: "HDOP" }, // < green
  { key: "vdop", label: "VDOP" }, // < green
  { key: "age", label: "Age" }, // < green
  { key: "antHeight", label: "Antenna Height" }, // < green
  { key: "numSatTracked", label: "Satellite Tracked" }, // < red
  { key: "numSatUsed", label: "Satellite Used" }, // < red
  { key: "distances", label: "Distances to base" }, // < green
];

type SelectedMetrics = {
  select1: string;
  select2: string;
  select3: string;
};

const ContainerHeatMap = ({ data }: any) => {
  const dispatch = useDispatch();
  const modalName = useSelector((state: RootState) => state.root.modal);
  const [selectedMetrics, setSelectedMetrics] = useState<SelectedMetrics>({
    select1: "hrms",
    select2: "vrms",
    select3: "pdop",
  });

  const [dividerValues, setDividerValues] = useState<Record<string, number>>(
    {}
  );
  const [lineData, setLineData] = useState<
    Record<string, { before: any[]; after: any[] }>
  >({});
  const [metricsData, setMetricsData] = useState<Record<string, any>>({});
  const [getType, setType] = useState<string>("");

  useEffect(() => {
    if (data?.length > 0) {
      const updatedMetrics = metrics.reduce(
        (acc: Record<string, any>, metric) => {
          acc[metric.key] = getNumbers({ data, name: metric.key });
          return acc;
        },
        {}
      );
      const distances = getAllDistances(data);
      if (distances.length > 0) {
        const minDistance = Math.min(...distances);
        const maxDistance = Math.max(...distances);
        updatedMetrics["distances"] = {
          numbers: distances,
          min: +minDistance.toFixed(3).replace(/\.000$/, ""),
          max: +maxDistance.toFixed(3).replace(/\.000$/, ""),
        };
      }
      setMetricsData(updatedMetrics);
    }
  }, [data]);

  const handleSelectChange = (
    selectKey: keyof SelectedMetrics,
    value: string
  ) => {
    setSelectedMetrics((prev) => ({
      ...prev,
      [selectKey]: value,
    }));
  };

  const handleShowMap = (type: string) => {
    setType(type);
    // const currentLineData = lineData[type] || { before: [], after: [] };
    dispatch(
      setModal({
        name: "نمایش نقاط",
        mode: "showPoint",
      })
    );
    // console.log("currentLineData", currentLineData);
  };

  return (
    <GridContainerNew
      style={{
        margin: "-13px -20px 50px 0",
        padding: "0 3px 0 0",
        position: "relative",
      }}
    >
      {[1, 2, 3, 4].map((selectIndex) => {
        const selectKey = `select${selectIndex}` as keyof SelectedMetrics;
        const type = selectedMetrics[selectKey];
        return (
          <GridItemNew md={12} lg={6} key={`select-${selectIndex}`}>
            <ChartContainerStyle
              style={{
                padding: "10px 20px",
                height: "175px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <Select
                  label={``}
                  options={metrics.map((metric) => ({
                    value: metric.key,
                    label: metric.label,
                  }))}
                  value={type}
                  onChange={(item: any) =>
                    handleSelectChange(selectKey, item.value)
                  }
                  defaultOption={{
                    value: metrics[selectIndex - 1].key,
                    label: metrics[selectIndex - 1].label,
                  }}
                  clear={() =>
                    handleSelectChange(selectKey, metrics[selectIndex - 1].key)
                  }
                  dontClose
                  chartStyle
                  style={{
                    width: "160px",
                    margin: "5px -4px 0 0 ",
                  }}
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
                          margin: "-18px -15px 0 0",
                        }}
                      />
                    }
                    onClick={() => handleShowMap(type)}
                  />
                </Tooltip>
              </div>
              <HeatMap
                hrms={metricsData[type] || { numbers: [], min: 0, max: 1 }}
                mainData={data}
                setLineData={(updatedData: any) => setLineData(updatedData)}
                dividerValue={dividerValues[type] || 0}
                setDividerValue={(value: any) =>
                  setDividerValues((prev) => ({
                    ...prev,
                    [type]: value,
                  }))
                }
                type={type}
                getType={getType}
              />
            </ChartContainerStyle>
          </GridItemNew>
        );
      })}
      {modalName.name === "نمایش نقاط" && (
        <ShowMap
          heatMapData={[
            ...(lineData[getType]?.before || []),
            ...(lineData[getType]?.after || []),
          ]}
          dividerValue={dividerValues[getType] || 0}
          type={getType}
        />
      )}
    </GridContainerNew>
  );
};

export default ContainerHeatMap;
