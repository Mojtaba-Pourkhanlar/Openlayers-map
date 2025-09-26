import IconViewer from "@/Components/Common/Core/IconViewer";
import InputText from "@/Components/Common/Core/Input/TextFaild";
import Typography from "@/Components/Common/Core/Typography";
import mobile from "@/assets/svg/mobile.svg";
import Box from "@/Components/Common/Core/Box";
import { styled } from "styled-components";
import { GridCol } from "@/Components/Common/Core/Grid";

const StyledGridCol = styled(GridCol)`
  padding: 0;
  display: block;
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledMobileView = styled.div`
  @media (max-width: 768px) {
    height: 100vh;
    background-size: cover;
    background-image: url(${mobile});
    background-repeat: no-repeat;
    width: 100%;
  }
`;
const StyleIconViewer = styled(IconViewer)`
  width: 78px;
  height: 79px;
  flex-shrink: 0;
  @media (max-width: 768px) {
    width: 65.164px;
    height: 66px;
    flex-shrink: 0;
  }
`;
const StyleTitle = styled(Typography)`
  font-size: 24px;
  line-height: 24px;
  font-weight: 400;
  letter-spacing: 0.1px;
  font-style: normal;
  color: ${({ theme }) => theme.palette.neutral[900]};
  @media (max-width: 868px) {
    font-size: 20px;
  }
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
const StyleSubTitle = styled(Typography)`
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
  letter-spacing: 0.1px;
  font-style: normal;
  color: ${({ theme }) => theme.palette.neutral[300]};
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
const StyleContainer = styled(Box)`
  width: 380px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 868px) {
    width: 350px;
    height: 300px;
  }
  @media (max-width: 768px) {
    width: 288px;
    height: 300px;
  }
`;
const StyleInputCaptcha = styled(InputText)`
  width: 202px;
  margin-left: 22px;
  @media (max-width: 768px) {
    width: 122px;
  }
`;
const StyleImg = styled.img`
  width: 102px;
  @media (max-width: 768px) {
    width: 82px;
  }
`;
const StyleMainBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
`;

const StyleTitleBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 850px) {
    padding: 0 20px;
  }
`;
const StyleBoxCaptcha = styled(Box)`
  width: 156px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.palette.neutral[300]};
  background: ${({ theme }) => theme.palette.neutral[50]};
  height: 48px;
  margin-top: 10px;
  @media (max-width: 768px) {
    width: 200px;
  }
`;
const StyleBoxForget = styled(Box)`
  width: 380px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    p {
      margin: 0 12px;
      color: ${({ theme }) => theme.palette.neutral[900]};
      font-size: 12px;
      font-weight: 400;
    }
  }
  p {
    color: #${({ theme }) => theme.palette.primary[400]};
    font-size: 12px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.1px;
    margin: 20px 0;
  }
  @media (max-width: 868px) {
    width: 350px;
  }
  @media (max-width: 768px) {
    width: 288px;
    margin-top: -24px;
  }
`;
const StyleBoxImage = styled(Box)`
  height: 100vh;
  background: ${({ theme }) => theme.palette.primary[900]};
  width: 100%;
  text-align: center;
  position: relative;
  & > img {
    width: 100%;
    height: 95vh;
    padding-left: 20px;
  }
`;

const BoxChaptcha = styled(Box)`
  display: flex;

  div > div > img {
    width: 24px;
    height: 24px;
    margin: 0 8px 0 10px;
  }
`;
const TextQuestion = styled(Typography)`
  margin-top: 15px;
  direction: ltr;
  font-size: 16px;
  font-weight: 500;
  color: #4d4d4d;
`;
const TextRegister = styled(Typography)`
  margin-top: 15px;
  direction: ltr;
  font-size: 16px;
  text-decoration: underline;
  font-weight: 500;
  color: #0b233f;
  cursor: pointer;
` as typeof Typography;
const TextVersion = styled(Typography)`
  margin-top: -10px;
  direction: ltr;
  font-size: 12px;
  color: #0b233f;
`;

export {
  StyledGridCol,
  StyledMobileView,
  StyleIconViewer,
  StyleTitle,
  StyleSubTitle,
  StyleContainer,
  StyleInputCaptcha,
  StyleImg,
  StyleBoxCaptcha,
  StyleBoxForget,
  StyleMainBox,
  StyleTitleBox,
  StyleBoxImage,
  BoxChaptcha,
  TextQuestion,
  TextRegister,
  TextVersion,
};
