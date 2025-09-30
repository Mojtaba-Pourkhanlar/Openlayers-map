import { Navigate, Route, Routes } from "react-router-dom";
import mapData from "../../public/map-data.json";
import MapComponent from "@/Components/Pages/Map";

const ImplemetationRoutes = () => {
  const getMapData = mapData;

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/map" replace />} />
      <Route path="*" element={<Navigate to="/map" replace />} />
      <Route path="/*" element={<Navigate to="/map" replace />} />
      <Route
        path="/map"
        element={<MapComponent utm="EPSG:4326" pointData={getMapData} />}
      />
    </Routes>
  );
};

export default ImplemetationRoutes;
