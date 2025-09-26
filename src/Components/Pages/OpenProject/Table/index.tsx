import { useSelector } from "react-redux";
import MultiTable from "./components/Child/MultiTable";
import PointTable from "./components/Child/PointTable";
import { RootState } from "@/store/interfaces";

const MapList = () => {
  const getTableType = useSelector(
    (state: RootState) => state.root.getTableType
  );

  return (
    <div>{getTableType === "Point" ? <PointTable /> : <MultiTable />}</div>
  );
};

export default MapList;
