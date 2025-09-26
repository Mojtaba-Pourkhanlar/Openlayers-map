import Box from "@/Components/Common/Core/Box";
import { BtnComponent } from "@/Components/Common/Core/Button";
import Date from "@/Components/Common/Core/Input/Date";
import { Modal } from "@/Components/Common/Core/Modal";
import { getTranslate } from "@/language";
import { clearIsRefresh, closeModal } from "@/store/Actions/Root";
import { RootState } from "@/store/interfaces";
import { ChangeEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { STATUS } from "../constants";
import {
  BoxContainer,
  BoxInputContainer,
  BoxMain,
  FileName,
  SelectFilter,
  Submit,
} from "./Style";

const Filter = () => {
  const theme = useTheme().palette;
  const translate = getTranslate();
  const dispatch = useDispatch();
  const { modal } = useSelector((state: RootState) => state?.root);
  const [formData, setFormData] = useState({
    createDate: "",
    updateDate: "",
    status: "",
    volume: "",
  });

  const closeModalHandler = useCallback(() => {
    dispatch(closeModal());
    dispatch(clearIsRefresh());
  }, [dispatch]);

  const dateHandler = useCallback((name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  return (
    <Modal
      onClose={() => closeModalHandler()}
      show={modal.name === translate.filter}
      width={500}
      title={translate.filter}
      headerbgcolor={theme.yellow.dark}
      isDark
    >
      <BoxContainer>
        <BoxMain>
          <BoxInputContainer>
            <Box style={{ width: "230" }}>
              <Date
                name="createDate"
                value={formData.createDate}
                onChange={(date: any) => {
                  const demo =
                    date.year + "/" + date.month.number + "/" + date.day;
                  dateHandler("createDate", demo);
                }}
                clearState={() => {
                  setFormData((prev) => ({ ...prev, createDate: "" }));
                }}
                label={translate.createDate}
              />
            </Box>
            <Box style={{ width: "230" }}>
              <Date
                name="updateDate"
                value={formData.updateDate}
                onChange={(date: any) => {
                  const demo =
                    date.year + "/" + date.month.number + "/" + date.day;
                  dateHandler("updateDate", demo);
                }}
                clearState={() => {
                  setFormData((prev) => ({ ...prev, updateDate: "" }));
                }}
                label={translate.updatedAt}
              />
            </Box>
          </BoxInputContainer>
          <BoxInputContainer>
            <Box style={{ width: "140px" }}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginRight: "7px",
                  marginBottom: "10px",
                }}
              >
                وضعیت پروژه
              </label>
              <SelectFilter
                label={"وضعیت رو انتخاب کنید"}
                options={STATUS}
                value={formData.status}
                onChange={(option) => dateHandler("status", option.value)}
                changedesign={true}
              />
            </Box>
            <Box style={{ marginTop: "17px", width: "210px" }}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginRight: "7px",
                }}
              >
                حجم فایل
              </label>
              <FileName
                placeholder={"حجم فایل را وارد کنید"}
                type="text"
                value={formData.volume}
                name="volume"
                onChange={handleInputChange}
              />
            </Box>
          </BoxInputContainer>
        </BoxMain>

        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "35px 0 5px",
          }}
        >
          <BtnComponent
            onClick={() => closeModalHandler()}
            label={translate.deleteFilter}
            variant="text"
            style={{ color: theme.primary[900], width: "124px" }}
          />
          <Submit
            // onClick={() => deleteHandler()}
            label={translate.applyFilter}
            // disabled={!formData.fileName}
            variant="contained"
            style={{ background: theme.yellow.dark, color: theme.neutral[900] }}
          />
        </Box>
      </BoxContainer>
    </Modal>
  );
};

export default Filter;
