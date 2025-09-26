import Box from "@/Components/Common/Core/Box";
import { BtnComponent } from "@/Components/Common/Core/Button";
import Date from "@/Components/Common/Core/Input/Date";
import { Modal } from "@/Components/Common/Core/Modal";
import { Operation, toEnglishDigits } from "@/Constants";
import { convertDateGregorian, convertDateNew } from "@/Hook";
import { getTranslate } from "@/language";
import {
  clearFilter,
  getHistoryList,
  setFilter,
} from "@/store/Actions/History";
import { closeModal, setDate } from "@/store/Actions/Root";
import { RootState } from "@/store/interfaces";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "styled-components";
import {
  BoxContainer,
  BoxInputContainer,
  BoxMain,
  SelectFilterFormat,
  Submit,
} from "../Style";

const Filter = () => {
  const theme = useTheme().palette;
  const translate = getTranslate();
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state?.root?.modal);
  const getDate = useSelector((state: RootState) => state?.root?.getDate);
  const featureType = useSelector(
    (state: RootState) => state?.history.featureType
  );
  const operation = useSelector((state: RootState) => state?.history.operation);

  const closeModalHandler = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const filterSubmit = () => {
    const dateStart = convertDateNew(getDate.start);
    const dateEnd = convertDateNew(getDate.end);
    const data: any = {
      featureType: featureType,
      ...(getDate.start && {
        dateStart: toEnglishDigits(dateStart),
      }),
      ...(getDate.end && { dateEnd: toEnglishDigits(dateEnd) }),
      ...(operation && { status: operation }),
    };
    dispatch(getHistoryList(data) as any);
    dispatch(closeModal());
  };

  return (
    <Modal
      onClose={() => closeModalHandler()}
      show={modal.name === translate.filter}
      width={500}
      title={translate.filter}
      headerbgcolor={theme.primary[900]}
    >
      <BoxContainer>
        <BoxMain>
          <BoxInputContainer>
            <Box style={{ width: "230px" }}>
              <Date
                name="dateStart"
                value={getDate.start}
                onChange={(date: any) => {
                  dispatch(
                    setDate({
                      start: convertDateGregorian(date),
                      end: getDate.end,
                    })
                  );
                }}
                clearState={() => {
                  dispatch(setDate({ start: "", end: getDate.end }));
                }}
                label={"تاریخ شروع"}
              />
            </Box>
            <Box style={{ width: "230px" }}>
              <Date
                name="dateEnd"
                value={getDate.end}
                onChange={(date: any) => {
                  dispatch(
                    setDate({
                      start: getDate.start,
                      end: convertDateGregorian(date),
                    })
                  );
                }}
                clearState={() => {
                  dispatch(setDate({ start: getDate.start, end: "" }));
                }}
                label={"تاریخ پایان"}
              />
            </Box>
          </BoxInputContainer>
          <BoxInputContainer>
            <Box style={{ width: "210px" }}>
              <SelectFilterFormat
                label={"نوع عملیات"}
                options={Operation}
                value={operation}
                onChange={(option) => {
                  dispatch(setFilter({ operation: option.value }));
                }}
                changedesign={true}
                notDefault={true}
                clear={() => {
                  dispatch(clearFilter());
                }}
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
            onClick={() => {
              closeModalHandler();
              dispatch(getHistoryList({ featureType: "point" }) as any);
              dispatch(setDate({ start: "", end: "" }));
              dispatch(clearFilter());
            }}
            label={translate.deleteFilter}
            variant="text"
            style={{ color: theme.primary[900], width: "124px" }}
          />
          <Submit
            onClick={() => filterSubmit()}
            label={translate.applyFilter}
            variant="contained"
            style={{ background: theme.primary[900], color: theme.neutral[0] }}
          />
        </Box>
      </BoxContainer>
    </Modal>
  );
};

export default Filter;
