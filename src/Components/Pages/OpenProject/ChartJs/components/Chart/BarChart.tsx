import React from "react";
import { ResponsiveBar } from "@nivo/bar";

interface ReportBarChartProps {
  data: Array<Record<string, any>>;
  indexBy: string;
  keys: string[];
  padding: number;
  color: string;
  maxValue: number;
}

export const ReportBarChart: React.FC<ReportBarChartProps> = ({
  data,
  indexBy,
  keys,
  padding,
  color,
  maxValue,
}) => {
  const barColor = color;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveBar
        data={data}
        keys={keys}
        padding={padding}
        margin={{
          top: 15,
          right: 20,
          bottom: 40,
          left: 40,
        }}
        enableTotals={true}
        enableGridX={false}
        enableGridY={true}
        indexBy={indexBy}
        enableLabel={true}
        colors={[barColor]}
        borderRadius={2}
        axisTop={null}
        axisRight={null}
        maxValue={maxValue}
        axisBottom={{
          tickSize: 10,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: 60,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 20,
          tickRotation: 0,
          legend: "تعداد",
          legendPosition: "middle",
          legendOffset: -45,
        }}
        isInteractive={false}
        labelTextColor={{ from: "color", modifiers: [["opacity", 0]] }}
      />
    </div>
  );
};
