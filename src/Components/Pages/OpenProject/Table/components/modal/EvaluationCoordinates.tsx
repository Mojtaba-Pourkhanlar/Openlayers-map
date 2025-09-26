import Box from "@/Components/Common/Core/Box";
import { BtnComponent } from "@/Components/Common/Core/Button";
import Select from "@/Components/Common/Core/Input/Select";
import TextField from "@/Components/Common/Core/Input/TextFaild";
import { Modal } from "@/Components/Common/Core/Modal";
import { ReactComponent as Delete } from "@/assets/svg/deleteMap.svg";
import { ReactComponent as Edit } from "@/assets/svg/editMap.svg";
import { getTranslate } from "@/language";
import { getMapEvalu, getPointsList } from "@/store/Actions/Map";
import {
  clearEvaluationCoord,
  closeModal,
  setEvaluationCoord,
} from "@/store/Actions/Root";
import { RootState } from "@/store/interfaces";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "styled-components";
import {
  options,
  optionsMode,
  optionsOperator,
  optionsOperatorMode,
  translateOperator,
} from "../constants";
import {
  BoxAndOr,
  BoxEvaluContainer,
  BoxFooterContainer,
  DivList,
  DivShowList,
  MainContainer
} from "./Style";

const EvaluationCoordinates = () => {
  const translate = getTranslate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { modal, evaluationCoord } = useSelector(
    (state: RootState) => state?.root
  );
  const [format, setFormat] = useState("");
  const [mode, setMode] = useState("");
  const [operator, setOperator] = useState("");

  const [isCount, setIsCount] = useState("");
  const [list, setList] = useState<any>([]);
  const [editFormat, setEditFormat] = useState("");
  const [errorMSG, setErrorMSG] = useState("");

  const closeModalExport = () => {
    dispatch(closeModal());
  };

  const handleSelectChange = (item: any) => {
    setFormat(item.value);
  };
  const handleOperator = (item: any) => {
    setOperator(item.value);
  };

  const handleMode = (item: any) => {
    setMode(item.value);
  };

  const addItem = (connector: any) => {
    if (
      !format ||
      (format !== "Mode" && !isCount) ||
      (format === "Mode" && !mode)
    ) {
      setErrorMSG(translate.ErrorMSGRepeat);
      return;
    }

    if (list.some((item: any) => item.format === format)) {
      setErrorMSG(translate.ErrorMSG);
      return;
    }

    const newItem = {
      id: Date.now(),
      format,
      operator,
      value: format === "Mode" ? mode : isCount,
      connector,
      isEditing: false,
    };
    setList([...list, newItem]);
    dispatch(setEvaluationCoord([...list, newItem]));
    resetFields();
  };

  const resetFields = () => {
    setErrorMSG("");
    setIsCount("");
  };

  const deleteItem = (id: any) => {
    dispatch(setEvaluationCoord(list.filter((item: any) => item.id !== id)));
    setList(list.filter((item: any) => item.id !== id));
  };

  const editItem = (id: any, type: any) => {
    const currentItem = list.find((item: any) => item.id === id);

    if (type === "edit") {
      if (
        list.some((item: any) => item.format === editFormat && item.id !== id)
      ) {
        setErrorMSG(translate.ErrorMSG);
        return;
      } else {
        dispatch(
          setEvaluationCoord(
            list.map((item: any) =>
              item.id === id
                ? { ...item, format: editFormat, isEditing: !item.isEditing }
                : item
            )
          )
        );
        setList(
          list.map((item: any) =>
            item.id === id
              ? { ...item, format: editFormat, isEditing: !item.isEditing }
              : item
          )
        );
      }
    } else {
      setEditFormat(currentItem?.format);
      setList(
        list.map((item: any) =>
          item.id === id ? { ...item, isEditing: !item.isEditing } : item
        )
      );
      dispatch(
        setEvaluationCoord(
          list.map((item: any) =>
            item.id === id ? { ...item, isEditing: !item.isEditing } : item
          )
        )
      );
    }
  };

  const handleChange = (id: any, field: any, value: any) => {
    setList(
      list.map((item: any) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
    dispatch(
      setEvaluationCoord(
        list.map((item: any) =>
          item.id === id ? { ...item, [field]: value } : item
        )
      )
    );
    if (field === "format") {
      setEditFormat(value);
    }
  };

  const applyChanges = () => {
    const changeFormat = list.map((item: any) => ({
      key:
        item?.format === "Mode"
          ? `nav_mode_ray_db`
          : `${item?.format.toLowerCase()}_ray_db`,
      operator: item?.operator,
      value: item?.format === "Mode" ? item?.value.toUpperCase() : item?.value,
    }));
    dispatch(getMapEvalu(changeFormat) as any);
    dispatch(getPointsList(changeFormat) as any);
    closeModalExport();
  };

  return (
    <>
      <Modal
        onClose={() => closeModalExport()}
        show={modal.name === translate.assessment}
        title={translate.assessmentData}
        width={520}
      >
        <Box>
          <MainContainer>
            <BoxEvaluContainer>
              <div id="newSelect">
                <Select
                  label={""}
                  options={options}
                  value={format}
                  onChange={handleSelectChange}
                  changedesign={true}
                  clear={() => setFormat("")}
                  defaultOption={{ value: "HRMS", label: "HRMS" }}
                  dontClose
                />
              </div>

              <div id="newSelectMode">
                <Select
                  label={""}
                  options={
                    format === "Mode" ? optionsOperatorMode : optionsOperator
                  }
                  value={operator}
                  onChange={handleOperator}
                  changedesign={true}
                  clear={() => setOperator("")}
                  defaultOption={
                    format === "Mode"
                      ? { value: "=", label: "برابر با" }
                      : { value: ">", label: "بزرگتر از" }
                  }
                  dontClose
                />
              </div>
              {format === "Mode" ? (
                <div id="modeSelect">
                  <Select
                    label={""}
                    options={optionsMode}
                    value={mode}
                    onChange={handleMode}
                    style={{ margin: "3px 0 10px 0" }}
                    changedesign={true}
                    clear={() => setMode("")}
                    dontClose
                  />
                </div>
              ) : (
                <TextField
                  style={{
                    background: theme.palette.neutral[0],
                    borderColor: theme.palette.neutral[300],
                    height: "40px",
                  }}
                  placeholder={translate.amount}
                  type="text"
                  value={isCount}
                  onChange={(e) => setIsCount(e.target.value)}
                />
              )}
              <div id="submit">
                <BtnComponent
                  variant="outline"
                  label={translate.submits}
                  onClick={() => addItem("AND")}
                  style={{
                    width: "60px",
                  }}
                />
              </div>
            </BoxEvaluContainer>
            <BoxAndOr>{errorMSG && <li id="error">{errorMSG}</li>}</BoxAndOr>
            <DivShowList>
              {evaluationCoord?.map((item: any) => {
                let oper: any = translateOperator(item.operator);
                return (
                  <DivList key={item.id}>
                    {item.isEditing ? (
                      <BoxEvaluContainer>
                        <div id="newSelect">
                          <Select
                            label={""}
                            options={options}
                            value={item.format}
                            onChange={(e) => {
                              handleChange(item.id, "format", e.value);
                            }}
                            changedesign={true}
                          />
                        </div>

                        <div id="newSelectMode">
                          <Select
                            label={""}
                            options={
                              format === "Mode"
                                ? optionsOperatorMode
                                : optionsOperator
                            }
                            value={item.operator}
                            onChange={(e) => {
                              handleChange(item.id, "operator", e.value);
                            }}
                            changedesign={true}
                            clear={() => setOperator("")}
                            defaultOption={{ value: ">", label: "بزرگتر از" }}
                            dontClose
                          />
                        </div>

                        {item.format === "Mode" ? (
                          <div
                            id="modeSelect"
                            style={{ margin: "0 !important" }}
                          >
                            <Select
                              label={""}
                              options={optionsMode}
                              value={mode}
                              onChange={(e) =>
                                handleChange(item.id, "value", e.value)
                              }
                              style={{ margin: "2px 0 0 " }}
                              changedesign={true}
                            />
                          </div>
                        ) : (
                          <TextField
                            style={{
                              background: theme.palette.neutral[0],
                              borderColor: theme.palette.neutral[300],
                              height: "40px",
                            }}
                            placeholder="مقدار"
                            type="text"
                            value={item.value}
                            onChange={(e) =>
                              handleChange(item.id, "value", e.target.value)
                            }
                          />
                        )}
                        <div id="submit">
                          <BtnComponent
                            variant="outline"
                            style={{
                              width: "60px",
                              margin:
                                item.format === "Mode" ? "0 -10px 0 0 " : "0",
                            }}
                            label={translate.save}
                            onClick={() => {
                              setErrorMSG("");
                              editItem(item.id, "edit");
                            }}
                          />
                        </div>
                      </BoxEvaluContainer>
                    ) : (
                      <div className="ItemAdded">
                        <table>
                          <tbody>
                            <tr>
                              <th
                                style={{
                                  width: "130px",
                                  textAlign: "right",
                                  paddingRight: "15px",
                                }}
                              >
                                {item.format}
                              </th>
                              <th
                                style={{ width: "115px", textAlign: "center" }}
                              >
                                {oper}
                              </th>
                              <th
                                style={{ width: "130px", textAlign: "center" }}
                              >
                                {item.value}
                              </th>
                            </tr>
                          </tbody>
                        </table>
                        <div>
                          <Edit
                            onClick={() => {
                              setErrorMSG("");
                              editItem(item.id, "open");
                            }}
                          />
                          <Delete
                            onClick={() => {
                              setErrorMSG("");
                              deleteItem(item.id);
                            }}
                            style={{ margin: "0 10px 0 15px" }}
                          />
                        </div>
                      </div>
                    )}
                  </DivList>
                );
              })}
            </DivShowList>
          </MainContainer>
          <BoxFooterContainer>
            <BtnComponent
              variant="outline"
              label={"حذف مقادیر"}
              onClick={() => {
                if (evaluationCoord?.length > 0) {
                  dispatch(getPointsList([]) as any);
                  dispatch(clearEvaluationCoord());
                  dispatch(getMapEvalu([]) as any);
                  closeModalExport();
                } else {
                  closeModalExport();
                  dispatch(getPointsList([]) as any);
                }
              }}
            />
            <BtnComponent
              variant="outline"
              label={translate?.action}
              onClick={() => applyChanges()}
            />
          </BoxFooterContainer>
        </Box>
      </Modal>
    </>
  );
};

export default EvaluationCoordinates;
