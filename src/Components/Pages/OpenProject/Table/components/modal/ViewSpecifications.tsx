import { Modal } from "@/Components/Common/Core/Modal";
import Stack from "@/Components/Common/Utils/Stack";
import { staticName } from "@/Constants";
import { groupData } from "@/Hook";
import { getTranslate } from "@/language";
import { closeModal } from "@/store/Actions/Root";
import { RootState } from "@/store/interfaces";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../../Map/components/modal/CustomStyle/Card";
import { Container } from "../../../Map/components/modal/style";
interface Props {
  rowItem: any;
  headerItems: string[];
}

const ViewSpecifications = ({ rowItem }: Props) => {
  const translate = getTranslate();
  const dispatch = useDispatch();
  const { modal } = useSelector((state: RootState) => state?.root);
  const [isShow, setIsShow] = useState(false);
  const closeModalExport = () => {
    dispatch(closeModal());
  };
  const test = staticName(rowItem);
  const all = [...test];
  const groupedData = groupData(all);
  useEffect(() => {
    setTimeout(() => {
      setIsShow(true);
    }, 100);
  }, []);

  return (
    <>
      <Modal
        onClose={() => closeModalExport()}
        show={modal.name === translate.viewPoint}
        width={800}
        title={rowItem.name}
      >
        {isShow ? (
          <>
            <Stack alignItems="center" marginTop={"20px"}>
              <Container
                style={{
                  height: "400px",
                  marginLeft: "10px",
                }}
              >
                <Card name="Descriptions" list={groupedData?.Descriptions} />
                <Card name="Coordinates" list={groupedData?.Coordinate} />
              </Container>
              <Container
                style={{
                  height: "400px",
                }}
              >
                <Card name="Tilt" list={groupedData?.Tilt} />
                <Card name="Accuracy" list={groupedData?.Accuracy} />
              </Container>
            </Stack>
            <Stack alignItems="center" margin={"10px 0 20px"}>
              <Container
                style={{
                  marginLeft: "10px",
                  height: "280px",
                }}
              >
                <Card name="Base Info" list={groupedData?.BaseInfo} />
                <Card name="Caster Info" list={groupedData?.CasterInfo} />
              </Container>
              <Container
                style={{
                  height: "280px",
                }}
              >
                <Card name="Satellite Info" list={groupedData?.SatelliteInfo} />
                <Card name="Modes" list={groupedData?.Modes} />
              </Container>
            </Stack>
          </>
        ) : (
          <div style={{ height: "700px" }}></div>
        )}
      </Modal>
    </>
  );
};

export default ViewSpecifications;
