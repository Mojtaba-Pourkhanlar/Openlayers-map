import {
  GridContainerNew,
  GridItemNew,
} from "@/Components/Common/Core/Grid/New";
import { getPointsListForChart } from "@/store/Actions/Map";
import { RootState } from "@/store/interfaces";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ContainerChart from "./components/Chart/Container";
import ContainerHeatMap from "./components/HeatMap/Container";
import Status from "./components/Status";

const Chartjs = () => {
  const dispatch = useDispatch();
  const chart_list = useSelector((state: RootState) => state.map.chart_list);
  const [searchParams] = useSearchParams();
  const guid = searchParams.get("guid");

  useEffect(() => {
    if (
      chart_list?.data?.list?.length === 0 ||
      chart_list?.data?.list === undefined
    ) {
      const data = {
        pageIndex: 1,
        pageSize: 100000,
        guid,
      };
      dispatch(getPointsListForChart(data) as any);
    }
  }, [chart_list]);

  return (
    <GridContainerNew
      style={{
        display: "flex",
        alignItems: "start",
        justifyContent: "space-between",
      }}
    >
      <GridItemNew md={12} xl={2.5}>
        <Status data={chart_list?.data?.list} />
      </GridItemNew>
      <GridItemNew md={12} xl={9.5}>
        <GridContainerNew>
          <GridItemNew xs={12}>
            <ContainerChart data={chart_list?.data?.list} />
          </GridItemNew>
          <GridItemNew xs={12}>
            <ContainerHeatMap data={chart_list?.data?.list} />
          </GridItemNew>
        </GridContainerNew>
      </GridItemNew>
    </GridContainerNew>
  );
};

export default Chartjs;
