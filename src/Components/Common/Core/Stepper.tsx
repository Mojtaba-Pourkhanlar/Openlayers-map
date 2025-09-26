import styled from "styled-components";
import Stack from "@/Components/Common/Utils/Stack";
import { ReactComponent as CheckIcon } from "@/assets/svg/project/check.svg";
import Typography from "./Typography";

const StepCircle = styled.div<{ $step: number; $currentStep: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  & span {
    width: 32px;
    height: 32px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: ${({ theme }) => theme.palette.neutral[200]};
    color: ${({ theme }) => theme.palette.neutral[400]};
    ${({ $currentStep, $step, theme }) =>
      $currentStep > $step &&
      `
        background: ${theme.palette.primary[900]} ;
        color: #fff;
    `}
  }
  ${({ $currentStep, $step, theme }) =>
    $currentStep === $step &&
    `
    // margin-bottom: 6px;
    width:50px;
    height:50px;
    border: 1px solid ${theme.palette.primary[900]};
    border-radius: 50%;
    & span {
    width: 38px;
    height: 38px;
    background: ${theme.palette.primary[900]};
    color: #fff;}
  `}
`;

const Line = styled.span<{
  $steps: number;
  $step: number;
  $currentStep: number;
}>`
  width: 100%;
  height: 2px;
  background: ${({ $step, $currentStep, theme }) =>
    $currentStep === $step
      ? "linear-gradient(270deg, #6C99DF 0%, #6C99DF 0%, #0B233F 0%, #D3D1D8 33.13%, #D3D1D8 91.24%)"
      : $currentStep > $step
      ? theme.palette.primary[900]
      : theme.palette.neutral[200]};
`;

interface Props {
  steps: string[];
  currentStep: number;
}
const Stepper = ({ steps, currentStep }: Props) => {
  const temp = steps.slice(0, steps.length - 1);

  return (
    <>
      <Stack>
        {temp.map((step, index) => (
          <Stack width="100%" position="relative" key={index}>
            <Stack width="unset" flexDirection="column" justifyContent="end">
              <StepCircle $currentStep={currentStep} $step={index + 1}>
                <span>
                  {currentStep > index + 1 ? <CheckIcon /> : index + 1}
                </span>
              </StepCircle>
              <Typography
                style={{
                  width: "100%",
                  position: "absolute",
                  textAlign: "center",
                  bottom: currentStep === index + 1 ? -30 : -40,
                }}
              >
                {step}
              </Typography>
            </Stack>
            <Line
              $currentStep={currentStep}
              $step={index + 1}
              $steps={temp.length}
            />
          </Stack>
        ))}
        <Stack
          width="unset"
          position="relative"
          flexDirection="column"
          justifyContent="end"
        >
          <StepCircle $currentStep={currentStep} $step={steps.length}>
            <span>{steps.length}</span>
          </StepCircle>
          <Typography
            style={{
              position: "absolute",
              textAlign: "center",
              bottom: currentStep === steps.length ? -30 : -40,
            }}
          >
            {steps[steps.length - 1]}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default Stepper;
