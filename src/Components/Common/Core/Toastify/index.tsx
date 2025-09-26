import { RootState } from "@/store/interfaces";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Typography from "../Typography";
// image
import ErrorClose from "@/assets/svg/closeE.svg";
import InfoClose from "@/assets/svg/closeI.svg";
import SuccessClose from "@/assets/svg/closeS.svg";
import WarningClose from "@/assets/svg/closeW.svg";
import Error from "@/assets/svg/error.svg";
import Info from "@/assets/svg/info.svg";
import Success from "@/assets/svg/success.svg";
import Warning from "@/assets/svg/warning.svg";
import IconViewer from "../IconViewer";

type ResolvableProps = {
  message: string;
  type: "info" | "success" | "warning" | "error";
  theme?: "light" | "dark";
  open: boolean;
  duration?: number;
  onClose: any;
};

const Toastify: React.FC<ResolvableProps> = ({
  message,
  type,
  theme,
  open,
  duration = 2000,
  onClose,
}) => {
  const { isDarkMode } = useSelector((state: RootState) => state?.root);

  useEffect(() => {
    if (open) {
      toast[type](<CustomToastContent title={type} message={message} />, {
        theme: isDarkMode ? "dark" : "light",
        className: `toast-${type}`, // Add a custom class based on the type
        icon: <CustomToastIcon type={type} />, // Use a custom icon based on the type
        closeButton: <CustomCloseButton type={type} />, // Use a custom close button
        onClose: onClose,
        autoClose: onClose,
      });
    }
  }, [open, message, type, theme, isDarkMode]);

  const containerStyle: React.CSSProperties = {
    padding: "8px 16px",
    display: "block",
    width: "fit-content",
  };

  return (
    <ToastContainer
      position="top-right"
      autoClose={duration}
      // hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl
      pauseOnFocusLoss
      draggable
      pauseOnHover
      hideProgressBar
      theme={isDarkMode ? "dark" : "light"}
      style={containerStyle}
    />
  );
};

// Custom component for toast content with title
const CustomToastContent: React.FC<{ title: string; message: string }> = ({
  title,
  message,
}) => {
  let newTitle;
  if (title === "success") {
    newTitle = "موفق";
  } else if (title === "error") {
    newTitle = "خطا";
  }
  if (title === "info") {
    newTitle = "اطلاعات";
  }
  if (title === "warning") {
    newTitle = "هشدار";
  }
  return (
    <div>
      <Typography
        style={{
          fontSize: "14px",
          marginBottom: "0rem",
          color: "#29292A",
        }}
      >
        {newTitle}
      </Typography>
      <Typography
        style={{
          fontSize: "14px",
          marginBottom: "0rem",
          color: "#6D7B8C",
        }}
      >
        {message}
      </Typography>
    </div>
  );
};

// Custom component for toast icon
const CustomToastIcon: React.FC<{
  type: "info" | "success" | "warning" | "error";
}> = ({ type }) => (
  <div>
    {/* Customize the icon based on the type */}
    {type === "info" && (
      <IconViewer
        src={Info}
        alt="Info"
        style={{ width: "24px", height: "24px" }}
      />
    )}
    {type === "success" && (
      <IconViewer
        src={Success}
        alt="Success"
        style={{ width: "24px", height: "24px" }}
      />
    )}
    {type === "warning" && (
      <IconViewer
        src={Warning}
        alt="Warning"
        style={{ width: "24px", height: "24px" }}
      />
    )}
    {type === "error" && (
      <IconViewer
        src={Error}
        alt="Error"
        style={{ width: "24px", height: "24px" }}
      />
    )}
  </div>
);

// Custom component for close button
const CustomCloseButton: React.FC<{
  type: "info" | "success" | "warning" | "error";
}> = ({ type }) => (
  <div>
    {/* Customize the icon based on the type */}
    {type === "info" && (
      <IconViewer
        src={InfoClose}
        alt="InfoClose"
        style={{ width: "24px", height: "24px" }}
      />
    )}
    {type === "success" && (
      <IconViewer
        src={SuccessClose}
        alt="SuccessClose"
        style={{ width: "24px", height: "24px" }}
      />
    )}
    {type === "warning" && (
      <IconViewer
        src={WarningClose}
        alt="WarningClose"
        style={{ width: "24px", height: "24px" }}
      />
    )}
    {type === "error" && (
      <IconViewer
        src={ErrorClose}
        alt="ErrorClose"
        style={{ width: "24px", height: "24px" }}
      />
    )}
  </div>
); // Customize the close button icon

export default Toastify;

/* 
For Example:
    <Toastify text="Success! Operation completed" type="success" isActive={show} />
*/
