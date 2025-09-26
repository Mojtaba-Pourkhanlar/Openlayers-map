import * as turf from "@turf/turf";
import shpwrite from "@mapbox/shp-write";
import { BtnComponent } from "@/Components/Common/Core/Button";
import moment from "moment-jalaali";

interface PointA {
  date: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
}

interface SHPProps {
  points: PointA[];
  nameFile: string;
  disable: boolean;
}

const Shp = ({ nameFile, points, disable }: SHPProps) => {
  const todayDate = moment().locale("fa").format("jYYYY/jMM/jDD");
  const handleExportShapefile = async () => {
    const features = points.map((point: any) =>
      turf.point([point.lon, point.lat])
    );
    const geoJsonFeature: any = {
      type: "FeatureCollection",
      features: features,
    };
    const options: any = {
      // folder: "myshapes",
      types: {
        point: "Point",
      },
      compression: "DEFLATE", // Add the missing compression property
      outputType: "blob", // Add the missing outputType property
    };

    try {
      // Use await to wait for the download to complete
      const shpBlob: any = await shpwrite.zip(geoJsonFeature, options);
      // Trigger the download
      const url = URL.createObjectURL(shpBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${nameFile}_${todayDate}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting Shapefile:", error);
    }
  };

  return (
    <BtnComponent
      disabled={disable}
      onClick={() => handleExportShapefile()}
      label="دانلود"
      variant="contained"
      style={{ backgroundColor: "#0B233F", color: "#fff", width: "124px" }}
    />
  );
};

export default Shp;
