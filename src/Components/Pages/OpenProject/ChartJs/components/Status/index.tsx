import {
  GridContainerNew,
  GridItemNew,
} from "@/Components/Common/Core/Grid/New";
import {
  calculateLoginMode,
  calculateMeasureMode,
  calculateNavModes,
  calculateSystem,
  someData,
} from "@/Hook";
import { useState } from "react";
import { Card } from "../CustomStyle/Card";
import {
  Container,
  ContainerSEC,
  ContainerSECMobile,
  IconContainer,
  MobileView,
} from "./Style";
// Icons
import { ReactComponent as Down } from "@/assets/svg/down.svg";
import { ReactComponent as Up } from "@/assets/svg/top.svg";

const Status = ({ data }: any) => {
  const total = data?.length;
  const [showLarg, setShowLarg] = useState(false);
  const navMode = calculateNavModes(data);
  const sattelideSat = someData({ data, name: "numSatTracked" });
  const sattelideUsed = someData({ data, name: "numSatUsed" });
  const harvestModeData = calculateMeasureMode(data);
  const loginModeData = calculateLoginMode(data);
  const systemData = calculateSystem(data);

  const customData = [
    {
      id: 2,
      name: "تعداد نقاط FIXED :",
      data: navMode.FIXED,
    },
    {
      id: 3,
      name: "تعداد نقاط FLOAT :",
      data: navMode.FLOAT,
    },
    {
      id: 4,
      name: "تعداد نقاط DIFF :",
      data: navMode.DIFF,
    },
    {
      id: 5,
      name: "تعداد نقاط AUT :",
      data: navMode.AUT,
    },
  ];
  const sattelideData = [
    {
      id: 1,
      name: "تعداد ماهواره های ردیابی شده  :",
      data: sattelideSat,
    },
    {
      id: 2,
      name: "تعداد ماهواره های استفاده شده  :",
      data: sattelideUsed,
    },
  ];
  const harvestMode = [
    {
      id: 1,
      name: "تعداد نقاط TOPO :",
      data: harvestModeData.Topo,
    },
    {
      id: 2,
      name: "تعداد نقاط Average :",
      data: harvestModeData.Avg,
    },
    {
      id: 3,
      name: "تعداد نقاط Tilt :",
      data: harvestModeData.Tilt,
    },
  ];
  const loginMode = [
    {
      id: 1,
      name: "بدون داده خام :",
      data: loginModeData.DISABLE,
    },
    {
      id: 2,
      name: "تعداد نقاط STATIC :",
      data: loginModeData.STATIC,
    },
    {
      id: 3,
      name: "تعداد نقاط KINEMATIC :",
      data: loginModeData.STATIC_KINEMATIC,
    },
  ];
  const systemMode = [
    {
      id: 1,
      name: "سامانه شمیم پلاس",
      data: systemData.ShamimPlus,
    },
    {
      id: 2,
      name: "سامانه شمیم ",
      data: systemData.Shamim,
    },
    {
      id: 3,
      name: "سامانه سحاب",
      data: systemData.Sahab,
    },
    {
      id: 4,
      name: "سامانه هدی پرو",
      data: systemData.HodaPro,
    },
    {
      id: 5,
      name: "سامانه هدی",
      data: systemData.Hoda,
    },
    {
      id: 6,
      name: "سامانه مشهد",
      data: systemData.Mashhad,
    },
    {
      id: 7,
      name: "سامانه سمت",
      data: systemData.Samt,
    },
    {
      id: 8,
      name: "بدون سامانه",
      data: systemData.OTHERS,
    },
  ];
  return (
    <GridContainerNew
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        marginTop: "18px",
      }}
      spacing={5}
    >
      <GridItemNew xs={12}>
        <Container>
          <Card name="وضعیت برداشت" list={customData} />
          <Card name="حالت برداشت" list={harvestMode} />
          <Card name="سامانه ها" list={systemMode} />
          <Card name="ثبت داده خام" list={loginMode} />
        </Container>

        <MobileView>
          <ContainerSEC>
            <Card name="وضعیت برداشت" list={customData} />
            <Card name="حالت برداشت" list={harvestMode} />
          </ContainerSEC>
          <ContainerSEC style={{ height: "315px" }}>
            <Card name="حالت برداشت" list={harvestMode} />
            <Card name="ثبت داده خام" list={loginMode} />
          </ContainerSEC>
          <ContainerSEC style={{ height: "315px" }}>
            <Card name="سامانه ها" list={systemMode} />
          </ContainerSEC>
        </MobileView>

        <MobileView>
          <ContainerSECMobile $isShow={showLarg}>
            <div>
              <Card name="حالت برداشت" list={harvestMode} />
              {showLarg && (
                <>
                  <Card name="وضعیت برداشت" list={customData} />
                  <Card name="حالت برداشت" list={harvestMode} />
                </>
              )}
            </div>
            <div>
              <Card name="ثبت داده خام" list={loginMode} />
              {showLarg && <Card name="سامانه ها" list={systemMode} />}
            </div>
          </ContainerSECMobile>

          <IconContainer onClick={() => setShowLarg(!showLarg)}>
            {showLarg ? (
              <div>
                <Up
                  style={{
                    margin: "0px 0 0 0",
                    width: "30px",
                    height: "30px",
                  }}
                />
              </div>
            ) : (
              <div>
                <Down
                  style={{
                    margin: "0px 0 0 0",
                    width: "30px",
                    height: "30px",
                  }}
                />
              </div>
            )}
          </IconContainer>
        </MobileView>
      </GridItemNew>
    </GridContainerNew>
  );
};

export default Status;
