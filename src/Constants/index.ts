import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";

export const VERSION = "©2024-V 2.4.2";
export const RAYCLOUD = "Openlayers - Map - Mojtaba Pourkhanlar";

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
