import Logo from "@/assets/svg/logoSidebar.svg";
import { ReactComponent as Logout } from "@/assets/svg/logout.svg";
import { ReactComponent as Profile } from "@/assets/svg/profile.svg";
import { getUser } from "@/store/Actions/Profile";
import { setLogout } from "@/store/Actions/Root";
import { RootState } from "@/store/interfaces";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import Box from "../../Box";
import { BtnComponent } from "../../Button";
import {
  BoxBTN,
  BoxContainer,
  BoxLogout,
  HeaderContainer,
  LogoContainer,
  LogoIcon,
} from "../Style";
const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state?.profile?.user);
  const theme = useTheme().palette;
  const navigate = useNavigate();

  const goDashBoard = () => {
    navigate("/admin/project/projectlist");
  };

  useEffect(() => {
    if (!user || user === undefined) {
      dispatch(getUser() as any);
    }
  }, [user]);

  const isLogoutHandler = () => {
    Cookies.remove("raycloud_token");
    localStorage.removeItem("raycloud_token");
    dispatch(setLogout(false) as any);
    window.location.reload();
  };

  return (
    <HeaderContainer>
      <BoxContainer>
        {/*
          <BoxHash>
            <Breadcrumb />
          </BoxHash>
        */}
        <BoxBTN>
          <Box>
            <BoxLogout onClick={isLogoutHandler}>
              <Logout style={{ width: "40px", height: "40px" }} />
            </BoxLogout>
          </Box>
          <BtnComponent
            label={user?.data?.firstName + " " + user?.data?.lastName}
            variant="contained"
            startIcon={
              <Profile
                style={{ width: "16px", height: "16px", marginBottom: "20px" }}
              />
            }
            style={{
              background: theme.secondary[300],
              color: theme.primary[900],
            }}
          />
        </BoxBTN>
        <LogoContainer onClick={goDashBoard}>
          <h3 style={{ margin: "10px 0 0 5px" }}>RayCloud</h3>
          <LogoIcon src={Logo} alt="logo sidebar" />
        </LogoContainer>
      </BoxContainer>
    </HeaderContainer>
  );
};

export default Header;
