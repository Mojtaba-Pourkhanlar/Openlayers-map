import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Core
import Box from "@/Components/Common/Core/Box";
import EnhancedTable from "@/Components/Common/Core/EnhancedTable";
// redux
import {
  clearTableHeader,
  getMapSearch,
  getPointsList,
  getSearch,
  setMapPageIndex,
  setMapPageSize,
} from "@/store/Actions/Map";
import { RootState } from "@/store/interfaces";
// icon
import { ReactComponent as Refresh } from "@/assets/images/icons/refresh.svg";
import { ReactComponent as Download } from "@/assets/svg/download.svg";
import { ReactComponent as Filter } from "@/assets/svg/filter.svg";
import { ReactComponent as Setting } from "@/assets/svg/settings.svg";
// style
import ButtonGroup from "@/Components/Common/Core/Button/ButtonGroup";
import DateConverter from "@/Components/Common/Core/DateConverter";
import Tooltip from "@/Components/Common/Core/Tooltip/Basic";
import {
  headerItemName,
  headerItemNameWidth,
  headerItemsList,
} from "@/Constants";
import { getLoginMode, getMeasureMode, getNavMode } from "@/Hook";
import { getTranslate } from "@/language";
import { getPointData, setModal, tableType } from "@/store/Actions/Root";
import {
  calculateESF,
  calculateUTMScaleFactor,
  convertWGSToUTM,
} from "../../../Map/Hook";
import {
  BTNSetting,
  BoxBTNGroup,
  BoxBtnTooltip,
  SearchInput,
  TableSetting,
} from "../../../Style";
import { columns } from "../../components/constants";
import EvaluationCoordinates from "../../components/modal/EvaluationCoordinates";
import ModalExport from "../../components/modal/Export";
import TableSettingModal from "../../components/modal/TableSetting";
import ViewSpecifications from "../../components/modal/ViewSpecifications";

export interface CheckboxItem {
  id: number;
  name: string;
  lat: number;
  lon: number;
  date: string;
}

const PointTable = () => {
  const translate = getTranslate();
  const map = useSelector((state: RootState) => state?.map);
  const modal = useSelector((state: RootState) => state?.root?.modal);
  const dispatch = useDispatch();
  const [rowItem, setRowItem] = useState<any>({});
  const [, setSelectedItems] = useState<CheckboxItem[]>([]);
  const {
    listLoading,
    map_page_size,
    map_page_index,
    map_search,
    header,
    assessment,
    map_list,
  } = map;
  const [debouncedSelectedItem, setDebouncedSelectedItem] =
    useState<string>("");
  const [debounced, setDebounced] = useState<any[]>([]);

  useEffect(() => {
    if (debouncedSelectedItem && map_search) {
      dispatch(getPointsList([]) as any);
    }
    const timerId = setTimeout(() => {
      setDebouncedSelectedItem(map_search);
    }, 1500);
    if (map_search === "" && debouncedSelectedItem) {
      dispatch(getPointsList([]) as any);
      setDebouncedSelectedItem("");
    }

    if (debounced.length > 0 && assessment.length > 0) {
      dispatch(getPointsList([]) as any);
    }
    if (assessment?.length === 0 && debounced.length > 0) {
      dispatch(getPointsList([]) as any);
      setDebounced([]);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [map_search, debouncedSelectedItem, assessment, debounced]);

  useEffect(() => {
    return () => {
      dispatch(setMapPageSize(10) as any);
      dispatch(setMapPageIndex(1) as any);
      dispatch(getSearch("") as any);
      dispatch(getPointData([]));
      dispatch(clearTableHeader());
    };
  }, []);

  const test: string[] = header ?? columns;

  const handleTableSetting = () => {
    dispatch(setModal({ name: translate.tableSetting, mode: "add" }));
  };
  const headerItems = (row: any, columnName: any) => {
    const name = columnName;
    let lat = "";
    let lon = "";
    let height = "";
    // Gather both lat and lon values
    if (name === "lat" || name === "lon" || name === "height") {
      lat = name === "lat" ? row[name] : "";
      lon = name === "lon" ? row[name] : "";
      height = name === "height" ? row[name] : "";
    } else {
      lat = row["lat"];
      lon = row["lon"];
      height = row["height"];
    }
    const convert = convertWGSToUTM(lat, lon);
    const gsf = calculateUTMScaleFactor(+lat, +lon);
    const esf = calculateESF(+height, +lat);
    const csf = esf * gsf;

    if (name === "date") {
      return <DateConverter date={row[name]} />;
    } else if (name === "lat" || name === "lon") {
      return Math.ceil(row[name] * 1e8) / 1e8;
    } else if (name === "vrms" || name === "hrms") {
      return row[name] ? Math.ceil(row[name] * 1e3) / 1e3 : "__";
    } else if (name === "vdop" || name === "hdop" || name === "pdop") {
      return row[name] ? Math.ceil(row[name] * 1e2) / 1e2 : "__";
    } else if (name === "height") {
      return row[name] ? Math.ceil(row[name] * 1e3) / 1e3 : "__";
    } else if (name === "GSF") {
      return gsf ? parseFloat(gsf.toFixed(8)) : "__";
    } else if (name === "ESF") {
      return esf ? parseFloat(esf.toFixed(8)) : "__";
    } else if (name === "CSF") {
      return csf ? parseFloat(csf.toFixed(8)) : "__";
    } else if (name === "Northing") {
      return convert.utmNorthing;
    } else if (name === "Easting") {
      return convert.utmEasting;
    } else if (name === "navMode") {
      return getNavMode(row[name]);
    } else if (name === "loggingMode") {
      return getLoginMode(row[name]);
    } else if (name === "antHeight") {
      return row[name].toFixed(3).replace(/\.000$/, "");
    } else if (name === "pitchTilt") {
      return row[name].toFixed(3).replace(/\.000$/, "");
    } else if (name === "rollTilt") {
      return row[name].toFixed(3).replace(/\.000$/, "");
    } else if (name === "headTilt") {
      return row[name].toFixed(3).replace(/\.000$/, "");
    } else if (name === "baseLon" || name === "baseLat") {
      return Math.ceil(row[name] * 1e8) / 1e8;
    } else if (name === "baseHeight") {
      return row[name].toFixed(7).replace(/\.0000000$/, "");
    } else {
      return row[name];
    }
  };

  const getIndex = (item: any) => headerItemsList.indexOf(item);

  const handleMoreClick = (row: any) => {
    setRowItem(row);
    dispatch(setModal({ name: translate.viewPoint, mode: "view" }));
  };

  const filteredHeadCells = test?.filter((cell) => cell !== "id_ray_db");
  // Generate headCells dynamically based on the header array
  const headCells: any =
    filteredHeadCells?.map((columnName: any) => ({
      id: columnName,
      // Remove _ray_db from the end of the
      label: headerItemName(columnName.replace(/_ray_db$/, "")),
      width: headerItemNameWidth(columnName.replace(/_ray_db$/, "")),
      align: "center" as const,
      format: (row: any) =>
        headerItems(row, columnName.replace(/_ray_db$/, "")) ?? "__",
    })) || [];

  // Sort headCells based on the order in headerItemsList
  headCells.sort((a: any, b: any) => getIndex(a.id) - getIndex(b.id));

  const hasNavModeColumn = filteredHeadCells?.includes("navMode_ray_db");
  if (hasNavModeColumn) {
    headCells.push({
      id: "measure",
      label: "Measure Mode",
      width: 100,
      align: "center" as const,
      format: (row: any) => {
        const num = String(row?.navMode / 10).split("")[0];
        return row.navMode ? getMeasureMode(+num) : "___";
      },
    });
  }

  const clearSearch = () => {
    dispatch(getMapSearch("") as any);
  };

  return (
    <>
      <EnhancedTable
        tableHead={headCells}
        tableData={map_list?.data?.list ?? []}
        dataLength={map_list?.data?.totalNumber ?? 0}
        pageSize={map_page_size}
        pageIndex={map_page_index}
        handlePageChange={() => {
          dispatch(getPointsList([]) as any);
        }}
        setPageSize={(pageSize: number) => {
          dispatch(setMapPageSize(pageSize) as any);
        }}
        setPageIndex={(pageIndex: number) => {
          dispatch(setMapPageIndex(pageIndex) as any);
        }}
        onRowClick={handleMoreClick}
        listLoading={listLoading}
        showCheckbox
        tableSetting={
          <TableSetting>
            <BoxBTNGroup>
              <ButtonGroup
                firstLabel="عارضه نقطه ای"
                secondLabel="عارضه خطی"
                firstOnClick={() => {
                  dispatch(tableType("Point"));
                }}
                secondOnClick={() => {
                  dispatch(tableType("Multipoint"));
                }}
                defaultActive={1}
              />
            </BoxBTNGroup>
            <Box>
              <SearchInput
                type="text"
                placeholder={translate.searchCoordinate}
                onChange={(e) => {
                  dispatch(getMapSearch(e.target.value) as any);
                }}
                value={map_search}
                icon={
                  map_search && (
                    <Box style={{ margin: "0 0 0 8px" }}>
                      <Refresh onClick={clearSearch} />
                    </Box>
                  )
                }
              />
            </Box>
            <BoxBtnTooltip>
              <Tooltip text={translate.assessmentData}>
                <BTNSetting
                  label={""}
                  variant="contained"
                  endIcon={
                    <Filter
                      style={{
                        width: "27px",
                        height: "27px",
                        margin: "-5px -9px 0 0",
                      }}
                    />
                  }
                  onClick={() =>
                    dispatch(
                      setModal({ name: translate.assessment, mode: "add" })
                    )
                  }
                />
              </Tooltip>
              <Tooltip text={translate.tableSetting}>
                <BTNSetting
                  label={""}
                  variant="contained"
                  endIcon={
                    <Setting
                      style={{
                        width: "27px",
                        height: "27px",
                        margin: "-5px -9px 0 0",
                      }}
                    />
                  }
                  onClick={handleTableSetting}
                />
              </Tooltip>
              <Tooltip text={translate.export}>
                <BTNSetting
                  label={""}
                  variant="contained"
                  endIcon={
                    <Download
                      style={{
                        width: "27px",
                        height: "27px",
                        margin: "-5px -9px 0 0",
                      }}
                    />
                  }
                  onClick={() => {
                    dispatch(
                      setModal({ name: translate.export, mode: "view" })
                    );
                  }}
                />
              </Tooltip>
            </BoxBtnTooltip>
          </TableSetting>
        }
        updateSelectedItems={setSelectedItems}
        changeImage
      />

      {modal.name === translate.export && <ModalExport />}
      {modal.name === translate.assessment && <EvaluationCoordinates />}
      {modal.name === translate.tableSetting && (
        <TableSettingModal headerItems={headerItemsList} />
      )}
      {modal.name === translate.viewPoint && (
        <ViewSpecifications rowItem={rowItem} headerItems={headerItemsList} />
      )}
    </>
  );
};

export default PointTable;
