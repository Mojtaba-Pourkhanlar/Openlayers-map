import Box from "@/Components/Common/Core/Box";
import { BtnComponent } from "@/Components/Common/Core/Button";
import { Modal } from "@/Components/Common/Core/Modal";
import Typography from "@/Components/Common/Core/Typography";
import { getTranslate } from "@/language";
import { deleteProject } from "@/store/Actions/Projects";
import { clearIsRefresh, closeModal } from "@/store/Actions/Root";
import { RootState } from "@/store/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { styled, useTheme } from "styled-components";

const ModalContainer = styled(Modal)`
  .modal-content {
    border-radius: 24px;
  }
`;

interface ModalDeleteProps {
  deletePro: string;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({ deletePro }) => {
  const translate = getTranslate();
  const theme = useTheme().palette;
  const dispatch = useDispatch();
  const { modal } = useSelector((state: RootState) => state?.root);

  const closeModalDelete = () => {
    dispatch(closeModal());
    dispatch(clearIsRefresh());
  };

  const deleteHandler = () => {
    dispatch(deleteProject(deletePro) as any);
    closeModalDelete();
  };

  return (
    <ModalContainer
      onClose={closeModalDelete}
      show={modal.name === translate.deleteProject}
      width={400}
      title={translate.deleteProject}
      headerbgcolor={theme.red.dark}
    >
      <Box style={{ margin: "20px 0" }}>
        <Typography
          style={{
            color: theme.neutral[900],
            margin: "0 10px 0",
            fontWeight: 600,
          }}
        >
          {translate.areYouSureWantPeleteProject}
        </Typography>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "50px 0 5px",
          }}
        >
          <BtnComponent
            onClick={closeModalDelete}
            label={translate.comingBack}
            variant="text"
            style={{ color: theme.primary[900], width: "124px" }}
          />
          <BtnComponent
            onClick={deleteHandler}
            label={translate.deleteProject}
            variant="text"
            style={{
              background: theme.red.dark,
              color: theme.neutral[0],
              width: "124px",
            }}
          />
        </Box>
      </Box>
    </ModalContainer>
  );
};

export default ModalDelete;
