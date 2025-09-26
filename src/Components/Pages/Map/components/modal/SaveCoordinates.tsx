import Box from "@/Components/Common/Core/Box";
import { BtnComponent } from "@/Components/Common/Core/Button";
import { Modal } from "@/Components/Common/Core/Modal";
import { getTranslate } from "@/language";
import {
  closeModal,
  getIsHistory,
  getIsRouteHome,
  getIsRouteName,
  setLogout,
} from "@/store/Actions/Root";
import { RootState } from "@/store/interfaces";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ModalSaveCoordinates = ({ onSave, onClear }: any) => {
  const translate = getTranslate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rootState = useSelector((state: RootState) => state?.root);
  const { modal, isRouteName, isRouteHome, isLogout } = rootState;

  const initialState = () => {
    dispatch(getIsHistory(false) as any);
    dispatch(getIsRouteName(false) as any);
    dispatch(getIsRouteHome(false) as any);
    dispatch(setLogout(false) as any);
  };

  const closeModalDelete = () => {
    dispatch(closeModal());
    initialState();
  };

  const isLogoutHandler = () => {
    Cookies.remove("raycloud_token");
    localStorage.removeItem("raycloud_token");
    initialState();
  };

  const onClearHandler = () => {
    onClear();
    dispatch(getIsHistory(true) as any);
    if (isRouteName || isRouteHome) {
      navigate("/admin/project/projectlist");
      initialState();
    }
    if (isLogout) {
      isLogoutHandler();
    }
  };

  const saveHandler = () => {
    onSave();
    dispatch(getIsHistory(true) as any);
    if (isRouteName || isRouteHome) {
      navigate("/admin/project/projectlist");
      initialState();
    }
    if (isLogout) {
      isLogoutHandler();
    }
    dispatch(closeModal());
  };

  return (
    <>
      <Modal
        onClose={() => closeModalDelete()}
        title="ذخیره مختصات ها"
        show={modal.name === translate.modalSaveCoordinates}
        width={450}
      >
        <Box style={{ margin: "20px" }}>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "50px 0 5px",
            }}
          >
            <BtnComponent
              onClick={onClearHandler}
              label={translate.clearCoordinates}
              variant="text"
              style={{ background: "#A42828", color: "#fff", width: "124px" }}
            />
            <BtnComponent
              onClick={saveHandler}
              label={translate.saveCoordinates}
              variant="text"
              style={{ color: "#0B233F", width: "124px" }}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalSaveCoordinates;
