import { selectData } from "@/Hook";
import { useEffect, useMemo, useRef } from "react";
import { BoxChart } from "../../style";
import { ReportBarChart } from "./BarChart";

const Hrms = ({ data, name, setChartData }: any) => {
  const barDataMode = useMemo(() => selectData({ data, name }), [data, name]);
  const prevDataRef = useRef<any>(null);

  useEffect(() => {
    if (
      JSON.stringify(prevDataRef.current) !==
      JSON.stringify(barDataMode.groupedData)
    ) {
      prevDataRef.current = barDataMode.groupedData;
      if (setChartData) {
        setChartData((prev: any) => ({
          ...prev,
          [name]: barDataMode.groupedData,
        }));
      }
    }
  }, [barDataMode.groupedData, name, setChartData]);

  return (
    <BoxChart $test={!!barDataMode?.groupedData?.DISABLE}>
      <ReportBarChart
        padding={0.8}
        data={barDataMode?.chartData}
        maxValue={barDataMode?.max + (barDataMode?.max * 10) / 100}
        indexBy={"Name"}
        keys={["Count"]}
        color={"rgb(139, 138, 138)"}
      />
    </BoxChart>
  );
};

export default Hrms;
