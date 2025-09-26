import {
  BoxHeaderSec,
  TBody,
  TBodyImage,
  TDStyle,
  THead,
  THStyle,
} from "@/Components/Common/Core/EnhancedTable/Style";
import { ReactComponent as DownUp } from "@/assets/svg/down-sort.svg";
import { ReactComponent as MultiPoint } from "@/assets/svg/project/multiPoint.svg";
import { ReactComponent as Point } from "@/assets/svg/project/pointtable.svg";
import { ReactComponent as Refresh } from "@/assets/svg/refresh.svg";
import { ReactComponent as SortUpDark } from "@/assets/svg/up-sort-dark.svg";
import { ReactComponent as SortUp } from "@/assets/svg/up-sort.svg";
import {
  addSelectedCheckbox,
  removeSelectedCheckbox,
} from "@/store/Actions/Root";
import { RootState } from "@/store/interfaces";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled, useTheme } from "styled-components";
import Box from "../Box";
import { LeftArrow, RightArrow } from "../Icon/CustomArrow";
import Checkbox from "../Input/Checkbox";
import Select from "../Input/Select";
import Tooltip from "../Tooltip/Basic";
import { StyledRecorde, StyledTable, StyledTableWrapper } from "./Style";

const TableSetting = styled(Box)`
  width: 100% !important;
`;
interface Column {
  id: string;
  label: string;
  width: string | number;
  align: "left" | "right" | "center";
  format?: (value: any, index: number) => React.ReactNode;
}

interface EnhancedTableProps {
  headerColor?: string;
  tableHead: Column[];
  pageSize: number;
  pageIndex: number;
  dataLength: number;
  rowsPerPageOptions?: number[];
  handlePageChange: any;
  setPageSize: (pageSize: number) => void;
  setPageIndex: (pageIndex: number) => void;
  tableData: any[];
  listLoading: boolean;
  showCheckbox?: boolean;
  dontRefresh?: boolean;
  fadeInRows?: boolean;
  changeImage?: boolean;
  tableSetting?: React.ReactNode;
  onRowClick?: (rowData: any) => void;
  updateSelectedItems: (items: any[]) => void;
  hasGrid?: any;
}

const EnhancedTable: React.FC<EnhancedTableProps> = ({
  tableHead,
  pageSize,
  pageIndex,
  dataLength,
  rowsPerPageOptions = [10, 25, 50],
  handlePageChange,
  setPageSize,
  setPageIndex,
  tableData,
  listLoading,
  showCheckbox = false,
  changeImage = false,
  dontRefresh = false,
  tableSetting,
  fadeInRows = true,
  onRowClick,
  updateSelectedItems,
  hasGrid,
}: EnhancedTableProps) => {
  const theme = useTheme().palette;
  const dispatch = useDispatch();
  const [sortingColumn, setSortingColumn] = useState<string | null>(null);
  const [sortingOrder, setSortingOrder] = useState<"asc" | "desc">("asc");
  const [tableDataNew, setTableData] = useState<any[]>([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<number[]>([]);
  const [hoveredColumn, setHoveredColumn] = useState<any | null>(null);
  const dataTable = useSelector((state: RootState) => state?.root);
  const handleChangePage = (newPage: number) => {
    setPageIndex(newPage + 1);
    setSelectedCheckboxes([]);
    updateSelectedItems([]);
  };

  useEffect(() => {
    if (dataTable.isRefresh) {
      setSelectedCheckboxes([]);
    }
  }, [dataTable.isRefresh]);

  useEffect(() => {
    setTableData(tableData);
  }, []);

  useEffect(() => {
    handlePageChange();
  }, [pageSize, pageIndex]);

  useEffect(() => {
    setTableData(tableData);
  }, [tableData]);

  const handleChangePagePrev = (newPage: number) => {
    setPageIndex(newPage - 1);
    setSelectedCheckboxes([]);
    updateSelectedItems([]);
  };

  // Table Record handle
  const handleChangeRowsPerPage = (selectedPageSize: number) => {
    setPageSize(selectedPageSize);
    setPageIndex(1);
    setSelectedCheckboxes([]);
    updateSelectedItems([]);
  };
  const handleSelectAllCheckboxes = () => {
    const allCheckboxValues = tableData.map((row) => row.id);
    setSelectedCheckboxes(allCheckboxValues);
    // Update selectedItems state with all selected checkboxes
    const selectedRows = tableData.filter((row) =>
      allCheckboxValues.includes(row.id)
    );
    updateSelectedItems(selectedRows);
    dispatch(addSelectedCheckbox(selectedRows));
  };

  const handleDeselectAllCheckboxes = () => {
    // Update selectedItems state to remove all checkboxes
    setSelectedCheckboxes([]);
    updateSelectedItems([]);
    dispatch(removeSelectedCheckbox(selectedCheckboxes));
  };

  const handleCheckboxChange = (value: number) => {
    const updatedSelectedCheckboxes = selectedCheckboxes.includes(value)
      ? selectedCheckboxes.filter((item) => item !== value)
      : [...selectedCheckboxes, value];

    setSelectedCheckboxes(updatedSelectedCheckboxes);
    const updatedSelectedItems = tableData.filter((row) =>
      updatedSelectedCheckboxes.includes(row.id)
    );

    updateSelectedItems(updatedSelectedItems);
    dispatch(addSelectedCheckbox(updatedSelectedItems));
  };

  const notNaN = Math.ceil(dataLength / pageSize);

  const sortedData = useMemo(() => {
    if (!sortingColumn) return tableDataNew;

    return [...tableDataNew]?.sort((a, b) => {
      let aValue = a[sortingColumn];
      let bValue = b[sortingColumn];
      aValue = isNaN(aValue) ? aValue : parseFloat(aValue);
      bValue = isNaN(bValue) ? bValue : parseFloat(bValue);
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortingOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return sortingOrder === "asc" ? aValue - bValue : bValue - aValue;
    });
  }, [tableDataNew, sortingColumn, sortingOrder]);
  // Sort Table Data
  const handleSort = (column: any) => {
    const newSortOrder =
      sortingColumn === column.id && sortingOrder === "asc" ? "desc" : "asc";
    setSortingColumn(column.id);
    setSortingOrder(newSortOrder);
  };

  return (
    <div>
      <BoxHeaderSec>
        <TableSetting>{tableSetting}</TableSetting>
        <StyledRecorde>
          {!dontRefresh && (
            <Tooltip text={"بروزرسانی جدول"}>
              <div
                style={{
                  background: "#3C4F65",
                  padding: "10px",
                  borderRadius: "16px",
                  margin: "-8px 0 0 10px",
                  cursor: "pointer",
                }}
                onClick={() => handlePageChange()}
              >
                <Refresh />
              </div>
            </Tooltip>
          )}
          <Tooltip text="تعداد ردیف">
            <Select
              label={``}
              options={rowsPerPageOptions.map((option) => ({
                value: option,
                label: option,
              }))}
              onChange={(selectedOption) =>
                handleChangeRowsPerPage(selectedOption.value)
              }
              style={{ width: "60px", margin: "-5px 0 0 8px" }}
              value={pageSize}
              dontClose
            />
          </Tooltip>
          <div
            style={{
              display: "flex",
              width: "100px",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "3px",
            }}
          >
            <Tooltip text="صفحه بعدی">
              <LeftArrow
                onClick={() => handleChangePage(pageIndex)}
                isDisabled={pageIndex >= notNaN}
              />
            </Tooltip>

            <Tooltip text="تعداد کل">
              <p style={{ margin: "1px 0 0 5px", cursor: "default" }}>
                {notNaN}
              </p>
            </Tooltip>
            <span>-</span>
            <Tooltip text="صفحه فعلی">
              <p style={{ margin: "1px 3px 0 0", cursor: "default" }}>
                {pageIndex}
              </p>
            </Tooltip>
            <Tooltip text="صفحه قبلی">
              <RightArrow
                onClick={() => handleChangePagePrev(pageIndex)}
                isDisabled={pageIndex === 1}
              />
            </Tooltip>
          </div>
          {hasGrid}
        </StyledRecorde>
      </BoxHeaderSec>
      <div>
        <StyledTableWrapper
          style={{
            overflowX: tableData?.length > 10 ? "auto" : "visible",
            margin: "0 0 150px !important",
          }}
        >
          <StyledTable
            className={tableData && fadeInRows ? "fade-in" : "fade-off"}
          >
            {tableData && dataLength && !listLoading ? (
              <>
                <thead>
                  <tr>
                    {showCheckbox && (
                      <THStyle>
                        <Checkbox
                          label=""
                          checked={
                            selectedCheckboxes.length === tableData.length
                          }
                          onChange={
                            selectedCheckboxes.length === tableData.length
                              ? handleDeselectAllCheckboxes
                              : handleSelectAllCheckboxes
                          }
                        />
                      </THStyle>
                    )}
                    <TDStyle
                      align="center"
                      style={{
                        fontWeight: 600,
                        borderRadius: !showCheckbox ? "0 16px 0 0" : "0",
                      }}
                    >
                      ردیف
                    </TDStyle>
                    {tableHead?.map((headCell: Column, index) => (
                      <THead
                        style={{
                          // minWidth: headCell.width,
                          // maxWidth: headCell.width,
                          minWidth: `${headCell.width}px`,
                          background: "#28405a",
                          color: theme.neutral[0],
                          borderRadius:
                            index === tableHead.length - 1 ? "16px 0 0 0" : "0",
                          textAlign: headCell.align,
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                        key={headCell.id}
                        align={headCell.align}
                        onClick={() => handleSort(headCell)}
                        onMouseEnter={() => setHoveredColumn(headCell.id)}
                        onMouseLeave={() => setHoveredColumn(null)}
                      >
                        {headCell.label}
                        {!["empty", "more"].includes(headCell?.id) &&
                          hoveredColumn === headCell.id &&
                          sortingColumn !== headCell.id && (
                            <SortUpDark width="15px" height="15px" />
                          )}
                        {!["empty", "more"].includes(headCell?.id) &&
                        sortingColumn === headCell.id ? (
                          sortingOrder === "asc" ? (
                            <SortUp width="15px" height="15px" />
                          ) : (
                            <DownUp width="15px" height="15px" />
                          )
                        ) : null}
                      </THead>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedData?.map((row: any, index: number) => (
                    <tr key={index}>
                      {showCheckbox && (
                        <td
                          style={{
                            margin: "0 -50px 0 0 !important",
                          }}
                        >
                          <Checkbox
                            label=""
                            checked={selectedCheckboxes.includes(row.id)}
                            onChange={() => handleCheckboxChange(row.id)}
                          />
                        </td>
                      )}
                      <td align="center">
                        {(pageIndex - 1) * pageSize + index + 1}
                      </td>
                      {tableHead?.map((column: Column, key: number) => {
                        return (
                          <TBody
                            className="isHover"
                            key={key}
                            align={column.align}
                            onClick={() =>
                              onRowClick &&
                              column.id !== "more" &&
                              onRowClick(row)
                            }
                            $column={column}
                            $index={index}
                            style={{
                              textAlign: column.align,
                              cursor: "pointer",
                            }}
                          >
                            {column.format ? column.format(row, index) : null}
                          </TBody>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </>
            ) : (
              <>
                <thead>
                  <tr>
                    <TDStyle
                      align="center"
                      style={{
                        fontWeight: 600,
                        borderRadius: "0 16px 0 0",
                      }}
                    >
                      ردیف
                    </TDStyle>
                    {tableHead?.map((headCell: Column, index) => (
                      <THead
                        style={{
                          minWidth: headCell.width,
                          background: "#28405a",
                          color: theme.neutral[0],
                          borderRadius:
                            index === tableHead.length - 1 ? "16px 0 0 0" : "0",
                          textAlign: headCell.align,
                          fontWeight: 600,
                        }}
                        key={headCell.id}
                        align={headCell.align}
                        onClick={() => handleSort(headCell)}
                      >
                        {headCell.label}
                      </THead>
                    ))}
                  </tr>
                </thead>
                <tbody
                  style={{
                    border: "none",
                  }}
                >
                  <TBodyImage $isPoint={changeImage}>
                    <td>
                      <>
                        {changeImage ? (
                          <Point
                            style={{
                              width: "250px",
                              height: "250px",
                            }}
                          />
                        ) : (
                          <MultiPoint
                            style={{
                              width: "500px",
                              height: "250px",
                            }}
                          />
                        )}
                      </>
                      <p>عارضه ای یافت نشد</p>
                      <div />
                    </td>
                  </TBodyImage>
                </tbody>
              </>
            )}
          </StyledTable>
        </StyledTableWrapper>
        <div></div>
      </div>
    </div>
  );
};

export default EnhancedTable;
