import Box from "@/Components/Common/Core/Box";
import Typography from "@/Components/Common/Core/Typography";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// Redux actions
import { clearHistoryMultiPoint, redirectPage } from "@/store/Actions/History";
import {
  clearMapChart,
  clearTableHeader,
  getEPSG,
  getMapGuid,
} from "@/store/Actions/Map";
import {
  closeProject,
  openProject,
  projectName,
  updateRoute,
} from "@/store/Actions/Projects";
import { getIsHistory, setOpenMultiPoint } from "@/store/Actions/Root";
// Components
import HistoryList from "./History";
import MapComponent from "./Map";
import MapList from "./Table";
// Icons
import { ReactComponent as BackIcon } from "@/assets/svg/backIcon.svg";
import { ReactComponent as History } from "@/assets/svg/history.svg";
import { ReactComponent as MapIcon } from "@/assets/svg/map.svg";
import { ReactComponent as Chart } from "@/assets/svg/project/chart.svg";
import { ReactComponent as TableIcon } from "@/assets/svg/table.svg";
// Styles
import Tooltip from "@/Components/Common/Core/Tooltip/Basic";
import { RootState } from "@/store/interfaces";
import ChartJs from "./ChartJs";
import {
  BaxControl,
  BoxIcon,
  BtnContainer,
  Header,
  NameProject,
} from "./Style";

const OpenProjectComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state: RootState) => state?.project);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const [showMap, setShowMap] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(true);

  const pointArray = data.openproject;
  const pointData: any = pointArray;
  const epsg = searchParams.get("epsg");
  const guid = searchParams.get("guid");
  const name = searchParams.get("name");

  useEffect(() => {
    if (!pointData && guid) {
      setLoading(true);
      setShowMap(false);
      dispatch(getEPSG(String(epsg)) as any);
      dispatch(openProject({ guid: String(guid) }) as any)
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
      dispatch(projectName({ name: String(name), id: String(guid) }));
      dispatch(getMapGuid(String(guid)) as any);
      setShowMap(true);
    } else {
      setLoading(false);
    }
  }, [pointData, epsg, guid, name, dispatch]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "table") {
      setShowMap(false);
      setShowHistory(false);
      setShowTable(true);
      setShowChart(false);
    }
    if (tab === "history") {
      setShowMap(false);
      setShowTable(false);
      setShowHistory(true);
      setShowChart(false);
    }
    if (tab === "chart") {
      setShowMap(false);
      setShowTable(false);
      setShowHistory(false);
      setShowChart(true);
    }
    if (tab === "table") {
      setShowMap(false);
      setShowTable(true);
      setShowHistory(false);
      setShowChart(false);
    }
  }, [location.search]);

  const toggleViewMode = (mode: "map" | "table" | "history" | "chart") => {
    dispatch(redirectPage(false));
    const params = new URLSearchParams(searchParams);
    params.set("tab", mode);
    setSearchParams(params);
    if (mode === "map") {
      setShowMap(true);
      setShowTable(false);
      dispatch(clearTableHeader());
      dispatch(clearHistoryMultiPoint());
      dispatch(setOpenMultiPoint(false));
      dispatch(clearMapChart());
      dispatch(getIsHistory(false));
      setShowHistory(false);
      setShowChart(false);
    }
    if (mode === "history") {
      dispatch(clearHistoryMultiPoint());
      dispatch(setOpenMultiPoint(false));
      dispatch(clearMapChart());
      setShowHistory(true);
      setShowMap(false);
      setShowTable(false);
      setShowChart(false);
    }
    if (mode === "chart") {
      dispatch(clearHistoryMultiPoint());
      dispatch(setOpenMultiPoint(false));
      setShowHistory(true);
      setShowMap(false);
      setShowTable(false);
      setShowChart(true);
    }
    if (mode === "table") {
      dispatch(clearHistoryMultiPoint());
      dispatch(setOpenMultiPoint(false));
      dispatch(clearMapChart());
      setShowMap(false);
      setShowHistory(false);
      setShowTable(true);
      setShowChart(false);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(updateRoute({ route: "", persistent: false }));
      dispatch(getIsHistory(false));
    };
  }, [dispatch]);

  const handlePopState = () => {
    const tab = searchParams.get("tab");
    if (tab === "map") {
      dispatch(updateRoute({ route: "", persistent: false }));
      dispatch(closeProject());
      dispatch(getIsHistory(false));
      navigate("/admin/project/projectlist");
    }
  };
  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  const epsgName = epsg === "" || epsg === "0" ? "EPSG:4326" : `EPSG:${epsg}`;

  return (
    <Box style={{ margin: "0" }}>
      <Header>
        <NameProject>
          <Typography
            style={{
              fontSize: "22px",
              margin: "0",
              borderRadius: "0px 10px 10px 0",
              color: "#0B233F",
              fontWeight: "bolder",
            }}
          >
            نام پروژه :{" "}
          </Typography>
          <Typography
            style={{
              fontSize: "18px",
              margin: "0 ",
              padding: "0 15px",
              borderRadius: "10px 20px 20px 10px",
              color: "#59595A",
              fontWeight: "bold",
            }}
          >
            {data.name}
          </Typography>
        </NameProject>
        <BaxControl>
          <Tooltip text="برگشت">
            <BtnContainer
              style={{
                padding: "10px",
                margin: "-7px 10px 0 0",
                cursor: "pointer",
              }}
              onClick={() => {
                dispatch(updateRoute({ route: "", persistent: false }));
                dispatch(closeProject());
                dispatch(getIsHistory(false));
                dispatch(clearMapChart());
                navigate("/admin/project/projectlist");
              }}
            >
              <BackIcon style={{ width: "25px", height: "25px" }} />
            </BtnContainer>
          </Tooltip>

          <BtnContainer>
            <Tooltip text="نمودار">
              <BoxIcon
                isbgcolor={showChart.toString()}
                onClick={() => toggleViewMode("chart")}
              >
                <Chart style={{ width: "20px", height: "20px" }} />
              </BoxIcon>
            </Tooltip>
            <Tooltip text="تاریخچه">
              <BoxIcon
                isbgcolor={showHistory.toString()}
                onClick={() => toggleViewMode("history")}
              >
                <History style={{ width: "20px", height: "20px" }} />
              </BoxIcon>
            </Tooltip>
            <Tooltip text="جدول">
              <BoxIcon
                isbgcolor={showTable.toString()}
                onClick={() => toggleViewMode("table")}
              >
                <TableIcon />
              </BoxIcon>
            </Tooltip>
            <Tooltip text="نقشه">
              <BoxIcon
                isbgcolor={showMap.toString()}
                onClick={() => toggleViewMode("map")}
              >
                <MapIcon />
              </BoxIcon>
            </Tooltip>
          </BtnContainer>
        </BaxControl>
      </Header>
      {!loading && showMap && (
        <MapComponent utm={epsgName} pointData={pointData} />
      )}
      {!loading && showTable && <MapList />}
      {!loading && showChart && <ChartJs />}
      {!loading && showHistory && <HistoryList />}
      {loading && <Typography>در حال بارگذاری...</Typography>}{" "}
    </Box>
  );
};

export default OpenProjectComponent;
