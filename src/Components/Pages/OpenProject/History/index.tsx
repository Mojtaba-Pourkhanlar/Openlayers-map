import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Core
import Box from "@/Components/Common/Core/Box";
import EnhancedTable from "@/Components/Common/Core/EnhancedTable";
import Tooltip from "@/Components/Common/Core/Tooltip/Basic";
import { setModal } from "@/store/Actions/Root";
import MapModal from "./components/MapModal";
// Types
import { HistoryColumns } from "@/Interfaces";
import { RootState } from "@/store/interfaces";
// Lang
import { getTranslate } from "@/language";
// Store
import {
  getHistoryList,
  getHistoryMultiPoint,
  redirectPage,
  setHistoryPageIndex,
  setHistoryPageSize,
  setPointType,
} from "@/store/Actions/History";
// Icon
import { ReactComponent as FilterIcon } from "@/assets/svg/filter.svg";
// Style
import ButtonGroup from "@/Components/Common/Core/Button/ButtonGroup";
import Stack from "@/Components/Common/Utils/Stack";
import { ConvertDate } from "@/Constants";
import { BTNSetting } from "../Style";
import Filter from "./components/Filter";
import { BoxTable, BoxText } from "./Style";

const History = () => {
  const dispatch = useDispatch();
  const translate = getTranslate();
  const {
    beforeIndex,
    historyList,
    historyLoading,
    pageSize,
    featureType,
    isRedirect,
  } = useSelector((state: RootState) => state.history);
  const { modal } = useSelector((state: RootState) => state.root);
  const [getSelectedPoint, setSelectedPoint] = useState<HistoryColumns>();

  const [headCells, setHeadCells] = useState([
    {
      id: "name",
      label: "نام عارضه",
      width: 130,
      align: "center" as const,
      format: (row: HistoryColumns) => {
        if (row.status === "updated") {
          return (
            <Stack justifyContent="center" alignItems="center">
              {row.FeatureAfter.properties.name ===
              row.featureBefore.properties.name ? (
                <p
                  style={{
                    padding: "0",
                    margin: "0",
                  }}
                >
                  {row.FeatureAfter.properties.name}
                </p>
              ) : (
                <BoxText>
                  <p>{row.FeatureAfter.properties.name}</p>
                  <p>{row.featureBefore.properties.name}</p>
                </BoxText>
              )}
            </Stack>
          );
        } else {
          return (
            <p
              style={{
                padding: "0",
                margin: "0",
              }}
            >
              {row.feature.properties.name}
            </p>
          );
        }
      },
    },
    {
      id: "status",
      label: "وضعیت",
      width: 100,
      align: "center" as const,
      format: (row: HistoryColumns) => row.status ?? "___",
    },
    {
      id: "fullName",
      label: "ایجاد شده توسط",
      width: 120,
      align: "center" as const,
      format: (row: HistoryColumns) =>
        row.status === "updated"
          ? row.FeatureAfter?.properties?.fullName
          : row.feature?.properties?.fullName ?? "___",
    },
    {
      id: "createAt",
      label: "تاریخ ایجاد",
      width: 120,
      align: "center" as const,
      format: (row: HistoryColumns) =>
        row.status === "updated"
          ? ConvertDate(row.FeatureAfter?.properties?.createAt)
          : ConvertDate(row.feature?.properties?.createAt) ?? "___",
    },
  ]);

  useEffect(() => {
    if (isRedirect) {
      if (featureType === "multipoint") {
        const data: any = {
          multiPointName:
            getSelectedPoint?.status === "updated"
              ? getSelectedPoint?.FeatureAfter?.properties?.name
              : getSelectedPoint?.feature?.properties?.name,
          status: getSelectedPoint?.status,
        };
        if (getSelectedPoint?.status === "updated") {
          data.prevUUID = getSelectedPoint?.featureBefore?.properties?.uuid;
          data.uuid = getSelectedPoint?.FeatureAfter?.properties?.uuid;
          data.multiPointNamePrev =
            getSelectedPoint?.featureBefore?.properties?.name;
        } else {
          data.uuid = getSelectedPoint?.feature?.properties?.uuid;
        }
        dispatch(getHistoryMultiPoint(data) as any);
      }
    }
  }, [isRedirect]);

  const handleMoreClick = (row: any) => {
    setSelectedPoint(row);
    dispatch(redirectPage(true));
    if (featureType === "point") {
      dispatch(setModal({ name: "نقشه", mode: "detail" }));
    }
  };

  useEffect(() => {
    setHeadCells((prevCells) => {
      const moreIndex = prevCells.findIndex((cell) => cell.id === "more");
      if (featureType === "multipoint") {
        return prevCells.filter(
          (cell) => cell.id !== "longitude" && cell.id !== "latitude"
        );
      }
      if (
        featureType === "point" &&
        !prevCells.some((cell) => cell.id === "longitude")
      ) {
        const pointColumns = [
          {
            id: "longitude",
            label: "طول جغرافیایی",
            width: 120,
            align: "center" as const,
            format: (row: HistoryColumns) => {
              const coordinates =
                row.status === "updated"
                  ? row.FeatureAfter?.geometry?.coordinates
                  : row.feature?.geometry?.coordinates;

              return coordinates && coordinates[1] !== undefined
                ? coordinates[1]?.toString()
                : "___";
            },
          },
          {
            id: "latitude",
            label: "عرض جغرافیایی",
            width: 120,
            align: "center" as const,
            format: (row: HistoryColumns) => {
              const coordinates =
                row.status === "updated"
                  ? row.FeatureAfter?.geometry?.coordinates
                  : row.feature?.geometry?.coordinates;

              return coordinates && coordinates[0] !== undefined
                ? coordinates[0]?.toString()
                : "___";
            },
          },
        ];
        const newCells = [...prevCells];
        newCells.splice(moreIndex, 0, ...pointColumns);
        return newCells;
      }
      return prevCells;
    });
  }, [featureType]);

  return (
    <div>
      <EnhancedTable
        tableHead={headCells}
        tableData={historyList?.data?.list ?? []}
        dataLength={historyList?.data?.totalCount ?? 0}
        pageSize={pageSize}
        pageIndex={beforeIndex}
        handlePageChange={() => {
          dispatch(getHistoryList({ featureType: featureType }) as any);
        }}
        setPageSize={(pageSize: number) => {
          dispatch(setHistoryPageSize(pageSize) as any);
        }}
        setPageIndex={(pageIndex: number) => {
          dispatch(setHistoryPageIndex(pageIndex) as any);
        }}
        listLoading={historyLoading}
        onRowClick={handleMoreClick}
        tableSetting={
          <BoxTable>
            <Box style={{ margin: "0 0 -20px 0" }}>
              <ButtonGroup
                firstLabel="عارضه نقطه ای"
                secondLabel="عارضه خطی"
                firstOnClick={() => {
                  dispatch(setHistoryPageIndex(1) as any);
                  dispatch(setPointType("point"));
                  dispatch(getHistoryList({ featureType: "point" }) as any);
                }}
                secondOnClick={() => {
                  dispatch(setHistoryPageIndex(1) as any);
                  dispatch(setPointType("multipoint"));
                  dispatch(
                    getHistoryList({ featureType: "multipoint" }) as any
                  );
                }}
              />
            </Box>
            <Box style={{ margin: "0 0 -5px 0" }}>
              <Tooltip text={translate.filter}>
                <BTNSetting
                  label={""}
                  variant="contained"
                  endIcon={
                    <FilterIcon
                      style={{
                        width: "27px",
                        height: "27px",
                        margin: "-5px -9px 0 0",
                      }}
                    />
                  }
                  onClick={() => {
                    dispatch(
                      setModal({ name: translate.filter, mode: "Filter" })
                    );
                  }}
                />
              </Tooltip>
            </Box>
          </BoxTable>
        }
        updateSelectedItems={() => {}}
        changeImage={featureType !== "multipoint"}
      />
      {modal.name === "نقشه" && (
        <MapModal selectedPoint={getSelectedPoint} featureType={featureType} />
      )}
      {modal.name === translate.filter && <Filter />}
    </div>
  );
};

export default History;
