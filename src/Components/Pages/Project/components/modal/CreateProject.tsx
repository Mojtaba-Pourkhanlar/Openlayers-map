import { Modal } from "@/Components/Common/Core/Modal";
import { getTranslate } from "@/language";
import { clearIsRefresh, closeModal, resetStep } from "@/store/Actions/Root";
import { RootState } from "@/store/interfaces";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateProjectComponent from "../CreateProject";
import { BoxContainer } from "./Style";

const CreateProject = () => {
  const translate = getTranslate();
  const dispatch = useDispatch();
  const { modal } = useSelector((state: RootState) => state?.root);

  const closeModalHandler = useCallback(() => {
    dispatch(closeModal());
    dispatch(clearIsRefresh());
    dispatch(resetStep());
  }, [dispatch]);

  return (
    <>
      <Modal
        onClose={() => closeModalHandler()}
        width={750}
        title={translate.newProject}
        show={modal.name === translate.createProject}
      >
        <BoxContainer>
          <CreateProjectComponent />
        </BoxContainer>
      </Modal>
    </>
  );
};

export default CreateProject;
