import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import point1 from "@/assets/png/marker/point1.png";
import point2 from "@/assets/png/marker/point2.png";
import point3 from "@/assets/png/marker/point3.png";
import point4 from "@/assets/png/marker/point4.png";
import point5 from "@/assets/png/marker/point5.png";
import point6 from "@/assets/png/marker/point6.png";
import {
  getLoginMode,
  getMeasureMode,
  getNavMode,
  getSystemMode,
} from "@/Hook";
import { convertWGSToUTM } from "@/Components/Pages/OpenProject/Map/Hook";

export const VERSION = "©2024-V 2.4.2";
export const RAYCLOUD = "RayCloud";
// Single Routes
export const OPENPROJECT = "/openproject";

export const handleEPSG = (epsg: any) => {
  switch (epsg) {
    case 32639:
      return "UTM39N";
      break;
    case 32638:
      return "UTM38N";
      break;
    case 32640:
      return "UTM40N";
      break;
    case 32641:
      return "UTM41N";
      break;
    case 32739:
      return "UTM39S";
      break;
    case 32738:
      return "UTM38S";
      break;
    case 32740:
      return "UTM340S";
      break;
    case 32741:
      return "UTM341S";
      break;
    case "WGS84":
      return "4326";
      break;
    case 4326:
      return "WGS84";
      break;
    default:
      break;
  }
};

export const headerItemsList: string[] = [
  "name_ray_db",
  "Easting",
  "Northing",
  "height_ray_db",
  "lat_ray_db",
  "lon_ray_db",
  "GSF",
  "ESF",
  "CSF",
  "hrms_ray_db",
  "vrms_ray_db",
  "antHeight_ray_db",
  "numSatUsed_ray_db",
  "numSatTracked_ray_db",
  "pdop_ray_db",
  "baseLat_ray_db",
  "baseLon_ray_db",
  "baseHeight_ray_db",
  "casterIp_ray_db",
  "mountPoint_ray_db",
  "age_ray_db",
  "pitchTilt_ray_db",
  "rollTilt_ray_db",
  "headTilt_ray_db",
  "date_ray_db",
  "navMode_ray_db",
  "loggingMode_ray_db",
  "picture",
  "casterUser_ray_db",
  "qCode",
  "description",

  "isTiltCorrected_ray_db",
  "hdop_ray_db",
  "vdop_ray_db",
  "class_ray_db",
  "sigma_ray_db",
  "code",
];

export const headerItemName = (columnName: any) => {
  const name = columnName.replace(/_ray_db$/, "");
  if (name === "vdop") {
    return "VDOP";
  } else if (name === "hdop") {
    return "HDOP";
  } else if (name === "pdop") {
    return "PDOP";
  } else if (name === "lat") {
    return "Latitude";
  } else if (name === "lon") {
    return "Longitude";
  } else if (name === "date") {
    return "Date and Time";
  } else if (name === "name") {
    return "Name";
  } else if (name === "height") {
    return "El Height";
  } else if (name === "hrms") {
    return "HRMS";
  } else if (name === "vrms") {
    return "VRMS";
  } else if (name === "age") {
    return "Age";
  } else if (name === "numSatTracked") {
    return "Satellite Tracked";
  } else if (name === "picture") {
    return "Has Photo";
  } else if (name === "navMode") {
    return "Navigation Mode";
  } else if (name === "sigma") {
    return "Sigma";
  } else if (name === "pitchTilt") {
    return "Tilt Pitch";
  } else if (name === "mountPoint") {
    return "Mount Point";
  } else if (name === "casterIp") {
    return "Caster Ip";
  } else if (name === "description") {
    return "Description";
  } else if (name === "baseLat") {
    return "Base Lat";
  } else if (name === "antHeight") {
    return "Ant Height";
  } else if (name === "headTilt") {
    return "Tilt Head";
  } else if (name === "rollTilt") {
    return "Tilt Roll";
  } else if (name === "baseHeight") {
    return "Base H";
  } else if (name === "baseLon") {
    return "Base Lon";
  } else if (name === "class") {
    return "Class";
  } else if (name === "numSatUsed") {
    return "Satellite Used";
  } else if (name === "isTiltCorrected") {
    return "Is Tilt Corrected";
  } else if (name === "casterUser") {
    return "Caster Username";
  } else if (name === "loggingMode") {
    return "Logging Mode";
  } else if (name === "qCode") {
    return "Q Code";
  } else {
    return name;
  }
};

export const headerItemNameWidth = (columnName: any) => {
  const name = columnName.replace(/_ray_db$/, "");
  if (name === "lat") {
    return 100;
  } else if (name === "lon") {
    return 100;
  } else if (name === "date") {
    return 150;
  } else if (name === "name") {
    return 100;
  } else if (name === "Northing") {
    return 120;
  } else if (name === "num_sat_tracked") {
    return 300;
  } else if (name === "logging_mode") {
    return 300;
  } else if (name === "num_sat_used") {
    return 300;
  } else if (name === "is_tilt_corrected") {
    return 120;
  } else if (name === "GSF") {
    return 120;
  } else if (name === "ESF") {
    return 120;
  } else if (name === "CSF") {
    return 120;
  } else {
    return 120;
  }
};

export const utmDataCustom = [
  { id: 38, utm: "UTM38N", code: 32638 },
  { id: 39, utm: "UTM39N", code: 32639 },
  { id: 40, utm: "UTM40N", code: 32640 },
  { id: 41, utm: "UTM41N", code: 32641 },
];

export const POINTICON = [
  { id: 1, icons: point1, name: "point1", color: "#000" },
  { id: 2, icons: point2, name: "point2", color: "#FF4C4C" },
  { id: 3, icons: point3, name: "point3", color: "#BBBBBB" },
  { id: 4, icons: point4, name: "point4", color: "#1C75BC" },
  { id: 5, icons: point5, name: "point5", color: "#E83816" },
  { id: 6, icons: point6, name: "point6", color: "#794CD1" },
];

export const selectPoint: any = {
  point1: point1,
  point2: point2,
  point3: point3,
  point4: point4,
  point5: point5,
  point6: point6,
};

export const TypePoint = [
  { value: "point", label: "Point" },
  { value: "multipoint", label: "Multi Point" },
];

export const Operation = [
  { value: "deleted", label: "Delete" },
  { value: "updated", label: "Update" },
  { value: "insert", label: "Insert" },
];
export const OperationMulti = [
  { value: "deleted", label: "Delete" },
  { value: "insert", label: "Insert" },
];

export const toEnglishDigits = (str: string) => {
  return str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
};

export const ConvertDate = (date: string) => {
  return new DateObject({
    date: new Date(date),
    calendar: gregorian,
  })
    .convert(persian)
    .format("YYYY/MM/DD HH:mm");
};

export const customePointDetail = (value: any) => {
  const compareValues = (beforeValue: any, afterValue: any) =>
    beforeValue !== afterValue;
  if (value?.status === "updated") {
    const after = [
      {
        name: "Name",
        value: value?.data?.properties?.name ?? "__",
        color: compareValues(
          value?.before?.properties?.name,
          value?.data?.properties?.name
        )
          ? "rgba(0,255,0, 0.2)"
          : null,
      },
      {
        name: "UserName",
        value: value?.data?.properties?.fullName ?? "__",
        color: compareValues(
          value?.before?.properties?.fullName,
          value?.data?.properties?.fullName
        )
          ? "rgba(0,255,0, 0.2)"
          : null,
      },
      {
        name: "Date Time",
        value: ConvertDate(value?.data?.properties?.createAt) ?? "__",
        color: compareValues(
          value?.before?.properties?.name,
          value?.data?.properties?.name
        )
          ? "rgba(0,255,0, 0.2)"
          : null,
      },
      {
        name: "Longitude",
        value: value?.data?.geometry?.coordinates[1] ?? "__",
        color: compareValues(
          value?.before?.geometry?.coordinates[1],
          value?.data?.geometry?.coordinates[1]
        )
          ? "rgba(0,255,0, 0.2)"
          : null,
      },
      {
        name: "Latitude",
        value: value?.data?.geometry?.coordinates[0] ?? "__",
        color: compareValues(
          value?.before?.geometry?.coordinates[0],
          value?.data?.geometry?.coordinates[0]
        )
          ? "rgba(0,255,0, 0.2)"
          : null,
      },
      {
        name: "Height",
        value: value?.data?.properties.height ?? "__",
        color: compareValues(
          value?.before?.properties.height,
          value?.data?.properties.height
        )
          ? "rgba(0,255,0, 0.2)"
          : null,
      },
      {
        name: "Status",
        value: value?.status ?? "__",
        color: null,
      },
      {
        name: "Q_Code",
        value: value?.data?.properties.qcode ?? "__",
        color: compareValues(
          value?.before?.properties.qcode,
          value?.data?.properties.qcode
        )
          ? "rgba(0,255,0, 0.2)"
          : null,
      },
      {
        name: "Code",
        value: value?.data?.properties.code ?? "__",
        color: compareValues(
          value?.before?.properties.code,
          value?.data?.properties.code
        )
          ? "rgba(0,255,0, 0.2)"
          : null,
      },
      {
        name: "Description",
        value: value?.data?.properties.description ?? "__",
        color: compareValues(
          value?.before?.properties.description,
          value?.data?.properties.description
        )
          ? "rgba(0,255,0, 0.2)"
          : null,
      },
    ];
    const before = [
      {
        name: "Name",
        value: value?.before?.properties?.name ?? "__",
        color: compareValues(
          value?.before?.properties?.name,
          value?.data?.properties?.name
        )
          ? "rgba(255,0,0, 0.2)"
          : null,
      },
      {
        name: "UserName",
        value: value?.before?.properties?.fullName ?? "__",
        color: compareValues(
          value?.before?.properties?.fullName,
          value?.data?.properties?.fullName
        )
          ? "rgba(255,0,0, 0.2)"
          : null,
      },
      {
        name: "Date Time",
        value: ConvertDate(value?.before?.properties?.createAt) ?? "__",
        color: compareValues(
          value?.before?.properties?.name,
          value?.data?.properties?.name
        )
          ? "rgba(255,0,0, 0.2)"
          : null,
      },
      {
        name: "Longitude",
        value: value?.before?.geometry?.coordinates[1] ?? "__",
        color: compareValues(
          value?.before?.geometry?.coordinates[1],
          value?.data?.geometry?.coordinates[1]
        )
          ? "rgba(255,0,0, 0.2)"
          : null,
      },
      {
        name: "Latitude",
        value: value?.before?.geometry?.coordinates[0] ?? "__",
        color: compareValues(
          value?.before?.geometry?.coordinates[0],
          value?.data?.geometry?.coordinates[0]
        )
          ? "rgba(255,0,0, 0.2)"
          : null,
      },
      {
        name: "Height",
        value: value?.before?.properties.height ?? "__",
        color: compareValues(
          value?.before?.properties.height,
          value?.data?.properties.height
        )
          ? "rgba(255,0,0, 0.2)"
          : null,
      },
      {
        name: "Status",
        value: value?.status ?? "__",
        color: null,
      },
      {
        name: "Q_Code",
        value: value?.before?.properties.qcode ?? "__",
        color: compareValues(
          value?.before?.properties.qcode,
          value?.data?.properties.qcode
        )
          ? "rgba(255,0,0, 0.2)"
          : null,
      },
      {
        name: "Code",
        value: value?.before?.properties.code
          ? value?.before?.properties.code
          : "___",
        color: compareValues(
          value?.before?.properties.code,
          value?.data?.properties.code
        )
          ? "rgba(255,0,0, 0.2)"
          : null,
      },
      {
        name: "Description",
        value: value?.before?.properties.description
          ? value?.before?.properties.description
          : "___",
        color: compareValues(
          value?.before?.properties.description,
          value?.data?.properties.description
        )
          ? "rgba(255,0,0, 0.2)"
          : null,
      },
    ];
    return { data: after, before };
  } else {
    const after = [
      { name: "Name", value: value?.data?.properties?.name ?? "__" },
      {
        name: "Date Time",
        value: ConvertDate(value?.data?.properties.createAt) ?? "__",
      },
      { name: "UserName", value: value?.data?.properties?.fullName ?? "__" },
      {
        name: "Longitude",
        value: value?.data?.geometry?.coordinates[1] ?? "__",
      },
      {
        name: "Latitude",
        value: value?.data?.geometry?.coordinates[0] ?? "__",
      },
      { name: "Height", value: value?.data?.properties.height ?? "__" },
      { name: "Status", value: value?.status ?? "__" },
      { name: "Q_Code", value: value?.data?.properties.qcode ?? "__" },
      { name: "Code", value: value?.data?.properties.code ?? "__" },
      {
        name: "Description",
        value: value?.data?.properties.description ?? "__",
      },
    ];
    return { data: after, before: [] };
  }
};

export const customeMultiPointDetail = (value: any) => {
  const compareValues = (beforeValue: any, afterValue: any) =>
    beforeValue !== afterValue;
  if (value?.status === "updated") {
    const after = [
      {
        name: "UserName",
        value: value?.data?.properties?.fullName ?? "__",
        color: compareValues(
          value?.before?.properties?.fullName,
          value?.data?.properties?.fullName
        )
          ? "rgba(0,255,0, 0.2)"
          : null,
      },
      {
        name: "Status",
        value: value?.status ?? "__",
        color: null,
      },
    ];
    const before = [
      {
        name: "UserName",
        value: value?.before?.properties?.fullName ?? "__",
        color: compareValues(
          value?.before?.properties?.fullName,
          value?.data?.properties?.fullName
        )
          ? "rgba(255,0,0, 0.2)"
          : null,
      },
      {
        name: "Status",
        value: value?.status ?? "__",
        color: null,
      },
    ];
    return {
      data: after,
      before: before,
    };
  } else {
    const short = value?.data?.properties;
    const after = [
      {
        name: "Date Time",
        value: ConvertDate(short?.createAt) ?? "__",
      },
      { name: "UserName", value: short?.fullName ? short?.fullName : "___" },
      { name: "Status", value: value?.status ?? "__" },
    ];
    return { data: after, before: [] };
  }
};

const nameToFixed = (name: number, length: number) => {
  if (!name) return "__";
  const zeros = "0".repeat(length);
  const regex = new RegExp(`\\.(${zeros})$`);
  return name.toFixed(length).replace(regex, "");
};
const classNumber: any = {
  0: "UNKNOWN",
  1: "MANUAL",
  2: "MEASURE",
  3: "STAKEOUT",
  4: "COGO",
  5: "AUTO",
  6: "IMPORT",
  7: "INVALID",
  8: "COGO_AUX",
  9: "BASE",
  10: "ARC",
  11: "CIRCLE",
  12: "RECTANGLE",
};
export const staticName = (value: any) => {
  const latChaeck = Math.ceil(value?.lat * 1e8) / 1e8;
  const lonChaeck = Math.ceil(value?.lon * 1e8) / 1e8;
  const p2e = (s: any) =>
    s.replace(/[۰-۹]/g, (d: any) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  const num = String(value?.navMode / 10).split("")[0];
  const { utmEasting, utmNorthing } = convertWGSToUTM(value?.lat, value?.lon);
  return [
    { name: "Name", value: value?.name ?? "__" },
    {
      name: "El Height",
      value: value?.height ? Math.ceil(value?.height * 1e3) / 1e3 : "__",
    },
    {
      name: "Latitude",
      value: value?.lat ? nameToFixed(latChaeck, 8) : "__",
    },
    {
      name: "Longitude",
      value: value?.lon ? nameToFixed(lonChaeck, 8) : "__",
    },
    {
      name: "HRMS",
      value: value?.hrms ? Math.ceil(value?.hrms * 1e3) / 1e3 : "__",
    },
    {
      name: "VRMS",
      value: value?.vrms ? Math.ceil(value?.vrms * 1e3) / 1e3 : "__",
    },
    { name: "Navigation Mode", value: getNavMode(value?.navMode) ?? "__" },
    { name: "Logging Mode", value: getLoginMode(value?.loggingMode) ?? "__" },
    { name: "Ant Height", value: nameToFixed(value?.antHeight, 3) ?? "__" },
    { name: "Satellite Used", value: value?.numSatUsed ?? "__" },
    { name: "Satellite Tracked", value: value?.numSatTracked ?? "__" },
    {
      name: "PDOP",
      value: value?.pdop ? Math.ceil(value?.pdop * 1e3) / 1e3 : "__",
    },
    {
      name: "Base Lat",
      value: nameToFixed(value?.baseLat, 7) ?? "__",
    },
    {
      name: "Base Lon",
      value: nameToFixed(value?.baseLon, 7) ?? "__",
    },
    { name: "Base H", value: nameToFixed(value?.baseHeight, 3) ?? "__" },
    { name: "Caster Ip", value: getSystemMode(value?.casterIp) ?? "__" },
    { name: "Mount Point", value: value?.mountPoint ?? "__" },
    { name: "Age", value: value?.age ?? "__" },
    { name: "Tilt Pitch", value: nameToFixed(value?.pitchTilt, 3) ?? "__" },
    { name: "Tilt Roll", value: nameToFixed(value?.rollTilt, 3) ?? "__" },
    { name: "Tilt Head", value: value?.headTilt ?? "__" },
    { name: "Date and Time", value: p2e(value?.date) ?? "__" },
    { name: "Has Photo", value: value?.picture ?? "__" },
    { name: "Caster Username", value: value?.casterUser ?? "__" },
    { name: "Q Code", value: value?.qCode ?? "__" },
    { name: "Description Quickcode", value: value?.description ?? "__" },
    {
      name: "VDOP",
      value: value?.vdop ? Math.ceil(value?.vdop * 1e2) / 1e2 : "__",
    },
    {
      name: "HDOP",
      value: value?.hdop ? Math.ceil(value?.hdop * 1e2) / 1e2 : "__",
    },
    { name: "Sigma", value: value?.sigma ?? "__" },
    { name: "Class", value: classNumber[value?.class] ?? "__" },
    { name: "Is Tilt Corrected", value: value?.isTiltCorrected ?? "__" },
    {
      name: "Measure Mode",
      value: value?.navMode ? getMeasureMode(+num) : "__",
    },
    {
      name: "Easting",
      value: value?.lon ? nameToFixed(Number(utmEasting), 3) : "__",
    },
    {
      name: "Northing",
      value: value?.lat ? nameToFixed(Number(utmNorthing), 3) : "__",
    },
  ];
};