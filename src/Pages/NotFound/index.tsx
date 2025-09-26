import { ReactComponent as NotFoundSVG } from "@/assets/images/notFound/notFoundSVG.svg";
import { ReactComponent as Back } from "@/assets/images/notFound/back.svg";
import { DivContainer } from "./style";
import Typography from "@/Components/Common/Core/Typography";
import { BtnComponent } from "@/Components/Common/Core/Button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <DivContainer>
      <NotFoundSVG />
      <div>
        <Typography>صفحه مورد نظر یافت نشد</Typography>
        <BtnComponent
          onClick={() => {
            navigate("/admin/project/projectlist");
          }}
          label="بازگشت به صفحه اصلی"
          variant="contained"
          id="notFound"
          startIcon={<Back />}
        />
      </div>
    </DivContainer>
  );
};

export default NotFound;
