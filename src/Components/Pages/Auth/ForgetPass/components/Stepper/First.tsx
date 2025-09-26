import BackArrow from "@/assets/images/forgetPass/backArrow.svg";
import Logo from "@/assets/svg/logo.svg";
import { BtnComponent as Button } from "@/Components/Common/Core/Button";
import Typography from "@/Components/Common/Core/Typography";
import { getHelperText } from "@/Hook";
import { getTranslate } from "@/language";
import { otpCode } from "@/store/Actions/Profile";
import {
  closeSnackbar,
  getUserNationalCode,
  resetStepper,
} from "@/store/Actions/Root";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import { FormStyle, TextInputReg } from "../style";
const First = () => {
  const translate = getTranslate();
  const theme = useTheme().palette;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    dispatch(closeSnackbar());
  }, []);

  const onSubmit = (data: any) => {
    const getData = {
      nationalId: data.nationalCode,
      again: false,
    };
    dispatch(getUserNationalCode(data.nationalCode) as any);
    dispatch(otpCode(getData) as any);
  };

  return (
    <div id="number-Container">
      <div>
        <img
          src={Logo}
          style={{
            width: "78px",
            height: "79px",
          }}
        />
        <Typography>{translate.changePass}</Typography>
        <Typography>{translate.changePassDetail}</Typography>
      </div>
      <FormStyle onSubmit={handleSubmit(onSubmit)}>
        <TextInputReg
          autoFocus
          placeholder={translate.nationalAll}
          {...register("nationalCode", {
            required: getHelperText(translate.nationalCode),
            onChange: (e) => {
              const isValue = e.target.value.replace(/[^0-9]/g, "");
              setValue("nationalCode", isValue);
            },
          })}
          type="tel"
          error={!!errors.nationalCode}
          helperText={errors.nationalCode?.message}
          maxLength={10}
        />
        {/* <TextInputReg
          autoFocus
          placeholder={translate.phoneNumber}
          {...register("phoneNumber", {
            required: getHelperText(translate.phoneNumber),
            pattern: /^09\d{9}$/,
            onChange: (e) => {
              const isValue = e.target.value.replace(/[^0-9]/g, "");
              setValue("phoneNumber", isValue);
            },
          })}
          type="tel"
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
          maxLength={11}
        /> */}
        <Button
          color={theme.primary[900]}
          label={translate.sendCodePass}
          type="submit"
          variant="contained"
        />
      </FormStyle>
      <div
        style={{
          marginTop: "80px",
        }}
        onClick={() => {
          navigate("/login");
          dispatch(resetStepper());
        }}
      >
        <img
          src={BackArrow}
          style={{
            marginTop: "-15px",
          }}
        />
        <Typography>{translate.changePass}</Typography>
      </div>
    </div>
  );
};

export default First;
