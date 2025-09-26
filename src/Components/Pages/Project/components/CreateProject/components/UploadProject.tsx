import { ReactComponent as CloseIcon } from "@/assets/svg/closeAll.svg";
import { ReactComponent as DocumentIcon } from "@/assets/svg/project/fileDocument.svg";
import { ReactComponent as FileIcon } from "@/assets/svg/project/fileUpload.svg";
import { BtnComponent } from "@/Components/Common/Core/Button";
import { getTranslate } from "@/language";
import { uploadAfterCreateProject } from "@/store/Actions/Projects";
import {
  clearAll,
  closeModal,
  resetStep,
  setUploadLoading,
} from "@/store/Actions/Root";
import { RootState } from "@/store/interfaces";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { DivUpload } from "../../modal/Style";

const UploadProject = () => {
  const translate = getTranslate();
  const dispatch = useDispatch();
  const theme = useTheme().palette;
  const { uploadLoading } = useSelector((state: RootState) => state?.root);
  const File_regex = /\.(geojson?)$/i;

  const [error, setError] = useState<string>("");
  const [files, setFiles] = useState<File | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(event.target.files || []);
    selectedFiles.forEach((file) => {
      if (!File_regex.test(file?.name)) {
        setError("فرمت فایل اشتباه می باشد");
      } else {
        setFiles(file);
        setError("");
      }
    });
  };

  const uploadHandler = () => {
    if (files !== null) {
      const formData = new FormData();
      formData.append("file", files);
      dispatch(uploadAfterCreateProject(formData) as any);
      setError("");
    } else {
      dispatch(closeModal());
      dispatch(clearAll());
      dispatch(resetStep());
      setFiles(null);
      setError("");
    }
  };

  return (
    <DivUpload>
      <div className="alert">
        <p style={{ margin: "0", color: "green" }}>{translate.alert1 + " "}</p>
        {translate.alert}
      </div>
      <div className="main">
        {files ? (
          <div className="Uploaded">
            <DocumentIcon style={{ margin: "0" }} />
            <span
              onClick={(e) => {
                e.stopPropagation();
                setFiles(null);
                setError("");
                dispatch(setUploadLoading(false));
              }}
            >
              <CloseIcon />
            </span>
          </div>
        ) : (
          <div
            onClick={() => {
              const fileInput = document?.getElementById("fileInput");
              if (fileInput) {
                (fileInput as HTMLInputElement).click();
              }
            }}
          >
            <FileIcon />
            <p>آپلود فایل</p>
          </div>
        )}

        <input
          id="fileInput"
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept=".geojson"
        />
        {error && files && (
          <span>
            <p>{error ?? files?.name}</p>
          </span>
        )}
      </div>
      <div className="footer">
        {/* <BtnComponent
          onClick={closeModalCreat}
          label={"انصراف"}
          variant="text"
          style={{ color: theme.primary[900], width: "124px" }}
        /> */}

        {uploadLoading ? (
          <div
            style={{
              background: theme.primary[900],
              color: theme.neutral[0],
              width: "133px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "24px",
              height: "44px",
            }}
          >
            <p
              style={{
                fontSize: "16px",
                padding: "16px 0 0 10px",
              }}
            >
              در حال آپلود
            </p>
            <section className="loader-Custome"></section>
          </div>
        ) : (
          <BtnComponent
            onClick={uploadHandler}
            label={"تکمیل "}
            variant="text"
            style={{
              background: theme.primary[900],
              color: theme.neutral[0],
              width: "124px",
              cursor: "pointer",
            }}
          />
        )}
      </div>
    </DivUpload>
  );
};

export default UploadProject;
