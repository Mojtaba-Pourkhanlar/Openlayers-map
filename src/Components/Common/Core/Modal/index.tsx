import { useTheme } from "styled-components";
import { ReactComponent as CloseIcon } from "@/assets/svg/closeAll.svg";
import Stack from "../../Utils/Stack";
import {
  BackDrop,
  BoxClose,
  Container,
  ModalCard,
  ModalHeader,
  TextHeader,
} from "./style";

interface Props {
  title: string;
  padding?: string;
  headerbgcolor?: string;
  icon?: any;
  width: number;
  show: boolean;
  isDark?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({
  title,
  icon,
  width,
  show,
  onClose,
  padding,
  headerbgcolor,
  children,
  isDark = false,
}: Props) => {
  const theme = useTheme();

  return (
    <>
      <BackDrop $show={show}>
        <Container>
          <ModalCard $width={width} id="clickbox">
            <ModalHeader
              $headerbgcolor={headerbgcolor ?? theme.palette.primary[900]}
            >
              <Stack width="unset" gap={8}>
                {icon && icon}
                <TextHeader $isDark={isDark}>{title}</TextHeader>
              </Stack>
              <BoxClose $isDark={isDark} onClick={onClose}>
                <CloseIcon />
              </BoxClose>
            </ModalHeader>
            <div style={{ padding: padding ?? "0 24px" }}>{children}</div>
          </ModalCard>
        </Container>
      </BackDrop>
    </>
  );
};
