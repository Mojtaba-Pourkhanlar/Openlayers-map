import React, { useState } from "react";
import { fromLonLat } from "ol/proj";
import moment from "moment-jalaali";

interface Point {
  date: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
}
interface DXFProps {
  points: Point[];
  nameFile: string;
}

const DXF: React.FC<DXFProps> = ({ points, nameFile }) => {
  const [coordinateType, setCoordinateType] = useState<"2D" | "3D">("2D");

  // Format today's date using moment
  const todayDate = moment().locale("fa").format("jYYYY/jMM/jDD");

  const handleExport = () => {
    // Create a Blob for the combined DXF content
    const blob = new Blob(
      [generateCombinedDXFContent(points, coordinateType)],
      {
        type: "application/dxf",
      }
    );
    // Create a temporary URL and trigger the download
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${nameFile}_${coordinateType.toLowerCase()}_${todayDate}.dxf`;
    a.click();
    // Revoke the temporary URL to free up resources
    URL.revokeObjectURL(url);
  };

  const generateCombinedDXFContent = (points: Point[], type: "2D" | "3D") => {
    // Generate DXF content for each point and concatenate them
    const dxfContents = points.map((point) => generateDXFContent(point, type));
    return dxfContents.join("");
  };

  const generateDXFContent = ({ lon, lat, name }: Point, type: "2D" | "3D") => {
    const [longitude, latitude] = fromLonLat([lon, lat]);

    // Create a DXF point entity for each point
    const dxfString = `
            0
            SECTION
            2
            ENTITIES
            0
            POINT
            8
            0
            10
            ${longitude}
            20
            ${latitude}
            30
            0
            ${type === "3D" ? "30\n0" : ""}
            0
            TEXT
            8
            0
            10
            ${longitude + 0.001}
            20
            ${latitude + 0.001}
            30
            0
            1
            ${name}
            0
        `;

    return dxfString;
  };

  return (
    <div>
      <select
        value={coordinateType}
        onChange={(e) => setCoordinateType(e.target.value as "2D" | "3D")}
      >
        <option value="2D">2D</option>
        <option value="3D">3D</option>
      </select>
      <button onClick={() => handleExport()}>Export on DXF</button>
    </div>
  );
};

export default DXF;
