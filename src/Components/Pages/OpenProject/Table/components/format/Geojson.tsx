import { BtnComponent } from "@/Components/Common/Core/Button";
import moment from "moment-jalaali";

interface Point {
  date: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
}

interface GeojsonProps {
  points: Point[];
  nameFile: string;
  disable: boolean;
}

const Geojson = ({ nameFile, points, disable }: GeojsonProps) => {
  const todayDate = moment().locale("fa").format("jYYYY/jMM/jDD");

  const generateGeoJSONFeature = (point: any) => {
    const { id, name, date, lat, lon, height } = point;
    return {
      type: "Feature",
      properties: { id, name, date, height },
      geometry: {
        type: "Point",
        coordinates: [lon, lat],
      },
    };
  };

  const generateGeoJSON = (points: any) => {
    const features = points.map(generateGeoJSONFeature);
    return {
      type: "FeatureCollection",
      features,
    };
  };

  const handleExportGeoJSON = () => {
    const geoJSON = generateGeoJSON(points);
    const geoJSONString = JSON.stringify(geoJSON, null, 2);

    // Create a Blob and trigger the download
    const blob = new Blob([geoJSONString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${nameFile}_${todayDate}.geojson`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <BtnComponent
      disabled={disable}
      onClick={() => handleExportGeoJSON()}
      label="دانلود"
      variant="contained"
      style={{ backgroundColor: "#0B233F", color: "#fff", width: "124px" }}
    />
  );
};

export default Geojson;
