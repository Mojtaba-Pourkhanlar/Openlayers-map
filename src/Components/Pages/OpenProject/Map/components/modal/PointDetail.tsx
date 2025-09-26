import { Modal } from "@/Components/Common/Core/Modal";
import Stack from "@/Components/Common/Utils/Stack";
import { staticName } from "@/Constants";
import { groupData } from "@/Hook";
import { getTranslate } from "@/language";
import { clearPointDetail } from "@/store/Actions/Map";
import { closeModal } from "@/store/Actions/Root";
import { RootState } from "@/store/interfaces";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "./CustomStyle/Card";
import { Container } from "./style";

const PointDetail = () => {
  const translate = getTranslate();
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const { modal } = useSelector((state: RootState) => state?.root);
  const { pointDetail } = useSelector((state: RootState) => state.map);
  const test = staticName(pointDetail[0]);
  const all = [...test];
  const groupedData = groupData(all);
  useEffect(() => {
    setTimeout(() => {
      setIsShow(true);
    }, 100);
  }, []);
  const closeModalHandler = useCallback(() => {
    dispatch(closeModal());
    dispatch(clearPointDetail());
  }, [dispatch]);

  return (
    <Modal
      onClose={() => closeModalHandler()}
      width={800}
      title={translate.pointDetailText}
      show={modal.name === translate.pointDetailText}
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
  );
};

export default PointDetail;
