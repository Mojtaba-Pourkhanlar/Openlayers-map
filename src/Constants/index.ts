import point1 from "@/assets/png/marker/point1.png";

export const VERSION = "©2024-V 2.3.0";
// Single Routes
export const OPENPROJECT = "/openproject";

export const POINTICON = [
  { id: 1, icons: point1, name: "point1", color: "#000" },
];

export const selectPoint: any = {
  point1: point1,
};

export const toEnglishDigits = (str: string) => {
  return str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
};

export const staticName = (value: any) => {
  return [
    { name: "Name", value: value?.name ?? "__" },
    {
      name: "El-Height",
      value: value?.height ? Math.ceil(value?.height * 1e3) / 1e3 : "__",
    },
    {
      name: "Latitude",
      value: value?.lat ? Math.ceil(value?.lat * 1e8) / 1e8 : "__",
    },
    {
      name: "Longitude",
      value: value?.lon ? Math.ceil(value?.lon * 1e8) / 1e8 : "__",
    },
    {
      name: "HRMS",
      value: value?.hrms ? Math.ceil(value?.hrms * 1e3) / 1e3 : "__",
    },
    {
      name: "VRMS",
      value: value?.vrms ? Math.ceil(value?.vrms * 1e3) / 1e3 : "__",
    },
    { name: "Nav Mode", value: value?.navMode ?? "__" },
    { name: "Logging Mode", value: value?.loggingMode ?? "__" },
    { name: "Ant-Height", value: value?.antHeight ?? "__" },
    { name: "Num Sat Used", value: value?.numSatUsed ?? "__" },
    { name: "Num Sat Tracked", value: value?.numSatTracked ?? "__" },
    {
      name: "PDOP",
      value: value?.pdop ? Math.ceil(value?.pdop * 1e3) / 1e3 : "__",
    },
    { name: "Base-Lat", value: value?.baseLat ?? "__" },
    { name: "Base-Lon", value: value?.baseLon ?? "__" },
    { name: "Base-H", value: value?.baseHeight ?? "__" },
    { name: "Caster-Ip", value: value?.casterIp ?? "__" },
    { name: "Mount-Point", value: value?.mountPoint ?? "__" },
    { name: "Age", value: value?.age ?? "__" },
    { name: "Tilt-Pitch", value: value?.pitchTilt ?? "__" },
    { name: "Tilt-Roll", value: value?.rollTilt ?? "__" },
    { name: "Tilt-Head", value: value?.headTilt ?? "__" },
    { name: "Date and Time", value: value?.date ?? "__" },
    { name: "Has Photo", value: value?.picture ?? "__" },
    { name: "Caster Username", value: value?.casterUser ?? "__" },
    { name: "Q_Code", value: value?.qCode ?? "__" },
    { name: "Description-Quickcode", value: value?.description ?? "__" },

    {
      name: "VDOP",
      value: value?.vdop ? Math.ceil(value?.vdop * 1e2) / 1e2 : "__",
    },
    {
      name: "HDOP",
      value: value?.hdop ? Math.ceil(value?.hdop * 1e2) / 1e2 : "__",
    },
    { name: "Num Sat Tracked", value: value?.numSatTracked ?? "__" },
    { name: "Sigma", value: value?.sigma ?? "__" },
    { name: "Class", value: value?.class ?? "__" },
    { name: "Is Tilt Corrected", value: value?.isTiltCorrected ?? "__" },
  ];
};

export const nameToFixed = (name: number, length: number) => {
  if (!name) return "___";
  const zeros = "0".repeat(length);
  const regex = new RegExp(`\\.(${zeros})$`);
  return name?.toFixed(length).replace(regex, "");
};
