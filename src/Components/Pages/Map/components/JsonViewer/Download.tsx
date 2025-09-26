import { ReactComponent as DownloadIcon } from "@/assets/svg/download.svg";
import { ReactComponent as TickIcon } from "@/assets/svg/mapIcon/tick.svg";
import { useState } from "react";
import { Download as StyledDownload } from "../../../Style";
import moment from "moment-jalaali";

const Download = ({ jsonData, name, show }: any) => {
  const [showDWL, setShowDWL] = useState(false);
  const todayDate = moment().locale("fa").format("jYYYY/jMM/jDD");

  const handleDownload = () => {
    const geoJSONString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([geoJSONString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}_${todayDate}.geojson`;
    a.click();
    URL.revokeObjectURL(url);
    setShowDWL(true);
  };

  return (
    <StyledDownload $show={show}>
      <button>
        <span
          onClick={handleDownload}
          onMouseLeave={() => setShowDWL(false)}
          title={showDWL ? "Success" : "Download"}
        >
          {showDWL ? (
            <TickIcon style={{ width: "20px", height: "20px" }} />
          ) : (
            <DownloadIcon style={{ width: "22px", height: "22px" }} />
          )}
        </span>
      </button>
    </StyledDownload>
  );
};

export default Download;
