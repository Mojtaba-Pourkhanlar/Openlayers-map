import { Route, Routes } from "react-router-dom";
import mapData from "../../public/map-data.json";
import MapComponent from "@/Components/Pages/Map";
const ImplemetationRoutes = () => {
  const getMapData = mapData.data[0].data;

  return (
    <>
      <Routes>
        <Route
          path="/map"
          element={<MapComponent utm={"EPSG:4326"} pointData={getMapData} />}
        />
      </Routes>
    </>
  );
};

export default ImplemetationRoutes;
