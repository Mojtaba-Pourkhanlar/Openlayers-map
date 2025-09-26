import DateConverter from "@/Components/Common/Core/DateConverter";
import Tooltip from "@/Components/Common/Core/Tooltip/Basic";
import { getTranslate } from "@/language";
import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const translate = getTranslate();

interface Props {
  text: string;
  length?: number;
}

export function justTypeNumber(number: any) {
  number = number.replace(/[^0-9]/g, ""); // ignore  Text & characters
  return number;
}

export const convertSize = (size: any) => {
  size = parseInt(size);
  let converted;
  if (size >= 1073741824)
    converted = (size / 1073741824).toFixed(3).replace(/\.000$/, "") + "GB";
  else if (size >= 1048576)
    converted = (size / 1048576).toFixed(3).replace(/\.000$/, "") + "MB";
  else if (size >= 1024)
    converted = (size / 1024).toFixed(3).replace(/\.000$/, "") + "KB";
  else converted = size + "B";
  return converted;
};

export const getHelperText = (label: string, select?: boolean) =>
  `${label} ${select ? translate.helperTextSelect : translate.helperText}`;

export const convertDateNew = (date: any) => {
  const dateObject = new DateObject({
    date: date,
    format: "YYYY/MM/DD HH:mm",
    calendar: persian,
    locale: persian_fa,
  });
  const convertedDate = dateObject
    .convert(gregorian)
    .format("YYYY-MM-DD HH:mm");
  return convertedDate;
};

export const convertDateGregorian = (date: any) => {
  return new DateObject({
    date: date,
    calendar: gregorian,
  })
    .convert(persian)
    .format("YYYY/MM/DD HH:mm");
};

export const transformCoordinates = (data: any) => {
  const coordinates = data.coordinates.map((point: any) => {
    const key = Object.keys(point)[0];
    return [point[key][1], point[key][0]];
  });

  return {
    type: "Feature",
    geometry: {
      type: data.type,
      coordinates: [coordinates],
    },
    properties: {
      name: "Area1",
    },
  };
};

export const transformPointData = (selectedPoint: any) => {
  const feature =
    selectedPoint.status === "updated"
      ? selectedPoint.FeatureAfter
      : selectedPoint.feature;
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: feature.geometry.type,
          coordinates: [
            feature.geometry.coordinates[1], // Lon first
            feature.geometry.coordinates[0], // Lat second
          ],
        },
        properties: {
          name: feature.properties.name,
        },
      },
    ],
  };
};

export const transformLineData = (selectedPoint: any) => {
  const { feature } = selectedPoint;
  const coordinates = feature.geometry.coordinates.map((point: any) => {
    const key = Object.keys(point)[0];
    return [point[key][1], point[key][0]];
  });
  const geometryType = feature.geometry.type;
  if (geometryType === "Polygon" || geometryType === "LineString") {
    const polygonOrLineFeature = {
      type: "Feature",
      geometry: {
        type: geometryType,
        coordinates:
          geometryType === "Polygon"
            ? [[...coordinates, coordinates[0]]]
            : coordinates,
      },
      properties: {
        name: feature.properties.name,
      },
    };

    const pointFeatures = feature.geometry.coordinates?.map(
      (coordinate: { [key: string]: [number, number] }, index: number) => {
        const [name, coords] = Object.entries(coordinate)[0];
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [coords[1], coords[0]],
          },
          properties: {
            name: name,
          },
        };
      }
    );
    return {
      type: "FeatureCollection",
      features: [polygonOrLineFeature, ...pointFeatures],
    };
  }
  return null;
};

export const transformLineDataBefore = (selectedPoint: any) => {
  const { featureBefore } = selectedPoint;
  const coordinates = featureBefore.geometry.coordinates.map((point: any) => {
    const key = Object.keys(point)[0];
    return [point[key][1], point[key][0]];
  });
  const geometryType = featureBefore.geometry.type;
  if (geometryType === "Polygon" || geometryType === "LineString") {
    const polygonOrLineFeature = {
      type: "Feature",
      geometry: {
        type: geometryType,
        coordinates:
          geometryType === "Polygon"
            ? [[...coordinates, coordinates[0]]]
            : coordinates,
      },
      properties: {
        name: featureBefore.properties.name,
      },
    };
    const pointFeatures = featureBefore.geometry.coordinates?.map(
      (coordinate: { [key: string]: [number, number] }, index: number) => {
        const [name, coords] = Object.entries(coordinate)[0];
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [coords[1], coords[0]],
          },
          properties: {
            name: name,
          },
        };
      }
    );
    return {
      type: "FeatureCollection",
      features: [polygonOrLineFeature, ...pointFeatures],
    };
  }
  return null;
};

export const textLength = ({ text, length = 14 }: Props) => {
  const isTextLong = text?.length > length;
  const truncatedText = isTextLong ? text.slice(0, length) + "..." : text;
  return (
    <div
      style={{
        margin: "0 0 0 -10px",
      }}
    >
      {isTextLong ? (
        <Tooltip text={text} position="right">
          <p
            style={{
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {truncatedText}
          </p>
        </Tooltip>
      ) : (
        <p
          style={{
            margin: "0 0 0 -10px",
          }}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export const getNavMode = (name: number) => {
  let result = null;
  if ([1, 11, 21, 31].includes(name)) {
    result = "NONE";
  } else if ([2, 12, 22, 32].includes(name)) {
    result = "AUT";
  } else if ([3, 13, 23, 33].includes(name)) {
    result = "DIFF";
  } else if ([4, 14, 24, 34].includes(name)) {
    result = "FLOAT";
  } else if ([5, 15, 25, 35].includes(name)) {
    result = "FIXED";
  } else {
    result = "OTHERS";
  }
  return result;
};

export const getLoginMode = (name: number) => {
  let result = null;
  if ([0, -1].includes(name)) {
    result = "بدون داده خام";
  } else if ([1].includes(name)) {
    result = "STATIC";
  } else if ([2].includes(name)) {
    result = "STATIC_KINEMATIC";
  } else {
    result = "___";
  }
  return result;
};

export const getMeasureMode = (name: number) => {
  let result = null;
  if ([0].includes(name)) {
    result = "___";
  } else if ([1].includes(name)) {
    result = "Tilt";
  } else if ([2].includes(name)) {
    result = "Topo";
  } else {
    result = "Avg";
  }
  return result;
};

export const calculateStandardDeviation = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  const mean: number =
    numbers.reduce((sum, value) => sum + value, 0) / numbers.length;
  const squaredDifferences: number[] = numbers.map((value) =>
    Math.pow(value - mean, 2)
  );
  const meanSquaredDifference: number =
    squaredDifferences.reduce((sum, value) => sum + value, 0) / numbers.length;
  return Math.sqrt(meanSquaredDifference);
};

export const someData = ({ data, name }: any) => {
  const split: number[] = [];
  // Getting a list of data greater than 0
  for (let i = 0; i < data?.length; i++) {
    if (data[i][name] !== 0) {
      split.push(data[i][name]);
    }
  }
  const sumSattelideUsed = split?.reduce((sum, value) => sum + value, 0);
  return sumSattelideUsed;
};

export const getNumberHandler = ({
  data,
  name = "hrms",
}: {
  data: any[];
  name?: "hrms" | "vrms" | "pdop";
}) => {
  const hrmsValues: number[] = [];
  // Getting a list of numbers greater than 0
  for (let i = 0; i < data?.length; i++) {
    if (data[i][name] !== 0) {
      hrmsValues.push(data[i][name]);
    }
  }
  // get min and max
  const hrmsMin: number = Math.min(...hrmsValues);
  const hrmsMax: number = Math.max(...hrmsValues);
  // get mean
  const hrmsMean: number =
    hrmsValues.reduce((sum, value) => sum + value, 0) / hrmsValues.length;
  // Calculating the standard deviation formula
  const calHrms = calculateStandardDeviation(hrmsValues);
  const b = hrmsMean + 3 * calHrms;
  const bRes = (b - hrmsMin) / 4;
  const a1 = hrmsMin + bRes;
  const a2 = a1 + bRes;
  const a3 = a2 + bRes;
  const minR =
    hrmsValues
      .filter((value) => value >= hrmsMin && value < a1)
      .map((value) => +value.toFixed(5)) ?? 0;
  const a1R =
    hrmsValues
      .filter((value) => value >= a1 && value < a2)
      .map((value) => +value.toFixed(5)) ?? 0;
  const a2R =
    hrmsValues
      .filter((value) => value >= a2 && value < a3)
      .map((value) => value.toFixed(5) ?? 0) ?? 0;
  const a3R =
    hrmsValues
      .filter((value) => value >= a3 && value <= b)
      .map((value) => value.toFixed(5) ?? 0) ?? 0;
  const bR = hrmsValues
    .filter((value) => value >= b && value <= hrmsMax)
    .map((value) => value.toFixed(5) ?? 0);
  const rangeCounts = {
    minR: minR?.length > 0 ? minR : [],
    a1R: a1R?.length > 0 ? a1R : [],
    a2R: a2R?.length > 0 ? a2R : [],
    a3R: a3R?.length > 0 ? a3R : [],
    bR: bR?.length > 0 ? bR : [],
  };

  const result = {
    min: +hrmsMin.toFixed(5),
    max: +hrmsMax.toFixed(5),
    b: b,
    a1: a1,
    a2: a2,
    a3: a3,
    range: rangeCounts,
  };

  return result;
};

export const getNameLength = (name: number) => {
  return name?.toFixed(3);
};

export const barDataName = (name: any) => {
  let chartArray = [
    {
      Name: `${getNameLength(name?.a1)} - ${getNameLength(name?.min)} `,
      Count: name?.range?.minR?.length,
    },
    {
      Name: `${getNameLength(name?.a2)} - ${getNameLength(name?.a1)} `,
      Count: name?.range?.a1R?.length,
    },
    {
      Name: `${getNameLength(name?.a3)} - ${getNameLength(name?.a2)} `,
      Count: name?.range?.a2R?.length,
    },
    {
      Name: `${getNameLength(name?.b)} - ${getNameLength(name?.a3)} `,
      Count: name?.range?.a3R?.length,
    },
  ];

  if (name?.max > name?.b) {
    chartArray.push({
      Name: `${getNameLength(name?.max)} - ${getNameLength(name?.b)} `,
      Count: name?.range?.bR?.length,
    });
  }

  return chartArray;
};

export const calculateNavModes = (list: any) => {
  const navModeCounts: any = {
    NONE: 0,
    AUT: 0,
    DIFF: 0,
    FLOAT: 0,
    FIXED: 0,
    OTHERS: 0,
  };
  list?.forEach((item: any) => {
    const mode = getNavMode(item.navMode);
    if (navModeCounts[mode] !== undefined) {
      navModeCounts[mode]++;
    }
  });
  return navModeCounts;
};
export const calculateLoginMode = (list: any) => {
  const loggingModeCounts: any = {
    DISABLE: 0,
    STATIC: 0,
    STATIC_KINEMATIC: 0,
  };
  list?.forEach((item: any) => {
    const mode = getLoginMode(item.loggingMode);
    if (loggingModeCounts[mode] !== undefined) {
      loggingModeCounts[mode]++;
    }
  });
  return loggingModeCounts;
};
export const getNavModeChart = (data: any) => {
  const getData = calculateNavModes(data);
  const numbers = [
    getData.NONE,
    getData.AUT,
    getData.DIFF,
    getData.FLOAT,
    getData.FIXED,
    getData.OTHERS,
  ];
  const maxNumber = Math.max(...numbers);
  let chartArray = [
    {
      Name: "NONE",
      Count: getData.NONE,
    },
    {
      Name: "AUT",
      Count: getData.AUT,
    },
    {
      Name: "DIFF",
      Count: getData.DIFF,
    },
    {
      Name: "FLOAT",
      Count: getData.FLOAT,
    },
    {
      Name: "FIXED",
      Count: getData.FIXED,
    },
    {
      Name: "OTHERS",
      Count: getData.OTHERS,
    },
  ];
  return { chartArray, maxNumber };
};
export const getLoginModeChart = (data: any) => {
  const getData = calculateLoginMode(data);
  const numbers = [getData.DISABLE, getData.STATIC, getData.STATIC_KINEMATIC];
  const maxNumber = Math.max(...numbers);
  let chartArray = [
    {
      Name: "NONE",
      Count: getData.DISABLE, // blue
    },
    {
      Name: "STATIC",
      Count: getData.STATIC, // green
    },
    {
      Name: "KINEMATIC",
      Count: getData.STATIC_KINEMATIC, // black
    },
  ];
  return { chartArray, maxNumber };
};
export const calculateMeasureMode = (list: any) => {
  const split: number[] = [];
  // Getting a list of numbers greater than 0
  for (let i = 0; i < list?.length; i++) {
    if (list[i]["navMode"] !== 0) {
      const result = list[i]["navMode"] / 10;
      split.push(result);
    }
  }
  const measureModeCounts: any = {
    Tilt: 0,
    Topo: 0,
    Avg: 0,
  };
  split?.forEach((item: any) => {
    const mode = getMeasureMode(item / 10);
    if (measureModeCounts[mode] !== undefined) {
      measureModeCounts[mode]++;
    }
  });
  return measureModeCounts;
};
export const getSystemMode = (name: string) => {
  let result = null;
  if (["178.252.173.15"].includes(name)) {
    result = "Shamim";
  } else if (["178.252.173.75"].includes(name)) {
    result = "ShamimPlus";
  } else if (["81.28.51.60"].includes(name)) {
    result = "Sahab";
  } else if (["185.4.29.24"].includes(name)) {
    result = "HodaPro";
  } else if (["217.218.133.180"].includes(name)) {
    result = "Hoda";
  } else if (["5.252.216.40"].includes(name)) {
    result = "Mashhad";
  } else if (["31.24.236.8"].includes(name)) {
    result = "Samt";
  } else {
    result = "OTHERS";
  }
  return result;
};
export const calculateSystem = (list: any) => {
  const split: number[] = [];
  // Getting a list of numbers greater than 0
  for (let i = 0; i < list?.length; i++) {
    if (list[i]["casterIp"] !== 0) {
      split.push(list[i]["casterIp"]);
    }
  }
  const measureModeCounts: any = {
    Shamim: 0,
    ShamimPlus: 0,
    Sahab: 0,
    HodaPro: 0,
    Hoda: 0,
    Mashhad: 0,
    Samt: 0,
    OTHERS: 0,
  };
  split?.forEach((item: any) => {
    const mode: any = getSystemMode(item);
    if (measureModeCounts[mode] !== undefined) {
      measureModeCounts[mode]++;
    }
  });
  return measureModeCounts;
};
export const getMeasureChart = (data: any) => {
  const getData = calculateMeasureMode(data);
  const numbers = [getData.Tilt, getData.Topo, getData.Avg];
  const maxNumber = Math.max(...numbers);
  let chartArray = [
    {
      Name: "Tilt",
      Count: getData.Tilt, // blue
    },
    {
      Name: "Topo",
      Count: getData.Topo, // green
    },
    {
      Name: "Average ",
      Count: getData.Avg, // black
    },
  ];
  return { chartArray, maxNumber };
};
export const getSystemsChart = (data: any) => {
  const getData = calculateSystem(data);
  const numbers = [
    getData.Shamim,
    getData.ShamimPlus,
    getData.Sahab,
    getData.HodaPro,
    getData.Hoda,
    getData.Mashhad,
    getData.Samt,
    getData.OTHERS,
  ];
  const maxNumber = Math.max(...numbers);
  let chartArray = [
    {
      Name: "ShamimPlus",
      Count: getData.ShamimPlus, // black
    },
    {
      Name: "Hoda",
      Count: getData.Hoda, // blue
    },
    {
      Name: "HodaPro",
      Count: getData.HodaPro, // violet
    },
    {
      Name: "Shamim",
      Count: getData.Shamim, // green
    },
    {
      Name: "Sahab",
      Count: getData.Sahab, // orange
    },
    {
      Name: "Mashhad",
      Count: getData.Mashhad, // red
    },
    {
      Name: "Samt",
      Count: getData.Samt, // yellow
    },
    {
      Name: "Not Connected",
      Count: getData.OTHERS,
    },
  ];
  return { chartArray, maxNumber };
};

const colorNavMode: any = {
  NONE: "darkred",
  AUT: "red",
  DIFF: "orange",
  FLOAT: "yellow",
  FIXED: "green",
  OTHERS: "#403280",
};
const colorLoginMode: any = {
  DISABLE: "blue",
  STATIC: "green",
  STATIC_KINEMATIC: "black",
};
const colorMeasureMode: any = {
  Tilt: "blue",
  Topo: "green",
  Avg: "black",
};
const colorSystemMode: any = {
  Shamim: "green",
  ShamimPlus: "black",
  Sahab: "orange",
  HodaPro: "violet",
  Hoda: "blue",
  Mashhad: "red",
  Samt: "yellow",
  OTHERS: "#896234",
};
const groupDataByNavMode = (data: any) => {
  const groupedData: any = {
    NONE: [],
    AUT: [],
    DIFF: [],
    FLOAT: [],
    FIXED: [],
    OTHERS: [],
  };
  data?.forEach((item: any) => {
    const mode = getNavMode(item.navMode);
    if (groupedData[mode]) {
      groupedData[mode].push({
        id: item.id,
        name: item.name,
        lat: item.lat,
        lon: item.lon,
        color: colorNavMode[mode],
        lable: "NavMode",
      });
    } else {
      groupedData.OTHERS.push({
        id: item.id,
        name: item.name,
        lat: item.lat,
        lon: item.lon,
        color: colorNavMode[mode],
        lable: "NavMode",
      });
    }
  });
  return groupedData;
};
const groupDataByLoginMode = (data: any) => {
  const groupedData: any = {
    DISABLE: [],
    STATIC: [],
    STATIC_KINEMATIC: [],
  };
  data?.forEach((item: any) => {
    const mode = getLoginMode(item.loggingMode);
    if (groupedData[mode]) {
      groupedData[mode].push({
        id: item.id,
        name: item.name,
        lat: item.lat,
        lon: item.lon,
        color: colorLoginMode[mode],
        lable: "LoginMode",
      });
    }
  });
  return groupedData;
};
const groupDataByMeasureMode = (data: any) => {
  const groupedData: any = {
    Tilt: [],
    Topo: [],
    Avg: [],
  };
  data?.forEach((item: any) => {
    const mode = getMeasureMode(item.navMode / 10);
    if (groupedData[mode]) {
      groupedData[mode].push({
        id: item.id,
        name: item.name,
        lat: item.lat,
        lon: item.lon,
        color: colorMeasureMode[mode],
        lable: "MeasureMode",
      });
    }
  });
  return groupedData;
};
const groupDataBySystemsMode = (data: any) => {
  const groupedData: any = {
    Shamim: [],
    ShamimPlus: [],
    Sahab: [],
    HodaPro: [],
    Hoda: [],
    Mashhad: [],
    Samt: [],
    OTHERS: [],
  };
  data?.forEach((item: any) => {
    const mode: any = getSystemMode(item.casterIp);
    if (groupedData[mode]) {
      groupedData[mode].push({
        id: item.id,
        name: item.name,
        lat: item.lat,
        lon: item.lon,
        color: colorSystemMode[mode],
        lable: "SystemsMode",
      });
    }
  });
  return groupedData;
};
export const processChartData = (data: any, mode: string) => {
  switch (mode) {
    case "navMode":
      return [
        ...data.NONE,
        ...data.AUT,
        ...data.DIFF,
        ...data.FLOAT,
        ...data.FIXED,
        ...data.OTHERS,
      ];
    case "measureMode":
      return [...data.Tilt, ...data.Topo, ...data.Avg];
    case "loggingMode":
      return [...data.DISABLE, ...data.STATIC, ...data.STATIC_KINEMATIC];
    case "systems":
      return [
        ...data.Shamim,
        ...data.ShamimPlus,
        ...data.Sahab,
        ...data.HodaPro,
        ...data.Hoda,
        ...data.Mashhad,
        ...data.Samt,
        ...data.OTHERS,
      ];
    default:
      return {};
  }
};
export const selectData = ({ data, name }: any) => {
  let max: number = 0;
  let chartData: any[] = [];
  let groupedData: any = {};
  if (name === "navMode") {
    const demo = getNavModeChart(data);
    groupedData = groupDataByNavMode(data);
    chartData = demo.chartArray;
    max = demo.maxNumber;
  } else if (name === "measureMode") {
    const demo = getMeasureChart(data);
    groupedData = groupDataByMeasureMode(data);
    chartData = demo.chartArray;
    max = demo.maxNumber;
  } else if (name === "loggingMode") {
    const demo = getLoginModeChart(data);
    groupedData = groupDataByLoginMode(data);
    chartData = demo.chartArray;
    max = demo.maxNumber;
  } else if (name === "systems") {
    const demo = getSystemsChart(data);
    groupedData = groupDataBySystemsMode(data);
    chartData = demo.chartArray;
    max = demo.maxNumber;
  }
  return {
    max,
    chartData,
    groupedData,
  };
};
export const getNumbers = ({
  data,
  name = "hrms",
}: {
  data: any[];
  name?: string;
}) => {
  const allNumber: number[] = [];
  // Getting a list of numbers greater than 0
  for (let i = 0; i < data?.length; i++) {
    if (data[i][name] !== 0) {
      allNumber.push(data[i][name]);
    }
  }
  // get min and max
  const V_Min: number = Math.min(...allNumber);
  const V_Max: number = Math.max(...allNumber);
  const All_number: number[] = allNumber;
  return {
    min: +V_Min.toFixed(3).replace(/\.000$/, ""),
    max: +V_Max.toFixed(3).replace(/\.000$/, ""),
    numbers: All_number,
  };
};
function deg2rad(deg: number): number {
  return (deg * Math.PI) / 180;
}
export function calculateDistance({
  lat,
  lon,
  baseLat,
  baseLon,
}: {
  lat: number;
  lon: number;
  baseLat: number;
  baseLon: number;
}): number {
  const a = 6378137;
  const radLat = deg2rad(lat);
  const radLon = deg2rad(lon);
  const radBaseLat = deg2rad(baseLat);
  const radBaseLon = deg2rad(baseLon);

  const result =
    a *
    Math.acos(
      Math.sin(radBaseLat) * Math.sin(radLat) +
        Math.cos(radBaseLat) * Math.cos(radLat) * Math.cos(radBaseLon - radLon)
    );
  return Math.round(result / 1000);
}
export function getAllDistances(
  data: Array<{
    lat: number;
    lon: number;
    baseLat: number;
    baseLon: number;
  }>
): number[] {
  const distances: number[] = [];
  if (!data || data.length === 0) return distances;
  for (let i = 0; i < data.length; i++) {
    const { lat, lon, baseLat, baseLon } = data[i];
    let distance: any;
    if (baseLat !== 0 && baseLon !== 0) {
      distance = calculateDistance({ lat, lon, baseLat, baseLon });
      distances.push(distance);
    }
  }
  return distances;
}

export const customNavModeLable = [
  { color: "darkred", name: "NONE" },
  { color: "red", name: "AUT" },
  { color: "orange", name: "DIFF" },
  { color: "yellow", name: "FLOAT" },
  { color: "green", name: "FIXED" },
  { color: "#403280", name: "Others" },
];
export const customMeasureModeLable = [
  { color: "blue", name: "Tilt" },
  { color: "green", name: "Topo" },
  { color: "black", name: "Avg" },
];
export const customLoginModeLable = [
  { color: "blue", name: "DISABLE" },
  { color: "green", name: "STATIC" },
  { color: "black", name: "KINEMATIC" },
];
export const customSystemModeLable = [
  { color: "green", name: "Shamim" },
  { color: "black", name: "ShamimPlus" },
  { color: "orange", name: "Sahab" },
  { color: "violet", name: "HodaPro" },
  { color: "blue", name: "Hoda" },
  { color: "red", name: "Mashhad" },
  { color: "yellow", name: "Samt" },
  { color: "#896234", name: "Others" },
];

export const getPalette: any = {
  navMode: customNavModeLable,
  measureMode: customMeasureModeLable,
  loggingMode: customLoginModeLable,
  systems: customSystemModeLable,
};

export const getMatchedData = (
  hrmsList: number[],
  mainData: any,
  mode: string,
  type: any
) => {
  const hrmsSet = new Set(hrmsList);
  return mainData
    ?.filter((item: any) => hrmsSet.has(item[type]))
    .map(({ lat, lon, name, id }: any) => ({
      lat,
      lon,
      name,
      id,
      color:
        mode === "befor" && (type === "numSatTracked" || type === "numSatUsed")
          ? "red"
          : mode === "befor" &&
            (type !== "numSatTracked" || type !== "numSatUsed")
          ? "green"
          : "red",
    }));
};

type DataItem = {
  name: string;
  value: string | number | null | undefined;
};
type Categories = {
  [key: string]: string[];
};
type GroupedData = {
  [category: string]: DataItem[];
};
export const groupData = (data: DataItem[]): GroupedData => {
  const categories: Categories = {
    Descriptions: [
      "Name",
      "Q Code",
      "Description Quickcode",
      "Class",
      "Has Photo",
      "Date and Time",
    ],
    Coordinate: ["El Height", "Latitude", "Longitude", "Easting", "Northing"],
    BaseInfo: ["Base Lat", "Base Lon", "Base H"],
    CasterInfo: ["Caster Ip", "Mount Point"],
    Tilt: [
      "Tilt Pitch",
      "Tilt Roll",
      "Tilt Head",
      "Ant Height",
      "Is Tilt Corrected",
    ],
    Accuracy: ["HRMS", "VRMS", "PDOP", "VDOP", "HDOP", "Age"],
    SatelliteInfo: ["Satellite Used", "Satellite Tracked"],
    Modes: ["Navigation Mode", "Logging Mode", "Measure Mode"],
  };
  const result: GroupedData = Object.entries(categories).reduce(
    (acc, [category, keys]) => {
      acc[category] = data.filter((item) => keys.includes(item.name));
      return acc;
    },
    {} as GroupedData
  );
  return result;
};

let globalNavValue: any = null;
let globalLatValue: any = null;
let globalLonValue: any = null;

export const customeName = ({ name, value }: { name: string; value: any }) => {
  let result;
  if (name === "Date and Time") {
    result = <DateConverter date={value} /> ?? "___";
  } else if (value === "") {
    result = "__";
  } else if (value === 0) {
    result = 0;
  } else {
    result = value;
  }
  return result;
};
