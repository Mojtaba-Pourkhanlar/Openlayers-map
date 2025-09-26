import { BtnComponent } from "@/Components/Common/Core/Button";
import { GridCol, GridContainer, GridRow } from "@/Components/Common/Core/Grid";
import {
  GridContainerNew,
  GridItemNew,
} from "@/Components/Common/Core/Grid/New";
import TextInputRHF from "@/Components/Common/Core/Input/TextFaild/New";
import Stack from "@/Components/Common/Utils/Stack";
import { VERSION } from "@/Constants";
import { getHelperText } from "@/Hook";
import LoginLG from "@/assets/svg/loginLG.svg";
import Logo from "@/assets/svg/logo.svg";
import { getTranslate } from "@/language";
import { registerData } from "@/store/Actions/Profile";
import { RootState } from "@/store/interfaces";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextQuestion, TextRegister, TextVersion } from "../Login/style";
import {
  StyleBoxImage,
  StyleContainerRegister,
  StyleIconViewer,
  StyleMainBox,
  StyleSubTitle,
  StyleTitle,
  StyleTitleBox,
  StyledGridCol,
  StyledMobileView,
  TextInputReg,
} from "./style";

const Register: React.FC = () => {
  const translate = getTranslate();
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<RootState, void, any>>();
  // Redux state
  // const { captcha } = useSelector((state: RootState) => state?.profile);
  const {
    register,
    control,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({});

  // const [refresh, setRefresh] = useState(false);

  // Fetch captcha on component mount or refresh
  // useEffect(() => {
  //   dispatch(getCaptcha());
  // }, [refresh]);

  const onSubmit = (data: any) => {
    dispatch(registerData(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GridContainer fluid>
        <GridRow>
          <GridCol xs={12} md={6}>
            <StyledMobileView>
              <StyleMainBox>
                <StyleTitleBox>
                  <StyleIconViewer src={Logo} alt="Logo" />
                  <StyleTitle style={{ margin: "20px 0" }}>
                    {translate.wellcome}
                  </StyleTitle>
                  <StyleSubTitle>{translate.detailRegister}</StyleSubTitle>
                </StyleTitleBox>

                <StyleContainerRegister>
                  <GridContainerNew spacing={24}>
                    <GridItemNew sm={12}>
                      <TextInputRHF
                        placeholder={translate.firstName}
                        {...register("firstName", {
                          required: getHelperText(translate.firstName),
                        })}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                      />
                    </GridItemNew>
                    <GridItemNew sm={12}>
                      <TextInputRHF
                        placeholder={translate.lastName}
                        {...register("lastName", {
                          required: getHelperText(translate.lastName),
                        })}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                      />
                    </GridItemNew>
                    <GridItemNew sm={12}>
                      <TextInputReg
                        placeholder={translate.phoneNumber}
                        {...register("phoneNumber", {
                          required: getHelperText(translate.phoneNumber),
                          pattern: /^09\d{9}$/,
                          onChange: (e) => {
                            const isValue = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            );
                            setValue("phoneNumber", isValue);
                          },
                        })}
                        type="tel"
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                        maxLength={11}
                      />
                    </GridItemNew>
                    <GridItemNew sm={12}>
                      <TextInputReg
                        placeholder={translate.nationalCode}
                        {...register("nationalCode", {
                          required: getHelperText(translate.nationalCode),
                          onChange: (e) => {
                            const isValue = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            );
                            setValue("nationalCode", isValue);
                          },
                        })}
                        error={!!errors.nationalCode}
                        helperText={errors.nationalCode?.message}
                        type="tel"
                        maxLength={10}
                      />
                    </GridItemNew>
                    <GridItemNew sm={12}>
                      <TextInputRHF
                        placeholder={translate.password}
                        {...register("password", {
                          required: getHelperText(translate.password),
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        type="password"
                      />
                    </GridItemNew>
                  </GridContainerNew>
                  {/* 
                  <BoxChaptcha style={{ marginTop: "15px" }}>
                    <Stack
                      flexDirection="column"
                      justifyContent="start"
                      alignItems="start"
                    >
                      <TextInputRHF
                        placeholder={translate.captcha}
                        {...register("captcha", {
                          required: getHelperText(translate.captcha),
                        })}
                        error={!!errors.captcha}
                        helperText={errors.captcha?.message}
                        style={{ marginTop: "10px", width: "90%" }}
                      />
                    </Stack>
                    <StyleBoxCaptcha>
                      {captcha && (
                        <StyleImg src={captcha.data.captcha} alt="Captcha" />
                      )}
                      <div
                        onClick={() => {
                          setRefresh(!refresh);
                        }}
                      >
                        <IconViewer src={Refresh} alt="Refresh" />
                      </div>
                    </StyleBoxCaptcha>
                  </BoxChaptcha> 
*/}

                  <BtnComponent
                    label={translate.signup}
                    variant="contained"
                    color="#0B233F"
                    style={{ marginTop: "20px" }}
                    id="registerBTN"
                    type="submit"
                  />
                  <Stack alignItems="center" justifyContent="center">
                    <TextQuestion>{"حساب کاربری دارید؟"}</TextQuestion>
                    <TextRegister onClick={() => navigate("/login")}>
                      {"وارد شوید"}
                    </TextRegister>
                  </Stack>
                  <TextVersion>{VERSION}</TextVersion>
                </StyleContainerRegister>
              </StyleMainBox>
            </StyledMobileView>
          </GridCol>
          <StyledGridCol xs={0} sm={0} md={6}>
            <StyleBoxImage>
              <img src={LoginLG} alt="LoginImage" />
            </StyleBoxImage>
          </StyledGridCol>
        </GridRow>
      </GridContainer>
    </form>
  );
};

export default Register;
