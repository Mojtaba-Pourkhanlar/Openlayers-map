import point1 from "@/assets/png/marker/point1.png";
import point2 from "@/assets/png/marker/point2.png";
import point3 from "@/assets/png/marker/point3.png";
import point4 from "@/assets/png/marker/point4.png";
import point5 from "@/assets/png/marker/point5.png";
import point6 from "@/assets/png/marker/point6.png";
import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";

export const VERSION = "©2024-V 2.4.2";
export const RAYCLOUD = "RayCloud";
// Single Routes
export const OPENPROJECT = "/openproject";

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
