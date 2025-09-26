import Box from "@/Components/Common/Core/Box";
import ButtonGroup from "@/Components/Common/Core/Button/ButtonGroup";
import EnhancedTable from "@/Components/Common/Core/EnhancedTable";
import IconViewer from "@/Components/Common/Core/IconViewer";
import Tooltip from "@/Components/Common/Core/Tooltip/Basic";
import { ConvertDate } from "@/Constants";
import { MultiPointColumns } from "@/Interfaces";
import { ReactComponent as Refresh } from "@/assets/images/icons/refresh.svg";
import Location from "@/assets/svg/location_pin.svg";
import { getTranslate } from "@/language";
import {
  getMultiPointsList,
  getShapeById,
  setMultiPageIndex,
  setMultiPageSize,
  setMultiSearch,
} from "@/store/Actions/Map";
import { tableType } from "@/store/Actions/Root";
import { RootState } from "@/store/interfaces";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BoxTable, SearchInput } from "../../../Style";
import MultiPointMap from "./components/modal/MultiPointMap";

const MultiTable = () => {
  const dispatch = useDispatch();
  const translate = getTranslate();
  const {
    map_list_multi,
    map_list_page_size,
    map_list_page_index,
    listLoading,
    map_list_search,
  } = useSelector((state: RootState) => state.map);
  const { modal } = useSelector((state: RootState) => state.root);
  const [getSelectedPoint, setSelectedPoint] = useState<number>();
  const [debouncedSelectedItem, setDebouncedSelectedItem] =
    useState<string>("");

  useEffect(() => {
    if (debouncedSelectedItem && map_list_search) {
      dispatch(getMultiPointsList() as any);
    }
    const timerId = setTimeout(() => {
      setDebouncedSelectedItem(map_list_search);
    }, 1500);
    if (map_list_search === "" && debouncedSelectedItem) {
      dispatch(getMultiPointsList() as any);
      setDebouncedSelectedItem("");
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [map_list_search, debouncedSelectedItem]);

  const headCells = [
    {
      id: "nameRayDb",
      label: "نام عارضه",
      width: 100,
      align: "center" as const,
      format: (row: MultiPointColumns) => row.nameRayDb ?? "___",
    },
    {
      id: "dateRayDb",
      label: "تاریخ",
      width: 120,
      align: "center" as const,
      format: (row: MultiPointColumns) => ConvertDate(row.dateRayDb) ?? "___",
    },
    {
      id: "more",
      label: "",
      width: 140,
      align: "center" as const,
      format: (row: MultiPointColumns, index: number) => (
        <Tooltip text="مشاهده" position={index === 0 ? "bottom" : "right"}>
          <Box
            onClick={() => {
              const data: any = {
                id: row.idRayDb,
              };
              setSelectedPoint(row.lineTypeRayDb);
              dispatch(getShapeById(data) as any);
            }}
          >
            <IconViewer
              src={Location}
              alt={`${Location}`}
              style={{ width: "24px", height: "24px", margin: "0 12px" }}
            />
          </Box>
        </Tooltip>
      ),
    },
  ];

  const clearSearch = () => {
    dispatch(setMultiSearch("") as any);
  };

  return (
    <div>
      <EnhancedTable
        tableHead={headCells}
        tableData={map_list_multi?.data?.list ?? []}
        dataLength={map_list_multi?.data?.totalNumber ?? 0}
        pageSize={map_list_page_size}
        pageIndex={map_list_page_index}
        handlePageChange={() => {
          dispatch(getMultiPointsList() as any);
        }}
        setPageSize={(pageSize: number) => {
          dispatch(setMultiPageSize(pageSize) as any);
        }}
        setPageIndex={(pageIndex: number) => {
          dispatch(setMultiPageIndex(pageIndex) as any);
        }}
        listLoading={listLoading}
        tableSetting={
          <BoxTable>
            <Box
              style={{
                margin: "16px 0px 0 0px",
              }}
            >
              <ButtonGroup
                firstLabel="عارضه نقطه ای"
                secondLabel="عارضه خطی"
                firstOnClick={() => {
                  dispatch(tableType("Point"));
                }}
                secondOnClick={() => {
                  dispatch(tableType("Multipoint"));
                }}
                defaultActive={2}
              />
            </Box>
            <Box
              style={{
                width: "250px",
              }}
            >
              <SearchInput
                type="text"
                placeholder={translate.searchCoordinate}
                onChange={(e) => {
                  dispatch(setMultiSearch(e.target.value) as any);
                }}
                value={map_list_search}
                icon={
                  map_list_search && (
                    <Box style={{ margin: "0 0 0 8px" }}>
                      <Refresh onClick={clearSearch} />
                    </Box>
                  )
                }
              />
            </Box>
          </BoxTable>
        }
        updateSelectedItems={() => {}}
        changeImage={false}
      />

      {modal.name === "عارضه" && <MultiPointMap isType={getSelectedPoint} />}
    </div>
  );
};

export default MultiTable;
