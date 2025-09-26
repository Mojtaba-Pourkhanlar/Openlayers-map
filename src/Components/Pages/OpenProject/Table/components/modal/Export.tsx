import Box from "@/Components/Common/Core/Box";
import { BtnComponent } from "@/Components/Common/Core/Button";
import Select from "@/Components/Common/Core/Input/Select";
import { closeModal, removeSelectedCheckbox } from "@/store/Actions/Root";
import { RootState } from "@/store/interfaces";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@/Components/Common/Core/Input/TextFaild";
import { useEffect, useState } from "react";
import Checkbox from "@/Components/Common/Core/Input/Checkbox";
import Typography from "@/Components/Common/Core/Typography";
import Excle from "../format";
import { getMapList } from "@/store/Actions/Map";
import { ReactComponent as Close } from "@/assets/svg/closeAll.svg";
import NewDxf from "../format/NewDxf";
import KML from "../format/KML";
import KMZ from "../format/KMZ";
import Geojson from "../format/Geojson";
import Shp from "../format/Shp";
import { BoxClose, BoxHeader, ModalContainer, TextHeader } from "./Style";
import { getTranslate } from "@/language";
import { useTheme } from "styled-components";
import { Modal } from "@/Components/Common/Core/Modal";

const ModalExport = () => {
  const translate = getTranslate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState<string>("");
  const [check, setCheck] = useState<boolean>(false);
  const [clear, setClear] = useState<boolean>(false);
  const [format, setFormat] = useState("");
  const [separator, setSeparator] = useState("");
  const rootState = useSelector((state: RootState) => state?.root);
  const { name } = useSelector((state: RootState) => state?.project);

  const map = useSelector((state: RootState) => state?.map);
  const { modal, totalNumber, selectedCheckboxes } = rootState;
  const { map_guid, map_list, header } = map;

  // Action
  const columns: string[] = [
    "Number_ray_db",
    "name_ray_db",
    "Easting",
    "Northing",
    "height_ray_db",
    "lat_ray_db",
    "lon_ray_db",
    "hrms_ray_db",
    "vrms_ray_db",
    "pdop_ray_db",
    "age_ray_db",
    "date_ray_db",
  ];

  const test: string[] = header ?? columns;

  const data = {
    pageSize: totalNumber,
    pageIndex: 1,
    guid: map_guid,
    pointName: "",
    columns: JSON.stringify(header ?? columns),
  };

  useEffect(() => {
    if (selectedCheckboxes.length === 0) {
      dispatch(getMapList(data) as any);
    }
  }, [dispatch, selectedCheckboxes.length]);

  useEffect(() => {
    if (!fileName && clear) {
      setFileName("");
    } else if (!fileName && !clear) {
      setFileName(name);
    }
  }, [fileName, clear]);

  const options = [
    { value: "csv", label: "CSV" },
    { value: "txt", label: "TXT" },
    { value: "dxf", label: "DXF" },
    { value: "geojson", label: "GeoJson" },
    { value: "shp", label: "Shapefile" },
    { value: "kml", label: "KML" },
    { value: "kmz", label: "KMZ" },
  ];

  const separatorList = [
    { value: "#", label: "#" },
    { value: ";", label: ";" },
    { value: ",", label: "," },
  ];

  const handleSeparatorList = (item: any) => {
    setSeparator(item.value);
  };
  const handleSelectChange = (item: any) => {
    setFormat(item.value);
    setFileName("");
    clearSeparatorList();
    setSeparator("");
  };
  const clearHandleSelectChange = () => {
    setFormat("");
  };
  const clearSeparatorList = () => {
    setSeparator("");
  };

  const closeModalExport = () => {
    dispatch(closeModal());
    const clear = selectedCheckboxes.map((item) => item.id);
    dispatch(removeSelectedCheckbox(clear));
  };

  const handleRefresh = () => {
    setClear(true);
    setFileName("");
  };

  const splitData = test.map((item: string) => item.split("_ray_db")[0]);

  const customeData = (data: any) => {
    let getNeededData;
    getNeededData = data.map((item: any) => {
      let needData: any = {};
      splitData.forEach((key) => {
        if (key in item) {
          needData[key] = item[key];
        }
      });
      return needData;
    });

    return getNeededData;
  };

  const fileData =
    selectedCheckboxes.length === 0
      ? customeData(map_list?.data?.list)
      : customeData(selectedCheckboxes);

  return (
    <>
      <Modal
        onClose={() => closeModalExport()}
        show={modal.name === translate.export}
        title={translate.exportData}
        width={500}
      >
        <Box>
          <div style={{ margin: "10px 0" }}>
            <Select
              label={translate.typeFormat}
              options={options}
              value={format}
              onChange={handleSelectChange}
              style={{ margin: "20px 0" }}
              changedesign={true}
              clear={clearHandleSelectChange}
            />
            <TextField
              style={{
                background: theme.palette.neutral[0],
                borderColor: theme.palette.neutral[300],
              }}
              placeholder={translate.fileNAme}
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              icon={
                fileName && (
                  <Box style={{ margin: "0 0 0 8px", zIndex: "0" }}>
                    <Close onClick={() => handleRefresh()} />
                  </Box>
                )
              }
            />
            <>
              {format === "txt" || format === "csv" ? (
                <Box style={{ margin: "10px 0 20px" }}>
                  <Select
                    label={translate.seprator}
                    options={separatorList}
                    value={separator}
                    onChange={handleSeparatorList}
                    changedesign={true}
                    clear={clearSeparatorList}
                  />
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "15px",
                    }}
                  >
                    <Checkbox
                      label=""
                      checked={check}
                      onChange={() => setCheck(!check)}
                    />
                    <Typography style={{ margin: "0 15px" }}>
                      {translate.headline}
                    </Typography>
                  </Box>
                </Box>
              ) : null}

              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "30px 0 20px",
                }}
              >
                <BtnComponent
                  onClick={() => closeModalExport()}
                  label="انصراف"
                  variant="text"
                  style={{ color: theme.palette.primary[900], width: "124px" }}
                />
                {format === "dxf" ? (
                  <NewDxf
                    disable={fileName === ""}
                    nameFile={fileName}
                    points={fileData}
                  />
                ) : format === "kml" ? (
                  <KML
                    disable={fileName === ""}
                    nameFile={fileName}
                    points={fileData}
                  />
                ) : format === "kmz" ? (
                  <KMZ
                    disable={fileName === ""}
                    nameFile={fileName}
                    points={fileData}
                  />
                ) : format === "geojson" ? (
                  <Geojson
                    disable={fileName === ""}
                    nameFile={fileName}
                    points={fileData}
                  />
                ) : format === "shp" ? (
                  <Shp
                    disable={fileName === ""}
                    nameFile={fileName}
                    points={fileData}
                  />
                ) : (
                  <Excle
                    tableHeader={columns.map((item) =>
                      item.replace(/_ray_db$/, "")
                    )}
                    tableData={fileData}
                    formatFile={format}
                    titr={check}
                    nameFile={fileName}
                    wordSeparator={separator}
                    disable={format === "" || fileName === ""}
                  />
                )}
              </Box>
            </>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ModalExport;
