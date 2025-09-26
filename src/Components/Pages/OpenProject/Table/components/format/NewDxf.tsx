import { BtnComponent } from "@/Components/Common/Core/Button";
import DxfWriter from "dxf-writer";
import moment from "moment-jalaali";

// npm i @tarikjabiri/dxf

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
  disable: boolean;
}

const NewDxf = ({ nameFile, points, disable }: DXFProps) => {
  const todayDate = moment().locale("fa").format("jYYYY/jMM/jDD");
  const generateDxf = (points: Point[]) => {
    const writer = new DxfWriter();
    points?.forEach((point: any) => {
      const { lat, lon } = point;
      writer.drawPoint(lon, lat); // Assuming height is 0 for simplicity
    });
    return writer.toDxfString();
  };
  const dxfContent = generateDxf(points);

  const handleClick = () => {
    const blob = new Blob([dxfContent], { type: "application/dxf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${nameFile}_${todayDate}.dxf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <BtnComponent
      disabled={disable}
      onClick={() => handleClick()}
      label="دانلود"
      variant="contained"
      style={{ backgroundColor: "#0B233F", color: "#fff", width: "124px" }}
    />
  );
};

export default NewDxf;
