import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
// Core
import Box from "@/Components/Common/Core/Box";
import Tooltip from "@/Components/Common/Core/Tooltip/Basic";
// redux
import { downloadProject, uploadProject } from "@/store/Actions/Projects";
// Icon
import { ReactComponent as Add } from "@/assets/svg/add.svg";
import { ReactComponent as Delete } from "@/assets/svg/delete.svg";
import { ReactComponent as Download } from "@/assets/svg/download.svg";
import { ReactComponent as Upload } from "@/assets/svg/uploadFile.svg";
// style
import { getTranslate } from "@/language";
import { clearIsRefresh, setModal } from "@/store/Actions/Root";
import { RootState } from "@/store/interfaces";
import CreateProject from "./components/modal/CreateProject";
import ModalDelete from "./components/modal/DeleteProject";
import {
  BtnDelete,
  BtnDownload,
  BtnProject,
  BtnUpload,
  ProjectPage,
  ProjectPageName,
} from "./Style";
import TableProject from "./TableProject";
import ListProject from "./ListProject";
const ProjectComponent = () => {
  const translate = getTranslate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const listMode = searchParams.get("mode") ?? "list";
  const [deleteProject, setDeleteProject] = useState<any>(null);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const { modal } = useSelector((state: RootState) => state?.root);

  const handleDelete = useCallback(() => {
    const projectIds = selectedItems.map((item) => item.guid);
    const projectOwnerIds = selectedItems.map((item) => item.customerId);
    if (projectIds.length > 0) {
      dispatch(setModal({ name: translate.deleteProject, mode: "Delete" }));
      setDeleteProject({
        projectIds: JSON.stringify(projectIds),
        ownerId: JSON.stringify(projectOwnerIds[0]),
      });
    }
  }, [selectedItems, dispatch, translate]);

  const handleDownload = useCallback(() => {
    const paths = selectedItems.map((item) => item.guid);
    const customerId = selectedItems[0]?.customerId;
    if (paths.length > 0 && customerId) {
      dispatch(
        downloadProject({ paths: JSON.stringify(paths), customerId }) as any
      );
    }
  }, [selectedItems, dispatch]);

  const handleCreated = useCallback(() => {
    dispatch(setModal({ name: translate.createProject, mode: "Create" }));
  }, [dispatch, translate]);

  const selectFile = () => {
    document.getElementById("filedemo")?.click();
  };
  const newApi = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("createdIn", "RayCloud");
        dispatch(uploadProject(formData) as any);
        dispatch(clearIsRefresh());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("mode", listMode);
    setSearchParams(params);
  }, []);
  return (
    <Box style={{ marginTop: "20px" }}>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <input
          style={{ display: "none" }}
          id="filedemo"
          type="file"
          onChange={newApi}
        />

        <ProjectPage>
          <ProjectPageName>لیست پروژه ها</ProjectPageName>
        </ProjectPage>
        <Box>
          {listMode === "table" && (
            <>
              <Tooltip text={"حذف پروژه"}>
                <BtnDelete
                  label={""}
                  variant="contained"
                  onClick={() => handleDelete()}
                  endIcon={
                    <Delete
                      style={{
                        width: "25px",
                        height: "25px",
                        margin: "-5px -8px 0 0",
                      }}
                    />
                  }
                  disabled={selectedItems.length === 0}
                  $isactive={selectedItems.length === 0 ? true : false}
                />
              </Tooltip>
              <Tooltip text={translate.download}>
                <BtnUpload
                  disabled={selectedItems.length === 0}
                  $isactive={selectedItems.length === 0 ? true : false}
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
                  onClick={() => handleDownload()}
                />
              </Tooltip>
            </>
          )}
          <Tooltip text={translate.uploadFile}>
            <BtnDownload
              label={""}
              variant="contained"
              endIcon={
                <Upload
                  style={{
                    width: "25px",
                    height: "25px",
                    margin: "-5px -8px 0 0",
                  }}
                />
              }
              onClick={selectFile}
            />
          </Tooltip>
          <Tooltip text={"ایجاد پروژه"}>
            <BtnProject
              label={""}
              variant="contained"
              onClick={() => handleCreated()}
              endIcon={
                <Add
                  style={{
                    width: "25px",
                    height: "25px",
                    margin: "-5px -8px 0 0",
                  }}
                />
              }
            />
          </Tooltip>
        </Box>
      </Box>

      <Box>
        {listMode === "list" ? (
          <>
            <ListProject
              listMode={listMode}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              deleteProject={deleteProject}
              setDeleteProject={setDeleteProject}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          </>
        ) : (
          <>
            <TableProject
              listMode={listMode}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              deleteProject={deleteProject}
              setDeleteProject={setDeleteProject}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          </>
        )}
      </Box>
      {modal.name === translate.createProject && <CreateProject />}
      {modal.name === translate.deleteProject && (
        <ModalDelete deletePro={deleteProject} />
      )}
    </Box>
  );
};

export default ProjectComponent;
