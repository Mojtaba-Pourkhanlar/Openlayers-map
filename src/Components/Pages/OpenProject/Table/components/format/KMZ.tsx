import JSZip from "jszip";
import { BtnComponent } from "@/Components/Common/Core/Button";
import moment from "moment-jalaali";

interface Point {
  date: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
}

interface KMZProps {
  points: Point[];
  nameFile: string;
  disable: boolean;
}

const KMZ = ({ nameFile, points, disable }: KMZProps) => {
  const todayDate = moment().locale("fa").format("jYYYY/jMM/jDD");

  const generateKML = (points: any) => {
    const placemarks = points
      .map((point: any) => {
        const { lat, lon, height, name, date } = point;
        return `
                <Placemark>
                    <name>${name}</name>
                    <description>Date: ${date}</description>
                    <Point>
                        <coordinates>${lon},${lat},${height || 0}</coordinates>
                    </Point>
                </Placemark>
            `;
      })
      .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
            <kml xmlns="http://www.opengis.net/kml/2.2">
                <Document>
                    ${placemarks}
                </Document>
            </kml>`;
  };

  const kmlContent = generateKML(points);

  const handleExportKMZ = () => {
    // Create a Blob for the KML content
    const kmlBlob = new Blob([kmlContent], {
      type: "application/vnd.google-earth.kml+xml",
    });
    // Create a ZIP file with the correct structure
    const zip = new JSZip();
    zip.file("doc.kml", kmlBlob);
    // Trigger the download
    zip.generateAsync({ type: "blob" }).then((content) => {
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${nameFile}_${todayDate}.kmz`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <BtnComponent
      disabled={disable}
      onClick={() => handleExportKMZ()}
      label="دانلود"
      variant="contained"
      style={{ backgroundColor: "#0B233F", color: "#fff", width: "124px" }}
    />
  );
};

export default KMZ;
