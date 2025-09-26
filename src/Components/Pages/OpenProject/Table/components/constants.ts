import { getTranslate } from "@/language";

const translate = getTranslate();

export const options = [
  { value: "HRMS", label: "HRMS" },
  { value: "VRMS", label: "VRMS" },
  { value: "Age", label: "Age" },
  { value: "PDOP", label: "PDOP" },
  { value: "Mode", label: "Mode" },
];
export const optionsOperator = [
  { value: "<", label: "کوچکتر از" },
  { value: ">", label: "بزرگتر از" },
];
export const optionsOperatorMode = [
  { value: "=!", label: "مخالف با" },
  { value: "=", label: "برابر با" },
];
export const optionsMode = [
  { value: "Fixed", label: "Fixed" },
  { value: "Float", label: "Float" },
  { value: "Diff", label: "Diff" },
  { value: "Aut", label: "Aut" },
];
export const optionsTableSelect = [
  { value: "1", label: translate.compare },
  { value: "2", label: translate.export },
  { value: "3", label: translate.delete },
];

export const translateOperator = (opr: string) => {
  let result;
  if (opr === ">") {
    result = "بزرگتر از";
  } else if (opr === "<") {
    result = "کوچکتر از";
  } else if (opr === "=") {
    result = "برابر است با ";
  } else if (opr === "=!") {
    result = "مخالف است با ";
  }
  return result;
};
export const columns: string[] = [
  "id_ray_db",
  "name_ray_db",
  "Easting",
  "Northing",
  "date_ray_db",
  "lat_ray_db",
  "lon_ray_db",
  "height_ray_db",
  "pdop_ray_db",
  "hrms_ray_db",
  "vrms_ray_db",
  "age_ray_db",
];
