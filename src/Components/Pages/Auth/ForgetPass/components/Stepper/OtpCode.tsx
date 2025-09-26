import BackArrow from "@/assets/images/forgetPass/backArrow.svg";
import Logo from "@/assets/svg/logo.svg";
import { BtnComponent as Button } from "@/Components/Common/Core/Button";
import TextInputRHF from "@/Components/Common/Core/Input/TextFaild/New";
import Typography from "@/Components/Common/Core/Typography";
import { getHelperText } from "@/Hook";
import { getTranslate } from "@/language";
import { changePass, otpCode } from "@/store/Actions/Profile";
import { resetStepper } from "@/store/Actions/Root";
import { RootState } from "@/store/interfaces";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import { FormChangePassStyle, StyledInput, TextInputReg } from "../style";

const OtpCode = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme().palette;
  const translate = getTranslate();
  const { nationalCode } = useSelector((state: RootState) => state.root);
  // state
  const [timer, setTimer] = useState<number>(119);
  const [timerActive, setTimerActive] = useState<boolean>(true);
  const [confirmationCode, setConfirmationCode] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
  ]);
  const [confirmError, setConfirmError] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const inputRefs: null[] | any[] = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleTimer = () => {
    if (timer > 0) {
      setTimer((prev) => prev - 1);
    } else {
      setTimerActive(false);
    }
  };
  const handleInputChange = (index: any, event: any) => {
    const { value } = event.target;
    if (value.length === 1 && !isNaN(value)) {
      const newConfirmationCode = [...confirmationCode];
      newConfirmationCode[index] = value;
      setConfirmationCode(newConfirmationCode);
      setConfirmError((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[index] = false;
        return newErrors;
      });
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    } else if (value.length === 0) {
      const newConfirmationCode = [...confirmationCode];
      newConfirmationCode[index] = value;
      setConfirmationCode(newConfirmationCode);
      setConfirmError((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[index] = false;
        return newErrors;
      });
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(handleTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [timerActive, timer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const persianNumerals = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return `${persianNumerals[Math.floor(minutes / 10)]}${
      persianNumerals[minutes % 10]
    }:${persianNumerals[Math.floor(remainingSeconds / 10)]}${
      persianNumerals[remainingSeconds % 10]
    }`;
  };

  const handleResendClick = () => {
    setTimer(119); // Restart the timer
    setTimerActive(true);
    setConfirmationCode(["", "", "", "", ""]);
    setConfirmError([false, false, false, false, false]);

    const data = {
      nationalId: nationalCode,
      again: true,
    };
    dispatch(otpCode(data) as any);
  };

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("data", data);
    let hasEmptyInput = false;
    let codeNumber: number | null = null;
    const newConfirmError = [...confirmError];
    confirmationCode.forEach((digit, index) => {
      if (digit === "") {
        hasEmptyInput = true;
        newConfirmError[index] = true;
      } else {
        newConfirmError[index] = false;
      }
    });
    if (!hasEmptyInput) {
      codeNumber = +confirmationCode.join("");
    }

    if (data.newPassword === data.password && !hasEmptyInput) {
      const isData = {
        password: data.newPassword,
        code: `${codeNumber}`,
      };
      dispatch(changePass(isData) as any);
    } else if (data.newPassword !== data.password) {
      setError("password", { message: translate.equalPass });
    } else if (hasEmptyInput) {
      setConfirmError(newConfirmError);
    }
  };

  return (
    <div id="OtpCode-Container">
      <div>
        <img
          src={Logo}
          style={{
            width: "78px",
            height: "79px",
          }}
        />
        <div>
          <Typography>{translate.changePass}</Typography>
        </div>
        <p> {translate.enterVerificationCode}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormChangePassStyle onSubmit={handleSubmit(onSubmit)}>
          <TextInputReg
            type="password"
            placeholder={translate.newPassword}
            {...register("newPassword", {
              required: getHelperText(translate.newPassword),
            })}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
          />
          <div style={{ margin: "20px 0", width: "100%" }}>
            <TextInputReg
              type="password"
              placeholder={translate.password}
              {...register("password", {
                required: getHelperText(translate.password),
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </div>
        </FormChangePassStyle>

        <div>
          {confirmationCode.map((digit, index) => (
            <StyledInput
              type="tel"
              key={index}
              autoFocus={index === 0 && true}
              value={digit}
              onChange={(event) => handleInputChange(index, event)}
              ref={inputRefs[index]}
              $error={confirmError[index]}
              $index={index}
            />
          ))}
        </div>
        {timerActive && timer > 0 ? (
          <p>{formatTime(timer)}</p>
        ) : (
          <p>
            <span style={{ cursor: "pointer" }} onClick={handleResendClick}>
              {translate.receivedAgain}
            </span>
          </p>
        )}
        <Button
          color={theme.primary[900]}
          label={translate.confirmation}
          type="submit"
          variant="contained"
        />
      </form>
      <div
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
        <Typography>{translate.backToHome}</Typography>
      </div>
    </div>
  );
};

export default OtpCode;
