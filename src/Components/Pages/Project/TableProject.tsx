import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// Core
import Box from "@/Components/Common/Core/Box";
import DateConverter from "@/Components/Common/Core/DateConverter";
import EnhancedTable from "@/Components/Common/Core/EnhancedTable";
import Tooltip from "@/Components/Common/Core/Tooltip/Basic";
// redux
import { clearMapCoordinate, getEPSG, getMapGuid } from "@/store/Actions/Map";
import {
  getAllProjectUsers,
  openProject,
  projectName,
  setProjectPageIndex,
  setProjectPageSize,
  useDataFetching,
} from "@/store/Actions/Projects";
import { RootState } from "@/store/interfaces";
// Icon
import { ReactComponent as Delete } from "@/assets/svg/delete.svg";
import { ReactComponent as PermissionsIcon } from "@/assets/svg/project/permissions.svg";
// style
import ListGroup from "@/Components/Common/Core/Button/Custome";
import { handleEPSG } from "@/Constants";
import { convertSize, textLength } from "@/Hook";
import { ProjectColumns } from "@/Interfaces";
import { ReactComponent as Refresh } from "@/assets/images/icons/refresh.svg";
import { getTranslate } from "@/language";
import { clearAll, clearIsRefresh, setModal } from "@/store/Actions/Root";
import { BoxTable, SearchInput } from "./Style";
import Filter from "./components/modal/Filter";
import Permission from "./components/modal/Permission";
const TableProject = ({
  listMode,
  searchParams,
  setSearchParams,
  deleteProject,
  setDeleteProject,
  selectedItems,
  setSelectedItems,
}: any) => {
  const translate = getTranslate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [pointName, setPointName] = useState("");
  const [projectId, setProjectId] = useState("");
  const [searchParamsS, setSearchParamsS] = useState({
    epsg: "",
    guid: "",
    name: "",
  });
  const {
    id,
    route,
    persistentRoute,
    project_page_size,
    project_page_index,
    listLoading,
    openproject,
  } = useSelector((state: RootState) => state?.project);
  const epsg = useSelector((state: RootState) => state?.map.epsg);
  const { modal, isRefresh } = useSelector((state: RootState) => state?.root);
  // Action
  const url = "/api/v1/projectList";
  const params = {
    pageSize: project_page_size,
    pageIndex: project_page_index,
    fileName: pointName ?? "",
  };
  const { data, mutate: mutateData } = useDataFetching(url, params);

  useEffect(() => {
    return () => {
      dispatch(setProjectPageSize(10) as any);
      dispatch(setProjectPageIndex(1) as any);
      dispatch(clearMapCoordinate() as any);
      dispatch(clearAll());
    };
  }, []);

  useEffect(() => {
    if (isRefresh) {
      setSelectedItems([]);
    } else {
      mutateData();
      dispatch(clearIsRefresh());
    }
  }, [isRefresh, mutateData, dispatch]);

  useEffect(() => {
    if (route !== null && id) {
      if (!persistentRoute) {
        const params = new URLSearchParams();
        params.set("epsg", searchParamsS.epsg);
        params.set("guid", searchParamsS.guid);
        params.set("name", searchParamsS.name);
        navigate(
          `/admin/project/projectlist/${id}?${params.toString()}&tab=map`
        );
      }
    }
  }, [route, persistentRoute, id, epsg, navigate, openproject]);

  const handleRowClick = useCallback(
    (row: ProjectColumns) => {
      setSearchParamsS({
        epsg: row.epsg.toString(),
        guid: row.guid.toString(),
        name: row.name.toString(),
      });
      dispatch(getEPSG(row.epsg) as any);
      dispatch(openProject({ guid: row.guid }) as any);
      dispatch(projectName({ name: row.name, id: String(row.id) }));
      dispatch(getMapGuid(row.guid) as any);
    },
    [dispatch]
  );

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search) {
      setPointName(search);
    }
  };

  const handleRefresh = () => {
    setPointName("");
    setSearch("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (!e.target.value) {
      setPointName("");
    }
  };

  const headCells = [
    {
      id: "name",
      label: translate.name,
      width: 100,
      align: "center" as const,
      format: (row: ProjectColumns) =>
        textLength({ text: row.name, length: 20 }),
    },
    {
      id: "createdAt",
      label: translate.createdAt,
      width: 200,
      align: "center" as const,
      format: (row: ProjectColumns) => <DateConverter date={row.createdAt} />,
    },
    {
      id: "updatedAt",
      label: translate.updatedAt,
      width: 200,
      align: "center" as const,
      format: (row: ProjectColumns) => <DateConverter date={row.updatedAt} />,
    },
    {
      id: "modifiedBy",
      label: "بروز رسانی شده توسط",
      width: 200,
      align: "center" as const,
      format: (row: ProjectColumns) => (
        <p style={{ padding: "0", margin: "0 15px" }}>
          {row.modifiedBy !== " " ? (
            <p
              style={{
                margin: "0",
                padding: "0",
              }}
            >
              {row.modifiedBy}
            </p>
          ) : (
            "___"
          )}
        </p>
      ),
    },
    {
      id: "epsg",
      label: translate.epsg,
      width: 150,
      align: "center" as const,
      format: (row: ProjectColumns) =>
        row.epsg ? handleEPSG(row.epsg) : "___",
    },
    {
      id: "ownerName",
      label: "مالک پروژه",
      width: 150,
      align: "center" as const,
      format: (row: ProjectColumns) => row.ownerName ?? "___",
    },
    {
      id: "size",
      label: translate.size,
      width: 100,
      align: "center" as const,
      format: (row: ProjectColumns) => convertSize(row.size) ?? "___",
    },
    // {
    //   id: "isSync",
    //   label: translate.isSync,
    //   width: 100,
    //   align: "right" as const,
    //   format: (row: ProjectColumns) =>
    //     row.isSync ? "چندکاربره " : "تک کاربره",
    // },
    // {
    //   id: "createdIn",
    //   label: translate.createdIn,
    //   width: 100,
    //   align: "center" as const,
    //   format: (row: ProjectColumns) => row.createdIn ?? "___",
    // },
    {
      id: "more",
      label: "",
      width: 100,
      align: "center" as const,
      format: (row: ProjectColumns, index: number) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* <Tooltip text="مشاهده" position={index === 0 ? "bottom" : "right"}>
            <div
              onClick={() => handleRowClick(row)}
              style={{ width: "24px", height: "24px", margin: "0 12px" }}
            >
              <Visi />
            </div>
          </Tooltip> */}
          <Tooltip text="دسترسی ها" position={index === 0 ? "bottom" : "right"}>
            <div
              onClick={() => {
                const projectId = String(row.id);
                setProjectId(projectId);
                dispatch(getAllProjectUsers(projectId) as any);
                dispatch(
                  setModal({ name: translate.permissions, mode: "permissions" })
                );
              }}
              style={{ width: "24px", height: "24px", margin: "0 12px" }}
            >
              <PermissionsIcon />
            </div>
          </Tooltip>
          <Tooltip text="حذف" position={index === 0 ? "bottom" : "right"}>
            <div
              onClick={() => {
                dispatch(
                  setModal({ name: translate.deleteProject, mode: "Delete" })
                );
                setDeleteProject({
                  projectIds: JSON.stringify([row.guid]),
                  ownerId: row.customerId,
                });
              }}
              style={{ width: "24px", height: "24px", margin: "0 12px" }}
            >
              <Delete />
            </div>
          </Tooltip>
        </div>
      ),
    },
  ];
  const seaParams = new URLSearchParams(searchParams);

  return (
    <Box>
      <Box
        style={{
          position: "relative",
        }}
      >
        <EnhancedTable
          tableHead={headCells}
          tableData={data?.data?.list ?? []}
          dataLength={data?.data?.totalNumber ?? 0}
          pageSize={project_page_size}
          pageIndex={project_page_index}
          handlePageChange={() => {
            // useDataFetching(url, params)
          }}
          setPageSize={(pageSize: number) => {
            dispatch(setProjectPageSize(pageSize) as any);
          }}
          setPageIndex={(pageIndex: number) => {
            dispatch(setProjectPageIndex(pageIndex) as any);
          }}
          onRowClick={handleRowClick}
          listLoading={listLoading}
          showCheckbox={true}
          tableSetting={
            <BoxTable>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <SearchInput
                  onKeyDown={(e) => handleSearch(e)}
                  type="text"
                  placeholder={translate.searchProjectName}
                  onChange={(e) => handleChange(e)}
                  value={search}
                  icon={
                    pointName && (
                      <Box style={{ margin: "0 0 0 8px" }}>
                        <Refresh onClick={() => handleRefresh()} />
                      </Box>
                    )
                  }
                />
              </Box>
            </BoxTable>
          }
          hasGrid={
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                margin: "-5px 0 0 0",
              }}
            >
              <ListGroup
                defaultActive={1}
                firstOnClick={() => {
                  seaParams.set("mode", "table");
                  setSearchParams(seaParams);
                }}
                secondOnClick={() => {
                  seaParams.set("mode", "list");
                  setSearchParams(seaParams);
                }}
              />
            </Box>
          }
          updateSelectedItems={setSelectedItems}
          dontRefresh
        />
      </Box>

      {modal.name === translate.filter && <Filter />}
      {modal.name === translate.permissions && <Permission isId={projectId} />}
    </Box>
  );
};

export default TableProject;
