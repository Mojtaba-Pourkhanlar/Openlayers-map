import { BtnComponent } from "@/Components/Common/Core/Button";
import InputText from "@/Components/Common/Core/Input/TextFaild";
import { Modal } from "@/Components/Common/Core/Modal";
import Stack from "@/Components/Common/Utils/Stack";
import { justTypeNumber } from "@/Hook";
import { getTranslate } from "@/language";
import {
  clearAllProject,
  clearNewUser,
  setGiveAccess,
  setRevokeAccess,
} from "@/store/Actions/Projects";
import { clearIsRefresh, closeModal, openSnackbar } from "@/store/Actions/Root";
import { RootState } from "@/store/interfaces";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "styled-components";
import {
  DeleteButton,
  DeleteIcon,
  Table,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  TextState,
} from "./Style";

interface Props {
  isId: string;
}
interface UserProps {
  ID: number;
  ProjectID: number;
  NationalId: string;
  FullName: string;
}
const Permission = ({ isId }: Props) => {
  const theme = useTheme().palette;
  const translate = getTranslate();
  const dispatch = useDispatch();
  const { modal } = useSelector((state: RootState) => state?.root);
  const { listUsers, newUser } = useSelector(
    (state: RootState) => state.project
  );
  const [getNewData, setNewData] = useState<UserProps[]>([]);
  const [nationalId, setNationalId] = useState("");
  const [errors, setErrors] = useState({
    nationalIdError: false,
    nationalIdHelper: "",
  });

  useEffect(() => {
    if (getNewData?.length === 0 && listUsers?.data?.length > 0) {
      setNewData(listUsers?.data);
    }

    if (newUser) {
      const demo = getNewData?.findIndex(
        (item: UserProps) => item.NationalId === newUser?.data?.NationalId
      );
      if (demo === -1) {
        setNewData((prev) => [...prev, newUser?.data]); 
        dispatch(clearNewUser());
      }
    }
  }, [getNewData, listUsers, newUser]);

  // Handle errors
  const errorHandler = () => {
    let error = false;
    if (!nationalId) {
      setErrors((prev) => ({
        ...prev,
        nationalIdError: true,
        nationalIdHelper: "پرکردن این فیلد الزامی است",
      }));
      error = true;
    }
    return error;
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = justTypeNumber(value);
    setNationalId(newValue);
    // Clear errors when user starts typing
    setErrors({
      ...errors,
      [`${name}Error`]: false,
      [`${name}Helper`]: "",
    });
  };

  // Handle form submission
  const addHandler = useCallback(() => {
    const hasError = errorHandler();
    if (!hasError) {
      // Checking the presence of the national code in the list
      const exists = getNewData.some(
        (user: UserProps) => user.NationalId === nationalId
      );
      if (exists) {
        dispatch(
          openSnackbar({
            message: "کد ملی وارد شده در لیست وجود دارد",
            type: "error",
          })
        );
        return;
      }
      const data = {
        nationalCode: nationalId,
        projectId: +isId,
      };
      dispatch(setGiveAccess(data) as any);
      setNationalId("");
    }
  }, [nationalId, getNewData, isId, dispatch]);

  const closeModalHandler = useCallback(() => {
    dispatch(closeModal());
    dispatch(clearNewUser());
    dispatch(clearIsRefresh());
    dispatch(clearAllProject());
    setNewData([]);
  }, [dispatch]);

  const deleteHandler = useCallback(
    (nationalId: string) => {
      const data = {
        nationalCode: nationalId,
        projectId: +isId,
      };
      dispatch(setRevokeAccess(data) as any);
      const updatedList = getNewData.filter(
        (item: UserProps) => item.NationalId !== nationalId
      );
      setNewData(updatedList);
      if (updatedList.length === 0) {
        dispatch(clearAllProject());
        setNewData([]);
      }
    },
    [dispatch, getNewData, isId]
  );

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && nationalId) {
      addHandler();
    }
  };

  return (
    <Modal
      onClose={() => closeModalHandler()}
      show={modal.name === translate.permissions}
      width={500}
      title={translate.permissions}
    >
      <Stack
        justifyContent="space-between"
        alignItems="center"
        marginTop="10px"
      >
        <BtnComponent
          onClick={addHandler}
          label={"اضافه کردن"}
          variant="contained"
          color="#0B233F"
          style={{ width: "150px", margin: "-10px 0 0 10px" }}
          id="PermissionBTN"
        />
        <InputText
          placeholder={"کد ملی کاربر را وارد کنید"}
          type="text"
          name="nationalId"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          error={errors.nationalIdError.toString()}
          helperText={errors.nationalIdHelper}
          value={nationalId}
          autoComplete="off"
          maxLength={10}
          style={{ textAlign: "center" }}
        />
      </Stack>
      {getNewData?.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell style={{ borderRadius: "0 12px 0 0" }}>
                نام کاربر
              </TableHeaderCell>
              <TableHeaderCell>کد ملی</TableHeaderCell>
              <TableHeaderCell style={{ borderRadius: "12px 0 0 0" }}>
                عملیات
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <tbody>
            {getNewData?.map((item: UserProps, index: number) => (
              <TableRow key={index}>
                <TableCell style={{ fontWeight: "700" }}>
                  {item.FullName}
                </TableCell>
                <TableCell>{item.NationalId}</TableCell>
                <TableCell>
                  <DeleteIcon onClick={() => deleteHandler(item.NationalId)} />
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
    </Modal>
  );
};

export default Permission;

/* 

4310351891
4311234910
0372326307

*/
