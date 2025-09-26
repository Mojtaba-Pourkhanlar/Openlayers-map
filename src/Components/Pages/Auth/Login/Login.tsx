import Box from "@/Components/Common/Core/Box";
import { BtnComponent } from "@/Components/Common/Core/Button";
import { GridCol, GridContainer, GridRow } from "@/Components/Common/Core/Grid";
import IconViewer from "@/Components/Common/Core/IconViewer";
import Checkbox from "@/Components/Common/Core/Input/Checkbox";
import InputText from "@/Components/Common/Core/Input/TextFaild";
import Typography from "@/Components/Common/Core/Typography";
import { VERSION } from "@/Constants";
import Refresh from "@/assets/svg/cached.svg";
import LoginLG from "@/assets/svg/loginLG.svg";
import Logo from "@/assets/svg/logo.svg";
import { getTranslate } from "@/language";
import { getCaptcha, signin } from "@/store/Actions/Profile";
import { RootState } from "@/store/interfaces";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BoxChaptcha,
  StyleBoxCaptcha,
  StyleBoxForget,
  StyleBoxImage,
  StyleContainer,
  StyleIconViewer,
  StyleImg,
  StyleInputCaptcha,
  StyleMainBox,
  StyleSubTitle,
  StyleTitle,
  StyleTitleBox,
  StyledGridCol,
  StyledMobileView,
  TextQuestion,
  TextRegister,
  TextVersion,
} from "./style";
import Stack from "@/Components/Common/Utils/Stack";

const Login: React.FC = () => {
  const translate = getTranslate();
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<RootState, void, any>>();
  // Redux state
  const { captcha } = useSelector((state: RootState) => state?.profile);
  // Local state
  const [form, setForm] = useState({
    username: "",
    password: "",
    captchaText: "",
    checked: false,
  });
  const [errors, setErrors] = useState({
    usernameError: false,
    passwordError: false,
    captchaTextError: false,
    usernameHelper: "",
    passwordHelper: "",
    captchaTextHelper: "",
  });
  const [refresh, setRefresh] = useState(false);

  // Set remembered credentials from localStorage
  useEffect(() => {
    const rememberMe = localStorage.getItem("remember-me") === "true";
    setForm({
      ...form,
      checked: rememberMe,
    });
  }, []);

  // Fetch captcha on component mount or refresh
  useEffect(() => {
    dispatch(getCaptcha());
  }, [refresh]);

  // Handle form submission
  const loginHandler = useCallback(() => {
    const hasError = errorHandler();
    if (!hasError) {
      const data = {
        NationalCode: form.username,
        password: form.password,
        captcha: form.captchaText,
        captchaId: captcha?.data.captchaId,
      };
      dispatch(signin({ data, checked: form.checked, setForm }));
    }
  }, [form, captcha]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear errors when user starts typing
    setErrors({
      ...errors,
      [`${name}Error`]: false,
      [`${name}Helper`]: "",
    });
  };

  // Handle errors
  const errorHandler = () => {
    let error = false;
    if (!form.username) {
      setErrors((prev) => ({
        ...prev,
        usernameError: true,
        usernameHelper: translate.userNameError,
      }));
      error = true;
    }
    if (!form.password) {
      setErrors((prev) => ({
        ...prev,
        passwordError: true,
        passwordHelper: translate.passwordError,
      }));
      error = true;
    }
    if (!form.captchaText) {
      setErrors((prev) => ({
        ...prev,
        captchaTextError: true,
        captchaTextHelper: translate.captchaError,
      }));
      error = true;
    }
    return error;
  };

  // Handle Enter key press
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        loginHandler();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [loginHandler]);

  return (
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
                <StyleSubTitle>{translate.detailLogin}</StyleSubTitle>
              </StyleTitleBox>

              <StyleContainer>
                <InputText
                  placeholder={translate.inputNational}
                  type="text"
                  name="username"
                  onChange={handleChange}
                  error={errors.usernameError.toString()}
                  helperText={errors.usernameHelper}
                  value={form.username}
                  autoComplete="off"
                  maxLength={10}
                />
                <InputText
                  placeholder={translate.inputPassword}
                  type="password"
                  name="password"
                  onChange={handleChange}
                  error={errors.passwordError.toString()}
                  helperText={errors.passwordHelper}
                  value={form.password}
                />

                <BoxChaptcha>
                  <StyleInputCaptcha
                    placeholder={translate.captcha}
                    type="text"
                    name="captchaText"
                    onChange={handleChange}
                    maxLength={5}
                    error={errors.captchaTextError.toString()}
                    helperText={errors.captchaTextHelper}
                    value={form.captchaText}
                  />
                  <StyleBoxCaptcha>
                    {captcha && (
                      <StyleImg src={captcha.data.captcha} alt="Captcha" />
                    )}
                    <div
                      onClick={() => {
                        setRefresh(!refresh);
                        setForm({ ...form, captchaText: "" });
                      }}
                    >
                      <IconViewer src={Refresh} alt="Refresh" />
                    </div>
                  </StyleBoxCaptcha>
                </BoxChaptcha>

                <StyleBoxForget>
                  <Box>
                    <Checkbox
                      checked={form.checked}
                      onChange={() =>
                        setForm({ ...form, checked: !form.checked })
                      }
                    />
                    <Typography>{translate.remember}</Typography>
                  </Box>
                  <Box
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/changePassword")}
                  >
                    <Typography>{translate.forgetPass}</Typography>
                  </Box>
                </StyleBoxForget>

                <BtnComponent
                  onClick={loginHandler}
                  label={translate.signin}
                  variant="contained"
                  color="#0B233F"
                  style={{ marginTop: "20px" }}
                  id="loginBTN"
                />
                <Stack alignItems="center" justifyContent="center">
                  <TextQuestion>{"حساب کاربری ندارید؟"}</TextQuestion>
                  <TextRegister onClick={() => navigate("/register")}>
                    {"ثبت‌نام کنید"}
                  </TextRegister>
                </Stack>
                <TextVersion>{VERSION}</TextVersion>
              </StyleContainer>
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
  );
};

export default Login;
