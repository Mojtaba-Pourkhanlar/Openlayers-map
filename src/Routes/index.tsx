import MapComponent from "@/Components/Pages/Map";
import { Navigate, Route, Routes } from "react-router-dom";
import mapData from "../../public/map-data.json";

const ImplemetationRoutes = () => {
  const getMapData = mapData.data[0].data;

  return (
    <>
      <Routes>
        <Route
          path="/map"
          element={<MapComponent utm={"EPSG:4326"} pointData={getMapData} />}
        />
        <Route path="/*" element={<Navigate to={"/map"} />} />
      </Routes>
    </>
  );
};

export default ImplemetationRoutes;
